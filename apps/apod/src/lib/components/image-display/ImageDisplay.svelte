<script lang="ts" module>
    import type { APODImage, DateString } from "$lib/data/image"
    import { ErrorBoundary, ErrorDisplay } from "$lib/components/error"
    import { Image } from "$lib/components/image"
    import { Placeholder } from "$lib/components/placeholder"
    import { getImageWithFallback } from "$lib/data/image/methods.remote"

    export interface Props {
        date: DateString
        onLoad?: (image: APODImage) => void
        onError?: (error: unknown) => void
    }
</script>

<script lang="ts">
    const { date, onLoad, onError }: Props = $props()

    const getImageForDisplay = async (date: DateString) => {
        const { data, error } = await getImageWithFallback({ date })
        if (error) {
            onError?.(error)
            return { data: undefined, error }
        }
        onLoad?.(data)
        return { data, error: undefined }
    }
</script>

<ErrorBoundary>
    {#await getImageForDisplay(date)}
        <Placeholder class="size-full" />
    {:then { data, error }}
        {#if error}
            <ErrorDisplay
                error={error}
                reset={() => getImageForDisplay(date)}
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
            </div>
        {:else}
            <p>No image found for {date}.</p>
        {/if}
    {/await}
</ErrorBoundary>
