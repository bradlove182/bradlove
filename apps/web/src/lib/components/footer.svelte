<script lang="ts">
    import { M } from "@bradlove/motion"
    import { RiArrowUpLine } from "@bradlove/ui/icons/index.js"
</script>

<footer class="mt-10 flex flex-col border-t px-8 pt-32 pb-8">
    <M.p
        animation="rise"
        duration={800}
        class="text-muted-foreground text-xs tracking-wider uppercase"
    >
        Got something in mind?
    </M.p>
    <a href="/contact" class="inline-flex w-fit items-center gap-8 text-[clamp(1rem,10vw,14rem)]">
        <M.span
            letters="focus"
            class="hover:text-muted-foreground leading-relaxed font-bold tracking-tighter uppercase transition-colors"
        >
            Let's Talk
        </M.span>
    </a>
    <div
        class="text-muted-foreground flex flex-wrap items-center justify-between gap-8 text-xs tracking-wider uppercase"
    >
        <a href="mailto:brad@bradlove.co.za" class="text-foreground">brad@bradlove.co.za</a>
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
            <RiArrowUpLine class="size-3" />
        </button>
    </div>
</footer>
