<script lang="ts">
    import { type Props } from "."
    import { Card } from "../card"

    const { cards }: Props = $props()
</script>

<div class="grid grid-flow-row grid-cols-10 gap-4">
    {#each cards as card}
        <Card {card} />
    {/each}
</div>
