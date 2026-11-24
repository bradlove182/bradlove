import { ControlPlaneHealth } from "@bradlove/core/schemas/health"
import { Context, Effect, Layer } from "effect"
import { HttpRouter, HttpServer } from "effect/http"
import { HttpApi, HttpApiBuilder, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"

export class SystemApi extends HttpApiGroup.make("system", { topLevel: true }).add(
    HttpApiEndpoint.get("health", "/health", {
        success: ControlPlaneHealth,
    }),
) {}

export class ControlPlaneApi extends HttpApi.make("control-plane").add(SystemApi) {}

const SystemApiHandlers = HttpApiBuilder.group(ControlPlaneApi, "system", (handlers) =>
    handlers.handle("health", () =>
        Effect.succeed(
            new ControlPlaneHealth({
                service: "control-plane",
                status: "healthy",
            }),
        ),
    ),
)

const ApiRoutes = HttpApiBuilder.layer(ControlPlaneApi).pipe(Layer.provide(SystemApiHandlers))

const app = HttpRouter.toWebHandler(ApiRoutes.pipe(Layer.provide(HttpServer.layerServices)), {
    disableLogger: true,
})

const withPublicHealthHeaders = (response: Response): Response => {
    const headers = new Headers(response.headers)
    headers.set("access-control-allow-origin", "*")
    headers.set("cache-control", "no-store")

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    })
}

export default {
    fetch: (request: Request) => {
        if (new URL(request.url).pathname === "/health" && request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    "access-control-allow-origin": "*",
                    "access-control-allow-methods": "GET, OPTIONS",
                    "access-control-allow-headers": "*",
                    "cache-control": "no-store",
                },
            })
        }

        return app
            .handler(request, Context.empty())
            .then((response) =>
                new URL(request.url).pathname === "/health"
                    ? withPublicHealthHeaders(response)
                    : response,
            )
    },
}
