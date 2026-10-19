<script lang="ts">
    import { M } from "@bradlove/motion"

    interface Props {
        title: string
        /** Shown in brackets above the title, e.g. `01`. */
        index: string
        description: string
    }

    const { title, index, description }: Props = $props()
</script>

<section
    class="flex min-h-[calc(100svh-var(--header-height))] flex-col justify-start gap-8 px-8 pt-24 pb-8"
>
    <p
        class="animate-in fade-in slide-in-from-bottom-8 fill-mode-both text-muted-foreground text-xs tracking-wider uppercase duration-800"
    >
        ({index})
    </p>
    <M.h1
        letters="focus"
        class="text-[clamp(1rem,10vw,14rem)] leading-none font-bold tracking-tighter uppercase"
    >
        {title}
    </M.h1>
    <p
        class="animate-in fade-in slide-in-from-bottom-8 fill-mode-both text-muted-foreground max-w-96 text-xs tracking-wider uppercase delay-300 duration-800"
    >
        {description}
    </p>
</section>
