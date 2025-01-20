import { getContext, hasContext, setContext } from "svelte"

export function useState<T extends Record<string, unknown>>(name: string, initialValue: T): T {
    if (hasContext(name)) {
        return getContext<T>(name)
    }

    const state = $state<T>(initialValue)
    setContext(name, state)

    return state
}
