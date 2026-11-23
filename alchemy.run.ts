import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Effect from "effect/Effect"

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
        const studioSite = yield* studio

        return {
            website: website.url,
            studio: studioSite.url,
        }
    }),
)
