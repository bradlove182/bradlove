<script lang="ts" module>
    import type { DateString } from "$lib/data/image"
    import { ErrorBoundary, ErrorDisplay } from "$lib/components/error"
    import { Image } from "$lib/components/image"
    import { Placeholder } from "$lib/components/placeholder"
    import { getImageWithFallback } from "$lib/data/image/methods.remote"
    import ImageInfo from "./ImageInfo.svelte"

    export interface Props {
        date: DateString
    }
</script>

<script lang="ts">
    const { date }: Props = $props()
</script>

<ErrorBoundary>
    {#await getImageWithFallback({ date })}
        <Placeholder class="size-full" />
    {:then { data, error }}
        {#if error}
            <ErrorDisplay
                error={error}
                reset={() => getImageWithFallback({ date }).refresh()}
            />
        {:else if data}
            <div class="relative size-full">
                <div
                    class="
                        pointer-events-none absolute inset-0 -z-10 bg-background/50 bg-cover bg-center bg-no-repeat
                        blur-md
                    "
                    style="background-image: url({data.url})"
                ></div>
                <Image image={data} />
                <ImageInfo image={data} />
            </div>
        {:else}
            <p>No image found for {date}.</p>
        {/if}
    {/await}
</ErrorBoundary>
