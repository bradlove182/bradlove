<script lang="ts">
    import { ErrorBoundary, ErrorDisplay } from "$lib/components/error"
    import { Image } from "$lib/components/image"
    import { createDateString } from "$lib/data/image"
    import { getImageWithFallback } from "$lib/data/image/methods.remote"
</script>

<ErrorBoundary>
    {#await getImageWithFallback({ date: createDateString(new Date()) })}
        <p>Loading...</p>
    {:then { data, error }}
        {#if error}
            <ErrorDisplay error={error} />
        {:else}
            <Image image={data} />
        {/if}
    {/await}
</ErrorBoundary>
