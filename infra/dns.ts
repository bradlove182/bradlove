import { Stage } from "alchemy"
import { Effect } from "effect"

import { isPermanentStage } from "./helpers"

export const domain = Stage.useSync((stage) => {
    const current = stage.replace("dev_", "").trim()

    return (
        {
            production: "bradlove.dev",
            dev: "dev.bradlove.dev",
        }[current] ?? `${current}.dev.bradlove.dev`
    )
})

export function getSubdomain(name: string) {
    return Effect.gen(function* () {
        const isPermanent = yield* isPermanentStage
        const resolvedDomain = yield* domain

        if (isPermanent) {
            return `${name}.${resolvedDomain}`
        }

        return `${name}-${resolvedDomain}`
    })
}

export const domains = Effect.all({
    web: domain,
    ingest: getSubdomain("ingest"),
    dashboard: getSubdomain("app"),
} as const)
