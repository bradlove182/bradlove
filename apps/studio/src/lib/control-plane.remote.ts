import { CONTROL_PLANE_URL } from "$app/env/private"
import { query } from "$app/server"
import { makeControlPlaneClient } from "@bradlove/core/control-plane"
import { Effect } from "effect"

export const getControlPlaneHealth = query(() =>
    Effect.runPromise(
        makeControlPlaneClient(CONTROL_PLANE_URL).pipe(
            Effect.flatMap((client) => client.health()),
            Effect.timeout("5 seconds"),
            Effect.match({
                onFailure: () => ({ status: "unavailable" as const }),
                onSuccess: () => ({ status: "healthy" as const }),
            }),
        ),
    ),
)
