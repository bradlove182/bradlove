<script lang="ts">
    import { M } from "@bradlove/motion"
    import { RiArrowUpLine } from "@bradlove/ui/icons/index.js"

    import Logo from "./logo.svelte"
    import Mandala from "./mandala.svelte"

    let talk = $state<HTMLElement | null>(null)
</script>

<footer class="relative isolate mt-10 flex flex-col overflow-hidden border-t px-8 pt-32 pb-8">
    <!-- Peak ring opacity is 0.256 × intensity, so 0.47 lands near the page transition's 12%. -->
    <Mandala
        center={talk}
        count={5}
        speed={0.008}
        intensity={0.47}
        class="text-foreground pointer-events-none absolute inset-0 -z-10 size-full"
    />
    <M.p
        animation="rise"
        duration={800}
        class="text-muted-foreground font-mono text-xs tracking-wider uppercase"
    >
        Got something in mind?
    </M.p>
    <a
        bind:this={talk}
        href="/contact"
        class="inline-flex w-fit items-center gap-8 text-[clamp(1rem,10vw,14rem)]"
    >
        <M.span
            letters="focus"
            class="hover:text-accent font-heading leading-relaxed font-bold tracking-tight uppercase transition-colors"
        >
            Let's Talk
        </M.span>
    </a>
    <div
        class="text-muted-foreground flex flex-wrap items-center justify-between gap-8 font-mono text-xs tracking-wider uppercase"
    >
        <a
            href="mailto:brad@bradlove.co.za"
            class="text-accent hover:text-accent inline-flex items-center gap-2 transition-colors"
        >
            <Logo class="size-3.5 shrink-0" />
            brad@bradlove.co.za
        </a>
        <div class="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/bradley-love" target="_blank" rel="nofollow">
                LinkedIn
            </a>
            <a href="https://github.com/bradlove182" target="_blank" rel="nofollow">GitHub</a>
        </div>
        <button
            class="flex cursor-pointer items-center gap-2 p-0 font-normal tracking-wider uppercase"
            onclick={() => window.scrollTo({ top: 0 })}
        >
            Back to top
            <RiArrowUpLine class="text-accent size-3" />
        </button>
    </div>
</footer>
