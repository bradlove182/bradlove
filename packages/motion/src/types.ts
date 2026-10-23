import type { Component, Snippet } from "svelte"
import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements"

import type { MotionLetters } from "./letters.ts"

export const supportedTags = ["div", "span", "p", "h1", "h2", "h3"] as const

export type MotionTag = (typeof supportedTags)[number]

/** Animates the whole element when it enters the viewport. */
export type MotionElementAnimation = "fade" | "rise" | "blur" | "scale"

export type MotionAnimation = MotionElementAnimation | MotionLetters | "reveal"

type ElementOwnProps = {
    /** Omit to style `data-animation-state` yourself. */
    animation?: MotionElementAnimation
    /** Milliseconds before entering. */
    delay?: number
    /** Milliseconds. Defaults to 800. */
    duration?: number
    stagger?: never
    /** Animate out on leaving the viewport and in again on return. By default elements animate in once. */
    repeat?: boolean
}

type LettersOwnProps = {
    /** Splits the text into letters and staggers them in. */
    animation: MotionLetters
    /** Milliseconds before the first letter. */
    delay?: number
    /** Milliseconds per letter. Defaults to 1800. */
    duration?: number
    /** Milliseconds between letters starting. */
    stagger?: number
    repeat?: boolean
}

type RevealOwnProps = {
    /** Scroll-linked word reveal, line by line. Follows the scroll position, so timing props don't apply. */
    animation: "reveal"
    delay?: never
    duration?: never
    stagger?: never
    repeat?: never
}

type MotionOwnProps = {
    class?: string
    children?: Snippet
} & (ElementOwnProps | LettersOwnProps | RevealOwnProps)

export type MotionElementProps<T extends MotionTag> = SvelteHTMLElements[T] & MotionOwnProps

export type MotionProps<T extends MotionTag> = MotionElementProps<T> & { tag: T }

export type MotionBaseProps = HTMLAttributes<HTMLElement> & MotionOwnProps & { tag: MotionTag }

export type MotionProxy = {
    [K in MotionTag]: Component<MotionElementProps<K>>
}
