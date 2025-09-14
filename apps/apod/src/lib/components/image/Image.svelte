<script lang="ts" module>
    import type { APODImage } from "$lib/data/image"

    export interface Props {
        image: APODImage
    }

</script>

<script lang="ts">
    const { image }: Props = $props()

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
    <div class="
        flex h-full
        w-auto items-center
        justify-center
    ">
        <img
            bind:this={ref}
            class="
                hidden h-full
                w-auto object-contain
            "
            alt={image.title}
            loading="lazy"
        />
    </div>
</div>
