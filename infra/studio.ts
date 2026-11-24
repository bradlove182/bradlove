import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Command from "alchemy/Command"
import * as Output from "alchemy/Output"
import * as Effect from "effect/Effect"

import { getSubdomain } from "./dns"

export function studio(controlPlaneUrl: Output.Output<string | undefined>) {
    return Effect.gen(function* () {
        const { dev } = yield* Alchemy.AlchemyContext

        if (dev) {
            return yield* Command.Dev("StudioDev", {
                command: "bun run dev",
                cwd: "apps/studio",
                // The alchemy CLI sets NODE_ENV=production for itself; inherited, Vite would treat dev as production.
                env: {
                    NODE_ENV: "development",
                    CONTROL_PLANE_URL: controlPlaneUrl,
                },
            })
        }

        const domain = yield* getSubdomain("proto")

        const build = yield* Command.Build("StudioBuild", {
            command: "bun run build",
            cwd: "apps/studio",
            outdir: ".svelte-kit/cloudflare",
            env: {
                CONTROL_PLANE_URL: controlPlaneUrl,
            },
        })

        return yield* Cloudflare.Worker("Studio", {
            main: Output.interpolate`${build.outdir}/_worker.js`,
            domain,
            assets: {
                directory: build.outdir,
            },
            compatibility: {
                flags: ["nodejs_compat"],
            },
        })
    })
}
