<script lang="ts" module>
    import type { CardInterface } from "$lib/types/card"

    interface CardWithIdentifier extends CardInterface {
        selectedId: string
    }
</script>

<script lang="ts">
    import { Card } from "$lib/components/card"
    import { Button } from "@repo/ui"
    import Fuse from "fuse.js"
    import { onMount, tick } from "svelte"
    import { flip } from "svelte/animate"
    import { scale } from "svelte/transition"
    import {
        addCardToSelected,
        type Props,
        sortByCategory,
        sortByEvolution,
        sortByEx,
        sortByTrainerCategory,
        sortByType,
        sortCards,
        updateUrlCardState,
    } from "."

    const { cards, initialCards = [] }: Props = $props()

    let selectedCards = $state<CardWithIdentifier[]>([])
    const selectedCardIds = $derived(selectedCards.map(selected => selected.id))

    let searchValue = $state<string>("")

    const sortOrder = [sortByEvolution, sortByEx, sortByCategory, sortByTrainerCategory, sortByType]

    const fuse = new Fuse(cards, { keys: [
        {
            name: "name",
            weight: 0.9,
        },
        {
            name: "relatedCards",
            weight: 0.7,
        },
    ] })

    const filteredCards = $derived.by(() => {
        const results = fuse.search(searchValue).map(item => item.item)

        if (results.length === 0 && !searchValue) {
            return cards
        }

        return results
    })

    onMount(() => {
        initialCards.forEach((id) => {
            const currentCard = cards.find(item => item.id === id)

            if (currentCard) {
                addCardToSelected(currentCard, selectedCards)
            }
        })
    })

    const countCards = (card: CardInterface): number => {
        let cardCount = 0

        selectedCards.forEach((item) => {
            if (item.id === card.id) {
                cardCount++
            }
        })

        return cardCount
    }

    const isMaximumCardsPresent = (card: CardInterface, max: number = 2): boolean => {
        return countCards(card) === max
    }

    const isNoCardsPresent = (card: CardInterface): boolean => {
        return countCards(card) === 0
    }

    const handleOnCardAdded = async (card: CardInterface) => {
        if (selectedCards.length === 20) {
            return
        }

        if (isMaximumCardsPresent(card)) {
            return
        }

        addCardToSelected(card, selectedCards)
        await tick()
        sortCards(sortOrder, selectedCards)
        updateUrlCardState(selectedCardIds)
    }

    const handleOnCardRemoved = async (card: CardInterface) => {
        const index = selectedCards.findIndex(selected => selected.id === card.id)

        if (index > -1) {
            selectedCards.splice(index, 1)
            await tick()
            sortCards(sortOrder, selectedCards)
            updateUrlCardState(selectedCardIds)
        }
    }

</script>

<div class="grid grid-cols-2 gap-4">
    <div class="grid grid-cols-1 grid-rows-1 h-fit sticky top-8">
        <div class="grid grid-flow-row grid-cols-10 gap-2 col-start-1 row-start-1 -z-10 h-fit pointer-events-none">
            {#each Array.from({ length: 20 }) as _}
                <div class="aspect-[63/88] rounded flex items-center justify-center border bg-muted text-muted-foreground">
                    +
                </div>
            {/each}
        </div>
        <div class="grid grid-flow-row grid-cols-10 gap-2 col-start-1 row-start-1 z-10 h-fit">
            {#each selectedCards as selectedCard (selectedCard.selectedId)}
                <div in:scale={{ start: 1.1 }} animate:flip={{ duration: 300 }}>
                    <Card card={selectedCard} onclick={() => handleOnCardRemoved(selectedCard)} />
                </div>
            {/each}
        </div>
    </div>
    <div class="space-y-4">
        <div class="flex gap-2">
            <input class="border" bind:value={searchValue} placeholder="search" />
            <Button onclick={() => {
                selectedCards = []
                updateUrlCardState(selectedCardIds)
            }}>Clear Selection</Button>
        </div>
        <div class="grid grid-flow-row grid-cols-6 gap-2 h-fit">
            {#each filteredCards as card (card.id)}
                <div class="relative h-min" animate:flip={{ duration: 300 }}>
                    <Card {card} onclick={card => handleOnCardAdded(card)} />
                    {#if !isNoCardsPresent(card)}
                        <div class="p-1 inset-0 absolute flex items-center justify-center bg-foreground/60 pointer-events-none text-background text-2xl">
                            {countCards(card)} / 2
                        </div>
                        <Button
                            class="absolute -top-[1rem] -left-[1rem] rounded-full size-8"
                            size="icon"
                            onclick={() => handleOnCardRemoved(card)}
                            disabled={isNoCardsPresent(card)}
                        >
                            -
                        </Button>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>
