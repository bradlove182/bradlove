import { createContext } from "svelte"

export class PageTransitionContext {
    ready = $state(true)
}

export const [getPageTransition, setPageTransition] = createContext<PageTransitionContext>()
