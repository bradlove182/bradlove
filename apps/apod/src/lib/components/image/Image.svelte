<script lang="ts" module>
    import type { Image } from "$lib/data/image"

    export interface ImageProps {
        image: Image
    }

</script>

<script lang="ts">
    const { image }: ImageProps = $props()

    let ref: HTMLImageElement | null = $state(null)
    let loading = $state(true)

    $inspect(image)

    const loadImage = async () => {
        const img = new Image()
        img.src = image.url ?? ""
        img.onload = () => {
            if (ref) {
                ref.src = img.src
                ref.alt = image.title
                ref.classList.remove("hidden")
            }
            loading = false
        }

        img.onerror = () => {
            ref?.classList.add("hidden")
        }
    }

    $effect(() => {
        loadImage()
    })

</script>

<div class="grid size-full place-items-center">
    {#if loading}
        <p>Loading image...</p>
    {/if}
    <img bind:this={ref} class="h-full w-auto object-contain" alt="" loading="lazy" />
</div>
