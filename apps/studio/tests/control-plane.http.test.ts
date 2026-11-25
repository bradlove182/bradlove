import { expect, test } from "bun:test"

import { ControlPlaneClient } from "@bradlove/core/control-plane"
import { Effect, Exit, Fiber } from "effect"
import { TestClock } from "effect/testing"

const getControlPlaneHealth = (baseUrl: string) =>
    ControlPlaneClient.use((client) => client.health()).pipe(
        Effect.timeout("5 seconds"),
        Effect.provide(ControlPlaneClient.layer(baseUrl)),
    )

test("the Studio health client rejects an unavailable control-plane response", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: () =>
            new Response(JSON.stringify({ error: "internal health detail" }), {
                status: 503,
                headers: {
                    "content-type": "application/json",
                },
            }),
    })

    try {
        const exit = await Effect.runPromiseExit(getControlPlaneHealth(server.url.origin))

        expect(Exit.isFailure(exit)).toBe(true)
    } finally {
        await server.stop(true)
    }
})

test("the Studio health client rejects a schema-invalid healthy response", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: () =>
            new Response(JSON.stringify({ service: "control-plane", status: "degraded" }), {
                headers: {
                    "content-type": "application/json",
                },
            }),
    })

    try {
        const exit = await Effect.runPromiseExit(getControlPlaneHealth(server.url.origin))

        expect(Exit.isFailure(exit)).toBe(true)
    } finally {
        await server.stop(true)
    }
})

test("the Studio health client times out a stalled health check", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: () => new Promise<Response>(() => {}),
    })

    try {
        const result = await Effect.runPromise(
            Effect.gen(function* () {
                const fiber = yield* getControlPlaneHealth(server.url.origin).pipe(Effect.forkChild)
                yield* TestClock.adjust(6_000)
                const exit = yield* Fiber.await(fiber).pipe(
                    Effect.race(TestClock.withLive(Effect.sleep(100)).pipe(Effect.as(null))),
                )
                yield* Fiber.interrupt(fiber)
                return exit
            }).pipe(Effect.provide(TestClock.layer())),
        )

        if (result === null) {
            throw new Error("The health check did not complete after its deadline")
        }
        expect(Exit.isFailure(result)).toBe(true)
    } finally {
        await server.stop(true)
    }
})

test("the Studio health client accepts a healthy response before the deadline", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: () =>
            new Response(JSON.stringify({ service: "control-plane", status: "healthy" }), {
                headers: {
                    "content-type": "application/json",
                },
            }),
    })

    try {
        const exit = await Effect.runPromiseExit(getControlPlaneHealth(server.url.origin))

        expect(Exit.isSuccess(exit)).toBe(true)
    } finally {
        await server.stop(true)
    }
})
