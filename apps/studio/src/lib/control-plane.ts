import { ControlPlaneHealth } from "@bradlove/core/schemas/health"
import { Effect } from "effect"
import { FetchHttpClient, HttpClient, HttpClientResponse } from "effect/http"

export const getControlPlaneHealth = (baseUrl: string) =>
    HttpClient.get(new URL("/health", baseUrl)).pipe(
        Effect.flatMap(HttpClientResponse.filterStatusOk),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(ControlPlaneHealth)),
        Effect.provide(FetchHttpClient.layer),
    )
