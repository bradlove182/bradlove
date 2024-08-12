<script lang="ts">
    import { Button } from "@repo/ui"
    import { Canvas } from "@threlte/core"
    import { Blob } from "$lib/components/blob"
</script>

<div class="rounded-2xl h-[calc(75vh-62px)] w-full -mt-8 flex items-center justify-center border border-border bg-card">
    <div class="grid gap-4 max-w-2xl">
        <h1 class="text-4xl font-bold">
            Ship your Svelte (Kit) project in weeks, not years.
        </h1>
        <p>Tired of long dev contracts and rigid timelines? At Okupter, our sprint-based model brings flexibility to robust Svelte and SvelteKit projects.</p>
        <p>Work in focused 2-week cycles to build, test, and launch apps , while tapping into our founder's 5+ years of expertise. Adapt, iterate, and scale up or down as needs change.</p>
        <div class="flex gap-4">
            <Button>Start your first sprint</Button>
            <Button variant="outline">Book a call</Button>
        </div>
    </div>
    <div class="w-1/2 h-full">
        <Canvas>
            <Blob />
        </Canvas>
    </div>
</div>
