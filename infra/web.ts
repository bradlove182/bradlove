import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Command from "alchemy/Command"
import * as Output from "alchemy/Output"
import * as Effect from "effect/Effect"

import { domain as rootDomain } from "./dns"

export const web = Effect.gen(function* () {
    const { dev } = yield* Alchemy.AlchemyContext

    if (dev) {
        return yield* Command.Dev("WebDev", {
            command: "bun run dev",
            cwd: "apps/web",
            // The alchemy CLI sets NODE_ENV=production for itself; inherited, Vite would treat dev as production.
            env: { NODE_ENV: "development" },
        })
    }

    const domain = yield* rootDomain

    const build = yield* Command.Build("WebBuild", {
        command: "bun run build",
        cwd: "apps/web",
        outdir: ".svelte-kit/cloudflare",
    })

    return yield* Cloudflare.Worker("Web", {
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
