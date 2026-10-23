export const span = (className: string) => {
    const element = document.createElement("span")
    element.className = className
    return element
}

/**
 * Replaces each word of the host's text with `render(word)`, keeping whitespace and nested elements.
 * Each original text node moves into a visually hidden label, so screen readers get whole words
 * and Svelte keeps updating it; the words rebuild, and `ready` reruns, whenever that text changes.
 * Returns a function that restores the original text.
 */
export const splitWords = (host: HTMLElement, render: (word: string) => HTMLElement, ready?: () => void) => {
    let restore: (() => void)[] = []

    const split = () => {
        const nodes: Text[] = []
        const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT)
        while (walker.nextNode()) {
            if (walker.currentNode instanceof Text && walker.currentNode.data.trim()) {
                nodes.push(walker.currentNode)
            }
        }

        for (const node of nodes) {
            const wrapper = span("motion-text")
            const label = span("motion-label")
            const visual = span("")
            visual.setAttribute("aria-hidden", "true")

            for (const part of node.data.split(/(\s+)/)) {
                if (!part) continue
                visual.append(/^\s+$/.test(part) ? part : render(part))
            }

            node.replaceWith(wrapper)
            label.append(node)
            wrapper.append(label, visual)
            restore.push(() => wrapper.replaceWith(node))
        }
        ready?.()
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
