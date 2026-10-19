import { getContext, hasContext, onDestroy, setContext } from "svelte"
import type { Attachment } from "svelte/attachments"

export class MotionContext {
    private observer: IntersectionObserver | undefined

    constructor(private options?: IntersectionObserverInit) {}

    private handler: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            entry.target.setAttribute(
                "data-animation-state",
                entry.isIntersecting ? "show" : "hide",
            )
            if (entry.isIntersecting && entry.target.hasAttribute("data-motion-once")) {
                this.remove(entry.target)
            }
        })
    }

    // Created on first use so construction is safe during SSR, where attachments never run.
    add = (element: Element) => {
        this.observer ??= new IntersectionObserver(this.handler, {
            threshold: 0.1,
            ...this.options,
        })
        this.observer.observe(element)
    }

    remove = (element: Element) => this.observer?.unobserve(element)

    disconnect = () => {
        this.observer?.disconnect()
        this.observer = undefined
    }
}

const key = Symbol("motion")

/**
 * Registers a new observer for descendants, replacing any inherited one.
 */
export const createMotion = (options?: IntersectionObserverInit) => {
    const motion = setContext(key, new MotionContext(options))
    onDestroy(motion.disconnect)
    return motion
}

/**
 * Controls the animation state when an element enters and exits the viewport.
 * Reuses the nearest observer, creating one if no ancestor has registered it.
 */
export const useMotion = (options?: IntersectionObserverInit) => {
    const context = hasContext(key) ? getContext<MotionContext>(key) : createMotion(options)

    const motion: Attachment = (element) => {
        context.add(element)
        return () => context.remove(element)
    }

    return [motion, context] as const
}
