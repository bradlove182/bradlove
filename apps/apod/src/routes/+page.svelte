<script lang="ts">
    import ImageDisplay from "$lib/components/image-display/ImageDisplay.svelte"
    import { createDateString } from "$lib/data/image"
</script>

<ImageDisplay date={createDateString(new Date())} />
