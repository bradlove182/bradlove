import type { HTMLAttributes } from "svelte/elements"
import Box from "./Box.svelte"

type Props = {
    tag?: keyof HTMLElementTagNameMap
} & HTMLAttributes<HTMLElement>

export { Box, type Props }
