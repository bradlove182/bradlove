import { expect, test } from "bun:test"

import { ControlPlaneClient, ControlPlaneHealth } from "@bradlove/core/control-plane"
import { Effect, Fiber, ManagedRuntime } from "effect"
import { TestClock } from "effect/testing"

const getControlPlaneHealth = ControlPlaneClient.use((client) => client.health()).pipe(
    Effect.timeout("5 seconds"),
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
    const runtime = ManagedRuntime.make(ControlPlaneClient.layer(server.url.origin))

    try {
        const error = await runtime.runPromise(getControlPlaneHealth.pipe(Effect.flip))

        expect(error._tag).toBe("HttpClientError")
    } finally {
        await runtime.dispose()
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
    const runtime = ManagedRuntime.make(ControlPlaneClient.layer(server.url.origin))

    try {
        const error = await runtime.runPromise(getControlPlaneHealth.pipe(Effect.flip))

        expect(error._tag).toBe("SchemaError")
    } finally {
        await runtime.dispose()
        await server.stop(true)
    }
})

test("the Studio health client times out a stalled health check", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: () => new Promise<Response>(() => {}),
    })
    const runtime = ManagedRuntime.make(ControlPlaneClient.layer(server.url.origin))

    try {
        const result = await runtime.runPromise(
            Effect.gen(function* () {
                const fiber = yield* getControlPlaneHealth.pipe(Effect.forkChild)
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
        await runtime.dispose()
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
    const runtime = ManagedRuntime.make(ControlPlaneClient.layer(server.url.origin))

    try {
        const health = await runtime.runPromise(getControlPlaneHealth)

        expect(health).toEqual(
            new ControlPlaneHealth({
                service: "control-plane",
                status: "healthy",
            }),
        )
    } finally {
        await runtime.dispose()
        await server.stop(true)
    }
})
