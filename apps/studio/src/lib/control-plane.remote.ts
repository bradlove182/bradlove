import { CONTROL_PLANE_URL } from "$app/env/private"
import { query } from "$app/server"
import { ControlPlaneClient } from "@bradlove/core/control-plane"
import { Effect } from "effect"

export const getControlPlaneHealth = query(() =>
    Effect.runPromise(
        ControlPlaneClient.use((client) => client.health()).pipe(
            Effect.timeout("5 seconds"),
            Effect.provide(ControlPlaneClient.layer(CONTROL_PLANE_URL)),
            Effect.match({
                onFailure: () => ({ status: "unavailable" as const }),
                onSuccess: () => ({ status: "healthy" as const }),
            }),
        ),
    ),
)
