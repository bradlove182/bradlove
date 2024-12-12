<script lang="ts">
    import type { CardInterface } from "$lib/types/card"
    import { Card } from "$lib/components/card"
    import { Button } from "@repo/ui"
    import { type Props } from "."

    const { cards }: Props = $props()

    const selectedCards = $state<Props["cards"]>([])

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

    const handleOnCardAdded = (card: CardInterface) => {
        if (selectedCards.length === 20) {
            return
        }

        if (isMaximumCardsPresent(card)) {
            return
        }

        selectedCards.push(card)
    }

    const handleOnCardRemoved = (card: CardInterface) => {
        const index = selectedCards.findIndex(selected => selected.id === card.id)

        if (index > -1) {
            selectedCards.splice(index, 1)
        }
    }

</script>

<div class="grid grid-cols-2 gap-4">
    <div class="grid grid-cols-1 grid-rows-1 h-fit">
        <div class="grid grid-flow-row grid-cols-6 gap-2 col-start-1 row-start-1 -z-10 h-fit pointer-events-none">
            {#each Array.from({ length: 20 }) as _}
                <div class="aspect-[63/88] rounded flex items-center justify-center border bg-muted text-muted-foreground">
                    +
                </div>
            {/each}
        </div>
        <div class="grid grid-flow-row grid-cols-6 gap-2 col-start-1 row-start-1 z-10 h-fit">
            {#each selectedCards as selectedCard}
                <Card card={selectedCard} onclick={() => handleOnCardRemoved(selectedCard)} />
            {/each}
        </div>
    </div>
    <div class="grid grid-flow-row grid-cols-6 gap-2">
        {#each cards as card}
            <div class="relative">
                <Card {card} />
                <div class="flex w-fit absolute bottom-0 right-0 bg-secondary p-1">
                    <Button
                        size="icon"
                        onclick={() => handleOnCardAdded(card)}
                        disabled={isMaximumCardsPresent(card)}
                    >
                        +
                    </Button>
                    <Button
                        size="icon"
                        onclick={() => handleOnCardRemoved(card)}
                        disabled={isNoCardsPresent(card)}
                    >
                        -
                    </Button>
                </div>
            </div>
        {/each}
    </div>
</div>
