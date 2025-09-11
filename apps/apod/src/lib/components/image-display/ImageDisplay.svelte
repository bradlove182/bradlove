<script lang="ts" module>
    import type { DateString } from "$lib/data/image"
    import { Image } from "$lib/components/image"
    import { getImageWithFallback } from "$lib/data/image/methods.remote"
    import { ErrorBoundary, ErrorDisplay } from "../error"

    export interface ImageDisplayProps {
        date: DateString
    }
</script>

<script lang="ts">
    const { date }: ImageDisplayProps = $props()
</script>

<ErrorBoundary>
    {#await getImageWithFallback({ date })}
        <p>Loading...</p>
    {:then { data, error }}
        {#if error}
            <ErrorDisplay
                error={error}
                reset={() => getImageWithFallback({ date }).refresh()}
            />
        {:else}
            <Image image={data} />
        {/if}
    {/await}
</ErrorBoundary>
