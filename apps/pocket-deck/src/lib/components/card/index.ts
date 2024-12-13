import type { CardInterface } from "$lib/types/card"
import type { Snippet } from "svelte"
import type { HTMLAttributes } from "svelte/elements"
import Card from "./Card.svelte"

export interface Props extends Omit<HTMLAttributes<HTMLElement>, "onclick"> {
    card: CardInterface
    onclick?: (card: CardInterface) => void
};

export { Card }
