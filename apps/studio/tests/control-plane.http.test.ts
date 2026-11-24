import { expect, test } from "bun:test"

import { Effect, Exit } from "effect"

import { getControlPlaneHealth } from "../src/lib/control-plane"

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
