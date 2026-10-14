<script lang="ts">
    import { Button } from "@bradlove/ui/base/button/index.ts"

    import Mandala from "./mandala.svelte"

    let mark = $state<HTMLElement | null>(null)

    const currentYear = new Date(Date.now()).getUTCFullYear()
</script>

<section class="bg-background text-foreground relative isolate overflow-hidden">
    <Mandala center={mark} class="pointer-events-none absolute inset-0 -z-10 size-full" />
    <div class="mx-auto flex h-full flex-col justify-center gap-12 px-8 pt-24 pb-8">
        <div
            bind:this={mark}
            class="border-border bg-background/10 absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center self-center rounded-full border text-sm font-medium backdrop-blur-xs"
        ></div>
        <div
            class="text-muted-foreground grid grid-cols-[1fr_auto_1fr] gap-4 text-xs tracking-wider uppercase"
        >
            <span class="col-start-1 justify-self-start">(Portfolio / ©{currentYear})</span>
            <span class="col-start-2 hidden sm:block">Creative Developer</span>
            <span class="col-start-3 justify-self-end">Cape Town, South Africa</span>
        </div>
        <h1
            class="flex flex-col text-[clamp(1rem,10vw,14rem)] leading-none font-bold tracking-tight text-balance uppercase"
        >
            <span>Bradley</span>
            <span class="text-right">Love</span>
        </h1>
        <div class="grid grid-cols-3 items-end">
            <p class="text-md text-muted-foreground col-start-1 font-normal">
                I design and build websites and apps with a lot of movement in them. Startups, small
                businesses and fellow studios, mostly.
            </p>
            <Button
                size="lg"
                variant="outline"
                class="col-start-3 w-fit justify-self-end tracking-wider uppercase"
                href="/work">See the Work</Button
            >
        </div>
    </div>
</section>
