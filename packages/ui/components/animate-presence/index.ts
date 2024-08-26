import type { HTMLAttributes } from "svelte/elements"
import AnimatePresence from "./AnimatePresence.svelte"

type Props = {
    tag?: keyof HTMLElementTagNameMap
    animations?: string
} & HTMLAttributes<HTMLElement>

export { AnimatePresence, type Props }
