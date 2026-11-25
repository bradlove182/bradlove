import { expect, test } from "bun:test"

import { ControlPlaneClient, ControlPlaneHealth } from "@bradlove/core/control-plane"
import { Effect, Fiber } from "effect"
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
        const error = await Effect.runPromise(
            getControlPlaneHealth(server.url.origin).pipe(Effect.flip),
        )

        expect(error._tag).toBe("HttpClientError")
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
        const error = await Effect.runPromise(
            getControlPlaneHealth(server.url.origin).pipe(Effect.flip),
        )

        expect(error._tag).toBe("SchemaError")
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
                const error = yield* Fiber.join(fiber).pipe(
                    Effect.flip,
                    Effect.race(TestClock.withLive(Effect.sleep(100)).pipe(Effect.as(null))),
                )
                yield* Fiber.interrupt(fiber)
                return error
            }).pipe(Effect.provide(TestClock.layer())),
        )

        if (result === null) {
            throw new Error("The health check did not complete after its deadline")
        }
        expect(result?._tag).toBe("TimeoutError")
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
        const health = await Effect.runPromise(getControlPlaneHealth(server.url.origin))

        expect(health).toEqual(
            new ControlPlaneHealth({
                service: "control-plane",
                status: "healthy",
            }),
        )
    } finally {
        await server.stop(true)
    }
})
