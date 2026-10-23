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
    <M.p
        animation="rise"
        class="text-accent font-mono text-xs tracking-wider uppercase"
    >
        ({index})
    </M.p>
    <M.h1
        animation="focus"
        class="font-heading text-[clamp(1rem,10vw,14rem)] leading-none font-bold tracking-tighter uppercase"
    >
        {title}
    </M.h1>
    <M.p
        animation="rise"
        delay={300}
        class="text-muted-foreground max-w-96 font-mono text-xs tracking-wider uppercase"
    >
        {description}
    </M.p>
</section>
