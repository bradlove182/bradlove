import type { CardInterface } from "$lib/types/card"
import type { Snippet } from "svelte"
import Card from "./Card.svelte"

export interface Props {
    card: CardInterface
    onclick?: (card: CardInterface) => void
};

export { Card }
