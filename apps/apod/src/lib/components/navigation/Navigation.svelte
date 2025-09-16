<script lang="ts">
    import { useImage } from "$lib/hooks/data"
    import { Button, buttonVariants, cn, IconMoon, Popover } from "@repo/ui"

    const image = useImage()

    const currentImage = $derived(image.get())
</script>

<header class="@container pointer-events-none fixed bottom-0 left-0 z-50 w-full border-b border-border py-2">
    <div class="flex place-content-center">
        <nav class="
            pointer-events-auto flex items-center justify-center gap-1 rounded-md border border-border bg-background p-1
            shadow-2xl
        ">
            <Button variant="secondary" size="icon">
                <IconMoon />
            </Button>
            <Button variant="secondary" href="/">
                Today
            </Button>
            <Button variant="secondary" size="icon">
                <IconMoon />
            </Button>
            <Popover.Root>
                <Popover.Trigger class={cn(buttonVariants({ variant: "secondary", size: "icon" }), "pointer-events-auto")}>
                    Info
                </Popover.Trigger>
                <Popover.Content class="w-96 space-y-2" sideOffset={8}>
                    <h1 class="font-bold">{currentImage?.title}</h1>
                    <p class="text-sm text-muted-foreground">{currentImage?.explanation}</p>
                    {#if currentImage?.copyright}
                        <p class="text-right text-xs text-muted-foreground">{`© ${currentImage.copyright}`}</p>
                    {/if}
                </Popover.Content>
            </Popover.Root>
        </nav>
    </div>
</header>
