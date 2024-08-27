import type { HTMLAttributes } from "svelte/elements"
import Pill from "./Pill.svelte"

type Props = HTMLAttributes<HTMLSpanElement | HTMLAnchorElement> & {
    tag?: Extract<keyof HTMLElementTagNameMap, "span" | "a">
}

export { type Props, Pill }
