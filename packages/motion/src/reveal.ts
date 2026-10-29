import type { Attachment } from "svelte/attachments"

import { clamp, scrollProgress, type ScrollOptions, trackScroll } from "./scroll.ts"
import { span, splitWords } from "./split.ts"

export type RevealOptions = ScrollOptions & {
    /** Fraction of a word's reveal between consecutive words in a line starting. */
    stagger?: number
    /** Fraction of a line's reveal before the next line starts. */
    lineOffset?: number
}

type Word = { element: HTMLElement; start: number; value: number }

const quintOut = (t: number) => 1 - (1 - t) ** 5

const renderWord = (word: string) => {
    const mask = span("motion-reveal-mask")
    const inner = span("motion-reveal-word")
    inner.textContent = word
    mask.append(inner)
    return mask
}

/**
 * Splits the element's text into masked words that drop into place as the element scrolls through
 * the viewport, line by line. Progress follows the scroll position, so scrolling back reverses it.
 */
export const scrollReveal =
    ({ stagger = 0.1, lineOffset = 0.2, ...scroll }: RevealOptions = {}): Attachment<HTMLElement> =>
    (host) => {
        let words: Word[] = []
        let total = 1
        let active = true

        const update = () => {
            const progress = scrollProgress(host, scroll) * total
            for (const word of words) {
                const value = quintOut(clamp(progress - word.start))
                if (value === word.value) continue
                word.value = value
                word.element.style.setProperty("--reveal", String(value))
            }
        }

        /** Groups words into lines by position, then lays out each word's start on a timeline of word-length units. */
        const measure = () => {
            if (!active) return
            const lines: HTMLElement[][] = []
            let lineTop = -Infinity
            for (const mask of host.querySelectorAll<HTMLElement>(".motion-reveal-mask")) {
                const rect = mask.getBoundingClientRect()
                if (rect.top > lineTop + rect.height / 2) {
                    lines.push([])
                    lineTop = rect.top
                }
                lines.at(-1)?.push(mask.firstElementChild as HTMLElement)
            }

            words = []
            total = 0
            let lineStart = 0
            for (const line of lines) {
                line.forEach((element, index) => {
                    words.push({ element, start: lineStart + index * stagger, value: -1 })
                })
                const duration = 1 + stagger * (line.length - 1)
                total = Math.max(total, lineStart + duration)
                lineStart += duration * lineOffset
            }

            update()
        }

        const unsplit = splitWords(host, renderWord, measure)
        const resize = new ResizeObserver(measure)
        resize.observe(host)
        document.fonts.ready.then(measure)
        const untrack = trackScroll(host, update, scroll.context)

        return () => {
            active = false
            untrack()
            resize.disconnect()
            unsplit()
        }
    }
