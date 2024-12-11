import type { Card as CardInterface } from "$lib/types/card"
import Card from "./Card.svelte"

export interface Props {
    card: CardInterface
};

export { Card }
