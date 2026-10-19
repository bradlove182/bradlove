import type { Component, Snippet } from "svelte"
import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements"

import type { MotionLetters } from "./letters.ts"

export const supportedTags = ["div", "span", "p", "h1", "h2", "h3"] as const

export type MotionAnimation = "fade" | "rise" | "blur" | "scale"

export type MotionTag = (typeof supportedTags)[number]

type MotionOwnProps = {
    class?: string
    /** Element preset from motion.css. Omit to style `data-animation-state` yourself. */
    animation?: MotionAnimation
    /** Per-letter animation of the element's text. Combines with `animation`. */
    letters?: MotionLetters
    /** Milliseconds before entering; for `letters`, before the first letter. */
    delay?: number
    /** Milliseconds. Defaults to 600 for `animation` and 1800 per letter. */
    duration?: number
    /** Milliseconds between letters starting. Only used with `letters`. */
    stagger?: number
    /** Animate out on leaving the viewport and in again on return. By default elements animate in once. */
    repeat?: boolean
    children?: Snippet
}

export type MotionElementProps<T extends MotionTag> = SvelteHTMLElements[T] & MotionOwnProps

export type MotionProps<T extends MotionTag> = MotionElementProps<T> & { tag: T }

export type MotionBaseProps = HTMLAttributes<HTMLElement> & MotionOwnProps & { tag: MotionTag }

export type MotionProxy = {
    [K in MotionTag]: Component<MotionElementProps<K>>
}
