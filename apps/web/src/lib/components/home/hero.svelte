<script lang="ts">
    import { M } from "@bradlove/motion"
    import { Badge } from "@bradlove/ui/base/badge/index.ts"
    import { Button } from "@bradlove/ui/base/button/index.ts"

    import Mandala from "../mandala.svelte"

    const currentYear = new Date(Date.now()).getUTCFullYear()

    let mark = $state<HTMLElement | null>(null)
</script>

<section
    class="bg-background text-foreground relative isolate flex min-h-[calc(100svh-var(--header-height))] flex-col overflow-hidden"
>
    <Mandala center={mark} class="pointer-events-none absolute inset-0 -z-20 size-full" />
    <div class="mx-auto flex w-full flex-1 flex-col justify-center gap-24 px-8 pt-24 pb-8">
        <div
            bind:this={mark}
            class="border-border animate-in fade-in fill-mode-both bg-background/10 absolute left-1/2 -z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center self-center rounded-full border text-sm font-medium backdrop-blur-xs duration-500"
            style:top="calc(50% - var(--header-height) / 2)"
        ></div>
        <div
            class="text-muted-foreground grid grid-cols-[1fr_auto_1fr] gap-4 font-mono text-xs tracking-wider uppercase"
        >
            <M.span
                animation="rise"
                delay={200}
                duration={800}
                class="col-start-1 justify-self-start"
            >
                (Portfolio / ©{currentYear})
            </M.span>
            <M.span animation="rise" delay={400} duration={800} class="col-start-2 hidden sm:block">
                Frontend / AI Engineer
            </M.span>
            <M.span
                animation="rise"
                delay={600}
                duration={800}
                class="col-start-3 justify-self-end"
            >
                Cape Town, ZA
            </M.span>
        </div>
        <h1
            class="font-heading flex flex-col text-[clamp(1rem,10vw,14rem)] leading-none font-bold tracking-tight text-balance uppercase"
        >
            <M.span letters="bloom">Bradley</M.span>
            <M.span letters="bloom" delay={600} class="text-right">Love</M.span>
        </h1>
        <div class="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
            <div class="col-start-1 flex flex-col items-start gap-4">
                <M.p
                    animation="rise"
                    delay={400}
                    duration={800}
                    class="text-muted-foreground max-w-96 text-xl"
                >
                    I design and build websites and web apps that load fast, look sharp and keep up
                    as your business grows.
                </M.p>
                <M.div animation="rise" delay={600} duration={800}>
                    <Badge variant="outline" class="gap-2 font-mono tracking-wider uppercase">
                        <span class="bg-accent size-1.5 rounded-full"></span>
                        Available for work
                    </Badge>
                </M.div>
            </div>
            <Button
                size="lg"
                variant="outline"
                class="hover:border-accent hover:text-accent col-start-1 w-fit tracking-wider uppercase md:col-start-2 md:justify-self-end"
                href="/work"
            >
                See the Work
            </Button>
        </div>
    </div>
</section>
