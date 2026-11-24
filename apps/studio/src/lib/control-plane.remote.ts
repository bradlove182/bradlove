import { CONTROL_PLANE_URL } from "$app/env/private"
import { query } from "$app/server"
import { Effect } from "effect"

import { getControlPlaneHealth as fetchControlPlaneHealth } from "./control-plane"

export const getControlPlaneHealth = query(() =>
    Effect.runPromise(
        fetchControlPlaneHealth(CONTROL_PLANE_URL).pipe(
            Effect.match({
                onFailure: () => ({ status: "unavailable" as const }),
                onSuccess: () => ({ status: "healthy" as const }),
            }),
        ),
    ),
)
