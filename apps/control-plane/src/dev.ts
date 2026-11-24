import { Console, Effect } from "effect"

import controlPlane from "./worker"

const server = Bun.serve({
    port: Number(Bun.env.PORT ?? 3001),
    fetch: controlPlane.fetch,
})

Effect.runSync(Console.log(`Control plane listening at ${server.url.href}`))
