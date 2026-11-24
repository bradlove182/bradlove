import { expect, test } from "bun:test"

import { ControlPlaneHealth } from "@bradlove/core/schemas/health"
import { Schema } from "effect"

import controlPlane from "../src/worker"

test("the control plane reports healthy through its public HTTP interface", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: controlPlane.fetch,
    })

    try {
        const response = await fetch(new URL("/health", server.url))
        const payload: unknown = await response.json()

        expect(response.status).toBe(200)
        expect(response.headers.get("content-type")).toContain("application/json")
        expect(() => Schema.decodeUnknownSync(ControlPlaneHealth)(payload)).not.toThrow()
        expect(payload).toEqual({
            service: "control-plane",
            status: "healthy",
        })
    } finally {
        await server.stop(true)
    }
})

test("the public health route answers browser CORS preflight requests", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: controlPlane.fetch,
    })

    try {
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
    } finally {
        await server.stop(true)
    }
})

test("Studio can read the public health response from another origin", async () => {
    const server = Bun.serve({
        port: 0,
        fetch: controlPlane.fetch,
    })

    try {
        const response = await fetch(new URL("/health", server.url), {
            headers: {
                Origin: "https://proto.dev.bradlove.dev",
            },
        })

        expect(response.status).toBe(200)
        expect(response.headers.get("access-control-allow-origin")).toBe("*")
        expect(response.headers.get("access-control-allow-credentials")).toBeNull()
        expect(response.headers.get("cache-control")).toBe("no-store")
    } finally {
        await server.stop(true)
    }
})
