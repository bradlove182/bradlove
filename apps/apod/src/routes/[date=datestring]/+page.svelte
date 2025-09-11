<script lang="ts">
    import { page } from "$app/state"
    import ImageDisplay from "$lib/components/image-display/ImageDisplay.svelte"
    import { createDateString } from "$lib/data/image"

    const { params } = $derived(page)

    const date = $derived(createDateString(params.date ? new Date(params.date) : new Date()))
</script>

<ImageDisplay {date} />
