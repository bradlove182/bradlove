<script lang="ts">
    import type { PageData } from "./$types"
    import { goto } from "$app/navigation"
    import { Card } from "$lib/components/card"
    import { AnimatePresence, Button, cn } from "@repo/ui"

    const { data }: { data: PageData } = $props()

    const getCardTransform = (index: number) => {
        switch (index) {
            case 0:
                return "rotate(-10deg) translate(12%, 8%)"
            case 2:
                return "rotate(10deg) translate(-12%, 8%)"
            default:
                return "0deg"
        }
    }

</script>

<div class="flex flex-col items-center w-full justify-between h-dvh p-8 pb-0">
    <h1 class="text-3xl text-center">Pocket Deck</h1>
    <Button size="lg" class="w-fit" onclick={() => goto("/build")}>
        Build Deck
    </Button>
    <div class="grid grid-cols-3 w-1/2 h-1/3 overflow-hidden">
        {#each data.randomCards as card, index}
            <AnimatePresence
                class={cn("relative", index === 1 ? "z-10" : "z-0")}
                animations="animate-slide-up" delay={`${index}s`}
            >
                <Card
                    style={`transform: ${getCardTransform(index)}`}
                    {card}
                />
            </AnimatePresence>
        {/each}
    </div>
</div>
