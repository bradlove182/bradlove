<script lang="ts" module>
    import type { DateString } from "$lib/data/image"
    import { Image } from "$lib/components/image"
    import { getImageWithFallback } from "$lib/data/image/methods.remote"
    import { ErrorBoundary, ErrorDisplay } from "../error"

    export interface Props {
        date: DateString
    }
</script>

<script lang="ts">
    const { date }: Props = $props()
</script>

<ErrorBoundary>
    {#await getImageWithFallback({ date })}
        <p aria-live="polite">Loading...</p>
    {:then { data, error }}
        {#if error}
            <ErrorDisplay
                error={error}
                reset={() => getImageWithFallback({ date }).refresh()}
            />
        {:else if data}
            <Image image={data} />
        {:else}
            <p>No image found for {date}.</p>
        {/if}
    {/await}
</ErrorBoundary>
