<script lang="ts">
    import { Card } from "$lib/components/card"
    import { type PageData } from "./$types"

    const { data }: { data: PageData } = $props()

</script>

<div class="grid grid-cols-10">
    {#each data.cards as card}
        <Card {card} />
    {/each}
</div>
