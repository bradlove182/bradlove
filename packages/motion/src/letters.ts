import type { Attachment } from "svelte/attachments"

import { span, splitWords } from "./split.ts"

const variants = ["bloom", "grow", "focus", "wave"] as const

export type MotionLetters = (typeof variants)[number]

export const isLetters = (animation: string): animation is MotionLetters =>
    variants.some((variant) => variant === animation)

export type LettersOptions = {
    variant: MotionLetters
    /** Delay before the first letter starts, in ms. */
    delay?: number
    /** Gap between each letter starting, in ms. */
    stagger?: number
}

/** Deterministic 0..1 noise so delays are stable between renders. */
const noise = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453
    return x - Math.floor(x)
}

const orderFor = (variant: MotionLetters, index: number, middle: number) => {
    if (variant === "bloom") return Math.abs(index - middle)
    if (variant === "wave") return index + Math.sin(index * 0.9) * 0.6
    return index
}

const renderWord = (part: string) => {
    const word = span("motion-word")
    for (const character of part) {
        const letter = span("motion-letter")
        letter.textContent = character
        word.append(letter)
    }
    return word
}

/** Splits the element's text into per-letter spans for the `[data-letters]` animations. */
export const splitLetters =
    ({ variant, delay = 0, stagger = 110 }: LettersOptions): Attachment<HTMLElement> =>
    (host) =>
        splitWords(host, renderWord, () => {
            const letters = host.querySelectorAll<HTMLElement>(".motion-letter")
            const middle = (letters.length - 1) / 2
            letters.forEach((letter, index) => {
                letter.style.setProperty("--spread", String(index - middle))
                letter.style.setProperty("--tilt", String(Math.sin(index * 1.7) * 10))
                letter.style.animationDelay = `${Math.round(
                    delay + orderFor(variant, index, middle) * stagger + noise(index + 1) * stagger * 0.6,
                )}ms`
            })
        })
