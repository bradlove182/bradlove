<script lang="ts" module>
    import type { APODImage } from "$lib/data/image"
    import { ErrorDisplay } from "$lib/components/error"

    export interface Props {
        image: APODImage
    }

</script>

<script lang="ts">
    const { image }: Props = $props()

    let ref: HTMLImageElement | null = $state(null)
    let status = $state<("loading" | "error" | "success")>("loading")

    const loadImage = async (image: APODImage) => {
        const img = new Image()

        if (!image.url) {
            status = "error"
            return
        }

        img.src = image.url

        img.onload = () => {
            if (ref) {
                ref.src = img.src
                ref.classList.remove("invisible", "opacity-0")
            }
            status = "success"
        }

        img.onerror = () => {
            status = "error"
            ref?.classList.add("invisible", "opacity-0")
        }
    }

    $effect(() => {
        loadImage(image)
    })

</script>

<div class="size-full">
    {#if status === "error"}
        <ErrorDisplay error="Error loading image" reset={() => loadImage(image)} />
    {/if}
    <div class="flex h-full w-auto items-center justify-center">
        <img
            bind:this={ref}
            class="invisible h-full w-auto object-contain opacity-0 transition-opacity duration-300"
            alt={image.title}
            loading="lazy"
        />
    </div>
</div>
