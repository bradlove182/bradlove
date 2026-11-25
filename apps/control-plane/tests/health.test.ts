import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"

import { ControlPlaneApi, ControlPlaneHealth } from "@bradlove/core/control-plane"
import { Context, Effect, Layer, Schema } from "effect"
import { HttpRouter, HttpServer } from "effect/http"
import { HttpApiTest } from "effect/http-api"

import { ControlPlaneApp, PublicHealthHeadersLayer, SystemApiHandlers } from "../src/worker"

const app = HttpRouter.toWebHandler(ControlPlaneApp, {
    disableLogger: true,
})

const handlers = SystemApiHandlers.pipe(Layer.provideMerge(PublicHealthHeadersLayer))

let server: Bun.Server<undefined>

beforeEach(() => {
    server = Bun.serve({
        port: 0,
        fetch: (request) => app.handler(request, Context.empty()),
    })
})

afterEach(async () => {
    await server.stop(true)
})

afterAll(async () => {
    await app.dispose()
})

test("the generated client and handlers share the health contract in memory", async () => {
    const health = await Effect.runPromise(
        Effect.gen(function* () {
            const client = yield* HttpApiTest.groups(ControlPlaneApi, ["system"])

            return yield* client.health()
        }).pipe(Effect.provide(Layer.mergeAll(handlers, HttpServer.layerServices)), Effect.scoped),
    )

    expect(health).toEqual(
        new ControlPlaneHealth({
            service: "control-plane",
            status: "healthy",
        }),
    )
})

test("the control plane reports healthy through its public HTTP interface", async () => {
    const response = await fetch(new URL("/health", server.url))
    const payload: unknown = await response.json()

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type")).toContain("application/json")
    expect(() => Schema.decodeUnknownSync(ControlPlaneHealth)(payload)).not.toThrow()
    expect(payload).toEqual({
        service: "control-plane",
        status: "healthy",
    })
})

test("the public health route answers browser CORS preflight requests", async () => {
    const response = await fetch(new URL("/health", server.url), {
        method: "OPTIONS",
        headers: {
            Origin: "https://proto.dev.bradlove.dev",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "content-type",
        },
    })

    expect(response.status).toBe(204)
    expect(response.headers.get("access-control-allow-origin")).toBe("*")
    expect(response.headers.get("access-control-allow-methods")).toBe("GET, OPTIONS")
    expect(response.headers.get("access-control-allow-headers")).toBe("*")
    expect(response.headers.get("access-control-allow-credentials")).toBeNull()
})

test("Studio can read the public health response from another origin", async () => {
    const response = await fetch(new URL("/health", server.url), {
        headers: {
            Origin: "https://proto.dev.bradlove.dev",
        },
    })

    expect(response.status).toBe(200)
    expect(response.headers.get("access-control-allow-origin")).toBe("*")
    expect(response.headers.get("access-control-allow-credentials")).toBeNull()
    expect(response.headers.get("cache-control")).toBe("no-store")
})
