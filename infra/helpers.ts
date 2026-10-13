import { Stage } from "alchemy/Stage"

export const isProductionStage = Stage.useSync((stage) => ["production"].includes(stage))

export const isDevStage = Stage.useSync((stage) => ["dev"].includes(stage))

/** Pure predicate: permanent stages are production and dev (never previews or test stages). */
export function isPermanentStageName(stage: string): boolean {
    return stage === "production" || stage === "dev"
}

export const isPermanentStage = Stage.useSync(isPermanentStageName)
