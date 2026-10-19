import type { Attachment } from "svelte/attachments"

export type MotionLetters = "bloom" | "grow" | "focus" | "wave"

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

const span = (className: string) => {
    const element = document.createElement("span")
    element.className = className
    return element
}

/**
 * Splits the element's text into per-letter spans for the `[data-letters]` animations.
 * Each original text node moves into a visually hidden label, so screen readers get whole words
 * and Svelte keeps updating it; the letters rebuild whenever that text changes.
 */
export const splitLetters =
    ({ variant, delay = 0, stagger = 110 }: LettersOptions): Attachment<HTMLElement> =>
    (host) => {
        let restore: (() => void)[] = []

        const split = () => {
            const nodes: Text[] = []
            const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT)
            while (walker.nextNode()) {
                if (walker.currentNode instanceof Text && walker.currentNode.data.trim()) {
                    nodes.push(walker.currentNode)
                }
            }

            const total = nodes.reduce((sum, node) => sum + node.data.replace(/\s/g, "").length, 0)
            const middle = (total - 1) / 2
            let index = 0

            for (const node of nodes) {
                const wrapper = span("motion-text")
                const label = span("motion-label")
                const visual = span("")
                visual.setAttribute("aria-hidden", "true")

                for (const part of node.data.split(/(\s+)/)) {
                    if (!part) continue
                    if (/^\s+$/.test(part)) {
                        visual.append(part)
                        continue
                    }
                    const word = span("motion-word")
                    for (const character of part) {
                        const letter = span("motion-letter")
                        letter.textContent = character
                        letter.style.setProperty("--spread", String(index - middle))
                        letter.style.setProperty("--tilt", String(Math.sin(index * 1.7) * 10))
                        letter.style.animationDelay = `${Math.round(
                            delay + orderFor(variant, index, middle) * stagger + noise(index + 1) * stagger * 0.6,
                        )}ms`
                        word.append(letter)
                        index++
                    }
                    visual.append(word)
                }

                node.replaceWith(wrapper)
                label.append(node)
                wrapper.append(label, visual)
                restore.push(() => wrapper.replaceWith(node))
            }
        }

        const unsplit = () => {
            restore.forEach((fn) => fn())
            restore = []
        }

        split()

        const observer = new MutationObserver(() => {
            observer.disconnect()
            unsplit()
            split()
            observer.observe(host, { characterData: true, subtree: true })
        })
        observer.observe(host, { characterData: true, subtree: true })

        return () => {
            observer.disconnect()
            unsplit()
        }
    }
