import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Effect from "effect/Effect"

import { controlPlane } from "./infra/control-plane"
import { studio } from "./infra/studio"
import { web } from "./infra/web"

export default Alchemy.Stack(
    "Bradlove",
    {
        providers: Cloudflare.providers(),
        state: Cloudflare.state(),
    },
    Effect.gen(function* () {
        const website = yield* web
        const controlPlaneApi = yield* controlPlane
        const studioSite = yield* studio(controlPlaneApi.url)

        return {
            website: website.url,
            controlPlane: controlPlaneApi.url,
            studio: studioSite.url,
        }
    }),
)
