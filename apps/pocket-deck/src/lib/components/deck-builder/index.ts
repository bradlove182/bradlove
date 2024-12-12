import type { CardInterface } from "$lib/types/card"
import type { Deck } from "$lib/types/deck"
import { replaceState } from "$app/navigation"
import DeckBuilder from "./DeckBuilder.svelte"

export interface Props extends Deck {}

interface CardWithIdentifier extends CardInterface {
    selectedId: string
}

function updateUrlCardState(ids: string[]) {
    const url = new URL(window.location.toString())
    url.searchParams.set("cards", ids.toString())
    replaceState(url, {})
}

function addCardIdentierProperty(card: CardInterface): CardWithIdentifier {
    const copy = structuredClone(card)
    return { ...copy, selectedId: crypto.randomUUID() }
}

function addCardToSelected(card: CardInterface, selectedCards: CardWithIdentifier[]) {
    selectedCards.push(addCardIdentierProperty(card))
}

export {
    addCardIdentierProperty,
    addCardToSelected,
    DeckBuilder,
    updateUrlCardState,
}
