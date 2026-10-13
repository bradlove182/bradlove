<script lang="ts">
    import { Button } from "@bradlove/ui/components/base/button/index.ts"

    import Mandala from "./mandala.svelte"

    let mark = $state<HTMLElement | null>(null)
</script>

<section class="bg-background text-foreground relative isolate overflow-hidden">
    <Mandala center={mark} class="pointer-events-none absolute inset-0 -z-10 size-full" />

    <div class="mx-auto flex min-h-svh max-w-6xl flex-col justify-center gap-6 px-8 py-24">
        <div
            bind:this={mark}
            class="border-border bg-background/10 grid size-14 place-items-center self-center rounded-full border text-sm font-medium backdrop-blur-xs"
        ></div>

        <h1
            class="max-w-2xl text-5xl leading-tight font-bold tracking-tight text-balance uppercase"
        >
            Creative Developer
        </h1>

        <p class="text-muted-foreground max-w-xl text-lg">
            I specialise in a perfect blend of user interfaces and modern development.
        </p>

        <div class="flex flex-wrap gap-3">
            <Button size="lg">Get in touch</Button>
            <Button size="lg" variant="outline">See my work</Button>
        </div>
    </div>
</section>
