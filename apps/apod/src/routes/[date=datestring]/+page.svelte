<script lang="ts">
    import { page } from "$app/state"
    import { ImageDisplay } from "$lib/components/image-display"
    import { createDateString } from "$lib/data/image"
    import { useImage } from "$lib/hooks/data"

    const image = useImage()

    const { params } = $derived(page)

    const date = $derived(createDateString(params.date ? new Date(params.date) : new Date()))
</script>

<ImageDisplay {date} onLoad={img => image.set(img)} />
