<script lang="ts" module>
    import type { APODImage } from "$lib/data/image"
    import { ErrorDisplay } from "../error"

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
        img.src = image.url

        img.onload = () => {
            if (ref) {
                ref.src = img.src
                ref.classList.remove("hidden")
            }
            status = "success"
        }

        img.onerror = () => {
            status = "error"
            ref?.classList.add("hidden")
        }
    }

    $effect(() => {
        loadImage(image)
    })

</script>

<div class="size-full">
    {#if status === "loading"}
        <p>Loading image...</p>
    {/if}
    {#if status === "error"}
        <ErrorDisplay error="Error loading image" />
    {/if}
    <div class="flex h-full w-auto items-center justify-center">
        <img
            bind:this={ref}
            class="hidden h-full w-auto object-contain"
            alt={image.title}
            loading="lazy"
        />
    </div>
</div>
