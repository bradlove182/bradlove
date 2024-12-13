<script lang="ts">
    import { DeckBuilder } from "$lib/components/deck-builder"
    import { type PageData } from "./$types"

    const { data }: { data: PageData } = $props()

</script>

<DeckBuilder cards={data.cards} initialCards={data.initialCards} />
