import type { CardInterface } from "$lib/types/card"
import type { Deck } from "$lib/types/deck"
import { replaceState } from "$app/navigation"
import { encodeBase64url } from "$lib/crypto"
import DeckBuilder from "./DeckBuilder.svelte"

type SortFunction = (cards: CardWithIdentifier[]) => CardWithIdentifier[]

export interface Props extends Deck {
    initialCards?: string[]
}

interface CardWithIdentifier extends CardInterface {
    selectedId: string
}

function updateUrlCardState(ids: string[]) {
    const url = new URL(window.location.toString())
    url.pathname = url.pathname.replace(/(build)\/?([\w=-]*)$/, `$1/${encodeBase64url(ids.toString())}`)
    replaceState(url, {})
}

function addCardIdentifierProperty(card: CardInterface): CardWithIdentifier {
    const copy = structuredClone(card)
    return { ...copy, selectedId: crypto.randomUUID() }
}

function addCardToSelected(card: CardInterface, selectedCards: CardWithIdentifier[]) {
    selectedCards.push(addCardIdentifierProperty(card))
}

function sortCards(sorts: SortFunction[], cards: CardWithIdentifier[]) {
    sorts.forEach((sort) => {
        sort(cards)
    })
}

function sortByEvolution(cards: CardWithIdentifier[]) {
    return cards.sort((a, b) => a.evolution && b.evolution ? a.evolution.localeCompare(b.evolution) : 0)
}

function sortByEx(cards: CardWithIdentifier[]) {
    return cards.sort((a, b) => (a.ex === b.ex) ? 0 : a.ex ? 1 : -1)
}

function sortByType(cards: CardWithIdentifier[]) {
    return cards.sort((a, b) => a.type && b.type ? a.type.localeCompare(b.type) : 0)
}

function sortByCategory(cards: CardWithIdentifier[]) {
    return cards.sort((a, b) => a.category.localeCompare(b.category))
}

function sortByTrainerCategory(cards: CardWithIdentifier[]) {
    return cards.sort(
        (a, b) => (a.trainerSubcategory === b.trainerSubcategory)
            ? 0
            : a.trainerSubcategory && b.trainerSubcategory
                ? a.trainerSubcategory.localeCompare(b.trainerSubcategory)
                : 0,
    )
}

export {
    addCardIdentifierProperty,
    addCardToSelected,
    DeckBuilder,
    sortByCategory,
    sortByEvolution,
    sortByEx,
    sortByTrainerCategory,
    sortByType,
    sortCards,
    updateUrlCardState,
}
