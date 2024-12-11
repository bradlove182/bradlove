<script lang="ts">
    import { type PageData } from "./$types"

    export let data: PageData

</script>

<div class="grid grid-cols-3 grid-flow-row">
    {#each data.cards as card}
        <div>
            <img loading="lazy" alt={card.name} src={card.imageUrl} height="100" width="100" />
            <h1>{card.name}</h1>
        </div>
    {/each}
</div>
