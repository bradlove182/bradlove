<script lang="ts">
    import { ImageDisplay } from "$lib/components/image-display"
    import { createDateString } from "$lib/data/image"
    import { useImage } from "$lib/hooks/data"

    const image = useImage()
</script>

<ImageDisplay date={createDateString(new Date())} onLoad={image.set} />
