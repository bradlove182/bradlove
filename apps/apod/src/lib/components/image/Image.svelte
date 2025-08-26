<script lang="ts" module>
    import { createDateString } from "$lib/data/image/index"
    import { getImageWithFallback } from "$lib/data/image/methods.remote"

    export interface ImageProps {
        date: Date
    }

</script>

<script lang="ts">
    const { date }: ImageProps = $props()

    let ref: HTMLImageElement | null = $state(null)

</script>

<div class="grid size-full place-items-center">
    {#await getImageWithFallback({ date: createDateString(date) })}
        <p>Loading...</p>
    {:then { data: image, error }}
        {#if error}
            <p>Error: {error.message}</p>
        {:else}
            <img
                bind:this={ref}
                src={image?.url}
                class="h-full w-auto object-contain"
                alt={image?.title}
                loading="lazy"
            />
        {/if}
    {/await}
</div>
