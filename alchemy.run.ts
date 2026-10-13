import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Effect from "effect/Effect"

import { web } from "./infra/web"

export default Alchemy.Stack(
    "Bradlove",
    {
        providers: Cloudflare.providers(),
        state: Cloudflare.state(),
    },
    Effect.gen(function* () {
        const website = yield* web

        return {
            website: website.url,
        }
    }),
)
