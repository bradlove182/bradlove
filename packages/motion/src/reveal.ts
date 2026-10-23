import type { Attachment } from "svelte/attachments"

import { MotionContext } from "./context.svelte.ts"
import { span, splitWords } from "./split.ts"

export type RevealOptions = {
    /** Fraction of a word's reveal between consecutive words in a line starting. */
    stagger?: number
    /** Fraction of a line's reveal before the next line starts. */
    lineOffset?: number
    /** Pixels above the bottom of the viewport the element's top must reach before revealing starts. */
    offset?: number
    /** Pixels of scrolling, beyond the element's own height, that the reveal takes. */
    length?: number
    /** Watches the element so scroll tracking pauses while it's off screen. Defaults to a shared context. */
    context?: MotionContext
}

type Word = { element: HTMLElement; start: number; value: number }

const clamp = (value: number) => Math.min(Math.max(value, 0), 1)
const quintOut = (t: number) => 1 - (1 - t) ** 5

let sharedContext: MotionContext | undefined

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
 * Scroll events are only listened to while the element is on screen.
 */
export const scrollReveal =
    ({
        stagger = 0.1,
        lineOffset = 0.2,
        offset = 100,
        length = 250,
        context,
    }: RevealOptions = {}): Attachment<HTMLElement> =>
    (host) => {
        let words: Word[] = []
        let total = 1
        let frame = 0
        let active = true

        const update = () => {
            frame = 0
            const { top, height } = host.getBoundingClientRect()
            const progress = clamp((innerHeight - offset - top) / (height + length)) * total
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

        const schedule = () => {
            frame ||= requestAnimationFrame(update)
        }

        const listen = (on: boolean) => {
            const method = on ? "addEventListener" : "removeEventListener"
            // Capture catches scrolling inside any container, not just the window.
            document[method]("scroll", schedule, { passive: true, capture: true })
            window[method]("resize", schedule)
        }

        const unsplit = splitWords(host, renderWord, measure)
        const resize = new ResizeObserver(measure)
        resize.observe(host)
        document.fonts.ready.then(measure)

        // Finishing with one last update leaves words at their final position after a fast scroll away.
        const unwatch = (context ?? (sharedContext ??= new MotionContext())).watch(host, (visible) => {
            listen(visible)
            if (visible) schedule()
            else update()
        })

        return () => {
            active = false
            cancelAnimationFrame(frame)
            unwatch()
            listen(false)
            resize.disconnect()
            unsplit()
        }
    }
