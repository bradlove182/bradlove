import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Command from "alchemy/Command"
import * as Effect from "effect/Effect"

import { getSubdomain } from "./dns"

export const controlPlane = Effect.gen(function* () {
    const { dev } = yield* Alchemy.AlchemyContext

    if (dev) {
        return yield* Command.Dev("ControlPlaneDev", {
            command: "bun run dev",
            cwd: "apps/control-plane",
            env: {
                NODE_ENV: "development",
                PORT: "3001",
            },
        })
    }

    const domain = yield* getSubdomain("api.proto")

    return yield* Cloudflare.Worker("ControlPlane", {
        main: "apps/control-plane/src/worker.ts",
        domain,
        compatibility: {
            flags: ["nodejs_compat"],
        },
    })
})
