import type { Attachment } from "svelte/attachments"

import { clamp, scrollProgress, type ScrollOptions, trackScroll } from "./scroll.ts"
import { span, splitWords } from "./split.ts"

export type HighlightOptions = ScrollOptions

const renderWord = (word: string) => {
    const element = span("motion-highlight-word")
    element.textContent = word
    return element
}

/**
 * Splits the element's text into words that brighten from dim to full, one after another, as the
 * element scrolls through the viewport. Progress follows the scroll position, so scrolling back reverses it.
 */
export const scrollHighlight =
    (scroll: HighlightOptions = {}): Attachment<HTMLElement> =>
    (host) => {
        let words: { element: HTMLElement; value: number }[] = []

        const update = () => {
            const progress = scrollProgress(host, scroll) * words.length
            words.forEach((word, index) => {
                const value = clamp(progress - index)
                if (value === word.value) return
                word.value = value
                word.element.style.setProperty("--highlight", String(value))
            })
        }

        const collect = () => {
            words = [...host.querySelectorAll<HTMLElement>(".motion-highlight-word")].map((element) => ({
                element,
                value: -1,
            }))
            update()
        }

        const unsplit = splitWords(host, renderWord, collect)
        const untrack = trackScroll(host, update, scroll.context)

        return () => {
            untrack()
            unsplit()
        }
    }
