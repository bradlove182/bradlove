import { Context, Layer } from "effect"
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/http"
import { HttpApi, HttpApiClient, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"

import { ControlPlaneHealth } from "../schemas/health"

export { ControlPlaneHealth } from "../schemas/health"

export class SystemApi extends HttpApiGroup.make("system", { topLevel: true }).add(
    HttpApiEndpoint.get("health", "/health", {
        success: ControlPlaneHealth,
    }),
) {}

export class ControlPlaneApi extends HttpApi.make("control-plane").add(SystemApi) {}

export class ControlPlaneClient extends Context.Service<
    ControlPlaneClient,
    HttpApiClient.ForApi<typeof ControlPlaneApi>
>()("@bradlove/core/control-plane/ControlPlaneClient") {
    static readonly layer = (baseUrl: string): Layer.Layer<ControlPlaneClient> =>
        Layer.effect(
            ControlPlaneClient,
            HttpApiClient.make(ControlPlaneApi, {
                transformClient: (client) =>
                    client.pipe(HttpClient.mapRequest(HttpClientRequest.prependUrl(baseUrl))),
            }),
        ).pipe(Layer.provide(FetchHttpClient.layer))
}
