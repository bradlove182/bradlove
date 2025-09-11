<script lang="ts" module>
    import type { APODImage } from "$lib/data/image"

    export interface ImageProps {
        image: APODImage
    }

</script>

<script lang="ts">
    const { image }: ImageProps = $props()

    let ref: HTMLImageElement | null = $state(null)
    let loading = $state(true)

    const loadImage = async (image: APODImage) => {
        const img = new Image()
        img.src = image.url

        img.onload = () => {
            if (ref) {
                ref.src = img.src
                ref.classList.remove("hidden")
            }
            loading = false
        }

        img.onerror = () => {
            ref?.classList.add("hidden")
        }
    }

    $effect(() => {
        loadImage(image)
    })

</script>

<div class="size-full">
    {#if loading}
        <p>Loading image...</p>
    {/if}
    <div class="flex size-full items-center justify-center">
        <img
            bind:this={ref}
            class="hidden size-full object-contain"
            alt={image.title}
            loading="lazy"
        />
    </div>
</div>
