import { getContext, hasContext, onDestroy, setContext } from "svelte"
import type { Attachment } from "svelte/attachments"

export type Watcher = (visible: boolean) => void

export class MotionContext {
    private observer: IntersectionObserver | undefined
    /** Separate from `observer`: watchers need to hear about any overlap, and keep hearing after the first. */
    private watchObserver: IntersectionObserver | undefined
    private watchers = new Map<Element, Watcher>()

    constructor(private options?: IntersectionObserverInit) {}

    private watchHandler: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => this.watchers.get(entry.target)?.(entry.isIntersecting))
    }

    private handler: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            entry.target.setAttribute(
                "data-animation-state",
                entry.isIntersecting ? "show" : "hide",
            )
            if (entry.isIntersecting && !entry.target.hasAttribute("data-motion-repeat")) {
                this.remove(entry.target)
            }
        })
    }

    // Created on first use so construction is safe during SSR, where attachments never run.
    add = (element: Element) => {
        this.observer ??= new IntersectionObserver(this.handler, {
            threshold: 0.5,
            ...this.options,
        })
        this.observer.observe(element)
    }

    remove = (element: Element) => this.observer?.unobserve(element)

    /**
     * Calls `watcher` whenever any part of the element enters or leaves the viewport (widened by the
     * context's `rootMargin`), for as long as it's watched. Returns a function that stops watching.
     */
    watch = (element: Element, watcher: Watcher) => {
        this.watchObserver ??= new IntersectionObserver(this.watchHandler, {
            root: this.options?.root,
            rootMargin: this.options?.rootMargin,
            threshold: 0,
        })
        this.watchers.set(element, watcher)
        this.watchObserver.observe(element)
        return () => {
            this.watchers.delete(element)
            this.watchObserver?.unobserve(element)
        }
    }

    disconnect = () => {
        this.observer?.disconnect()
        this.observer = undefined
        this.watchObserver?.disconnect()
        this.watchObserver = undefined
        this.watchers.clear()
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
