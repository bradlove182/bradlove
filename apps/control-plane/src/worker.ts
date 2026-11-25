import { ControlPlaneApi, ControlPlaneHealth } from "@bradlove/core/control-plane"
import { Effect, Layer } from "effect"
import { HttpRouter, HttpServer, HttpServerResponse } from "effect/http"
import { HttpApiBuilder } from "effect/http-api"

export const SystemApiHandlers = HttpApiBuilder.group(ControlPlaneApi, "system", (handlers) =>
    handlers.handle("health", () =>
        Effect.succeed(
            new ControlPlaneHealth({
                service: "control-plane",
                status: "healthy",
            }),
        ),
    ),
)

const PublicHealthHeaders = HttpRouter.middleware((httpEffect) =>
    httpEffect.pipe(
        Effect.map(
            HttpServerResponse.setHeaders({
                "access-control-allow-origin": "*",
                "cache-control": "no-store",
            }),
        ),
    ),
).layer

const HealthPreflight = HttpRouter.add(
    "OPTIONS",
    "/health",
    Effect.succeed(
        HttpServerResponse.empty({
            headers: {
                "access-control-allow-methods": "GET, OPTIONS",
                "access-control-allow-headers": "*",
            },
        }),
    ),
)

export const ControlPlaneApp = Layer.mergeAll(
    HttpApiBuilder.layer(ControlPlaneApi),
    HealthPreflight,
).pipe(
    Layer.provide(SystemApiHandlers),
    Layer.provide(PublicHealthHeaders),
    Layer.provide(HttpServer.layerServices),
)

export const controlPlaneWorker = Effect.gen(function* () {
    return {
        fetch: yield* HttpRouter.toHttpEffect(ControlPlaneApp),
    }
})
