<script lang="ts" module>
    import type { APODImage } from "$lib/data/image"

    export interface Props {
        image: APODImage
    }
</script>

<script lang="ts">
    const { image }: Props = $props()
</script>

<article class="pointer-events-none fixed right-0 bottom-0 flex w-full place-content-end p-2">
    <div class="pointer-events-auto max-w-1/3 space-y-2 rounded-md border border-border bg-background p-4 shadow-2xl">
        <h1 class="font-bold">{image.title}</h1>
        <p class="text-sm text-muted-foreground">{image.explanation}</p>
        {#if image.copyright}
            <p class="text-right text-xs text-muted-foreground">{`© ${image.copyright}`}</p>
        {/if}
    </div>
</article>
