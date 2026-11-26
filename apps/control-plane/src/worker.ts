import {
    ControlPlaneApi,
    ControlPlaneHealth,
    PublicHealthHeaders,
} from "@bradlove/core/control-plane"
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

const withPublicHealthHeaders = HttpServerResponse.setHeaders({
    "access-control-allow-origin": "*",
    "cache-control": "no-store",
})

export const PublicHealthHeadersLayer = Layer.succeed(PublicHealthHeaders, (httpEffect) =>
    httpEffect.pipe(Effect.map(withPublicHealthHeaders)),
)

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
    ).pipe(Effect.map(withPublicHealthHeaders)),
)

export const ControlPlaneApp = Layer.mergeAll(
    HttpApiBuilder.layer(ControlPlaneApi),
    HealthPreflight,
).pipe(
    Layer.provide(SystemApiHandlers),
    Layer.provide(PublicHealthHeadersLayer),
    Layer.provide(HttpServer.layerServices),
)

export const controlPlaneWorker = Effect.gen(function* () {
    return {
        fetch: yield* HttpRouter.toHttpEffect(ControlPlaneApp),
    }
})
