import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"

import { ControlPlaneHealth } from "@bradlove/core/schemas/health"
import { Context, Schema } from "effect"
import { HttpRouter } from "effect/http"

import { ControlPlaneApp } from "../src/worker"

const app = HttpRouter.toWebHandler(ControlPlaneApp, {
    disableLogger: true,
})

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
