<script lang="ts" module>
    import type { APODImage } from "$lib/data/image"
    import { buttonVariants, cn, Popover } from "@repo/ui"

    export interface Props {
        image: APODImage
    }
</script>

<script lang="ts">
    const { image }: Props = $props()
</script>

<article class="pointer-events-none fixed right-0 bottom-0 flex w-full place-content-end p-2">
    <Popover.Root>
        <Popover.Trigger class={cn(buttonVariants({ variant: "secondary", size: "icon" }), "pointer-events-auto")}>
            Info
        </Popover.Trigger>
        <Popover.Content class="w-96 space-y-2" align="end">
            <h1 class="font-bold">{image.title}</h1>
            <p class="text-sm text-muted-foreground">{image.explanation}</p>
            {#if image.copyright}
                <p class="text-right text-xs text-muted-foreground">{`© ${image.copyright}`}</p>
            {/if}
        </Popover.Content>
    </Popover.Root>
</article>
