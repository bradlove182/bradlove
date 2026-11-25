import { CONTROL_PLANE_URL } from "$app/env/private"
import { query } from "$app/server"
import { ControlPlaneClient } from "@bradlove/core/control-plane"
import { Effect, ManagedRuntime } from "effect"

const controlPlaneRuntime = ManagedRuntime.make(ControlPlaneClient.layer(CONTROL_PLANE_URL))

export const getControlPlaneHealth = query(() =>
    controlPlaneRuntime.runPromise(
        ControlPlaneClient.use((client) => client.health()).pipe(
            Effect.timeout("5 seconds"),
            Effect.match({
                onFailure: () => ({ status: "unavailable" as const }),
                onSuccess: () => ({ status: "healthy" as const }),
            }),
        ),
    ),
)
