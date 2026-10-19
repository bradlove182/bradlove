import type { Component, Snippet } from "svelte"
import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements"

export const supportedTags = ["div", "span", "h1", "h2", "h3"] as const

export type MotionAnimation = "fade" | "rise" | "blur" | "scale"

export type MotionTag = (typeof supportedTags)[number]

type MotionOwnProps = {
    class?: string
    /** Preset from motion.css. Omit to style `data-animation-state` yourself. */
    animation?: MotionAnimation
    /** Milliseconds. */
    delay?: number
    /** Milliseconds. */
    duration?: number
    /** Stop observing after the first reveal. */
    once?: boolean
    children?: Snippet
}

export type MotionElementProps<T extends MotionTag> = SvelteHTMLElements[T] & MotionOwnProps

export type MotionProps<T extends MotionTag> = MotionElementProps<T> & { tag: T }

export type MotionBaseProps = HTMLAttributes<HTMLElement> & MotionOwnProps & { tag: MotionTag }

export type MotionProxy = {
    [K in MotionTag]: Component<MotionElementProps<K>>
}
