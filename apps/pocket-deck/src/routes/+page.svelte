<script lang="ts">
    import { DeckBuilder } from "$lib/components/deck-builder"
    import { type PageData } from "./$types"

    export let data: PageData

</script>

<DeckBuilder cards={data.cards} />
