<script lang="ts">
    import { Button } from "@bradlove/ui/base/button/index.ts"

    import Mandala from "./mandala.svelte"
    import WordReveal from "./word-reveal.svelte"

    let mark = $state<HTMLElement | null>(null)

    const currentYear = new Date(Date.now()).getUTCFullYear()
</script>

<section
    class="bg-background text-foreground relative isolate flex min-h-[calc(100svh-var(--header-height))] flex-col overflow-hidden"
>
    <Mandala center={mark} class="pointer-events-none absolute inset-0 -z-20 size-full" />
    <div class="mx-auto flex w-full flex-1 flex-col justify-center gap-24 px-8 pt-24 pb-8">
        <div
            bind:this={mark}
            class="border-border bg-background/10 absolute top-1/2 left-1/2 -z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center self-center rounded-full border text-sm font-medium backdrop-blur-xs"
        ></div>
        <div
            class="text-muted-foreground grid grid-cols-[1fr_auto_1fr] gap-4 text-xs tracking-wider uppercase"
        >
            <span
                class="animate-in fade-in slide-in-from-bottom-8 fill-mode-both col-start-1 justify-self-start delay-200 duration-800"
            >
                (Portfolio / ©{currentYear})
            </span>
            <span
                class="animate-in fade-in slide-in-from-bottom-8 fill-mode-both col-start-2 hidden delay-400 duration-800 sm:block"
            >
                Creative Developer
            </span>
            <span
                class="animate-in fade-in slide-in-from-bottom-8 fill-mode-both col-start-3 justify-self-end delay-600 duration-800"
            >
                Cape Town, South Africa
            </span>
        </div>
        <h1
            class="flex flex-col text-[clamp(1rem,10vw,14rem)] leading-none font-bold tracking-tighter text-balance uppercase"
        >
            <WordReveal variant="bloom" word="Bradley" />
            <WordReveal delay={600} variant="bloom" class="text-right" word="Love" />
        </h1>
        <div class="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
            <p
                class="animate-in fade-in slide-in-from-bottom-8 fill-mode-both text-muted-foreground col-start-1 max-w-96 text-xs font-normal tracking-wider uppercase delay-400 duration-800"
            >
                I design and build websites and SaaS apps that convert, simplify and scale.
            </p>
            <Button
                size="lg"
                variant="outline"
                class="col-start-1 w-fit tracking-wider uppercase md:col-start-2 md:justify-self-end"
                href="/work">See the Work</Button
            >
        </div>
    </div>
</section>
