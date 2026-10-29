import { MotionContext } from "./context.svelte.ts"

export type ScrollOptions = {
    /** Pixels above the bottom of the viewport the element's top must reach before starting. Ignored when pinned. */
    offset?: number
    /** Pixels of scrolling, beyond the element's own height, that the animation takes. Ignored when pinned. */
    length?: number
    /** Watches the element so scroll tracking pauses while it's off screen. Defaults to a shared context. */
    context?: MotionContext
}

export const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

let sharedContext: MotionContext | undefined

/** The `pin` ancestor and its direct child that holds `host`, which should be sticky. */
const findPin = (host: HTMLElement) => {
    const pin = host.closest<HTMLElement>("[data-motion-pin]")
    let stuck: HTMLElement | null = host
    while (pin && stuck && stuck.parentElement !== pin) stuck = stuck.parentElement
    return pin && stuck ? { pin, stuck } : undefined
}

/**
 * Scroll progress from 0 to 1. Inside a `pin` element, it's how far the sticky child
 * has travelled through the pin, so it runs exactly while the content is held in place. Otherwise
 * it starts when the element's top is `offset` above the bottom of the viewport and lasts for the
 * element's height plus `length`.
 */
export const scrollProgress = (host: HTMLElement, { offset = 100, length = 250 }: ScrollOptions) => {
    const pinned = findPin(host)
    if (pinned) {
        const pin = pinned.pin.getBoundingClientRect()
        const stuck = pinned.stuck.getBoundingClientRect()
        const range = pin.height - stuck.height
        if (range > 0) return clamp((stuck.top - pin.top) / range)
    }
    const { top, height } = host.getBoundingClientRect()
    return clamp((innerHeight - offset - top) / (height + length))
}

/**
 * Calls `update` once per frame while scrolling, but only while the element (or its pin) is on screen,
 * plus once as it leaves so a fast scroll never strands it midway. Returns a function that stops tracking.
 */
export const trackScroll = (host: HTMLElement, update: () => void, context?: MotionContext) => {
    let frame = 0
    const run = () => {
        frame = 0
        update()
    }
    const schedule = () => {
        frame ||= requestAnimationFrame(run)
    }
    const listen = (on: boolean) => {
        const method = on ? "addEventListener" : "removeEventListener"
        // Capture catches scrolling inside any container, not just the window.
        document[method]("scroll", schedule, { passive: true, capture: true })
        window[method]("resize", schedule)
    }

    let unwatch: (() => void) | undefined
    let stopped = false
    // Deferred because a parent's `pin` attachment can run after this element's attachments.
    queueMicrotask(() => {
        if (stopped) return
        const target = findPin(host)?.pin ?? host
        unwatch = (context ?? (sharedContext ??= new MotionContext())).watch(target, (visible) => {
            listen(visible)
            if (visible) schedule()
            else update()
        })
    })

    return () => {
        stopped = true
        cancelAnimationFrame(frame)
        unwatch?.()
        listen(false)
    }
}
