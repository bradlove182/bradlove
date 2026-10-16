<script lang="ts">
    import { Button } from "@bradlove/ui/components/base/button/index.js"
    import { RiArrowRightLine, RiArrowUpLine } from "@bradlove/ui/icons/index.js"

    import WordReveal from "#lib/components/word-reveal.svelte"
</script>

<footer class="mt-10 flex flex-col border-t px-8 pt-32 pb-8">
    <p class="text-muted-foreground text-xs tracking-wider uppercase">Got something in mind?</p>
    <a href="/contact" class="inline-flex w-fit items-center gap-8 text-[clamp(1rem,10vw,14rem)]">
        <WordReveal
            variant="focus"
            class="hover:text-muted-foreground leading-relaxed font-bold tracking-tighter uppercase transition-colors"
            word="Let's Talk"
        />
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
