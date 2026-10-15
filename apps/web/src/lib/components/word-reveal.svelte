<script lang="ts" module>
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&" as const

    const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)] ?? ""
</script>

<script lang="ts">
    interface Props {
        word: string
        /** `scramble` cycles random characters before settling; `slide` slides each letter up into place. */
        variant?: "scramble" | "slide"
        /** Delay before the first letter starts, in ms. */
        delay?: number
        /** Gap between each letter starting, in ms. */
        stagger?: number
        /** How long each letter takes to reveal, in ms. */
        duration?: number
        /** How often a scrambling letter swaps character, in ms. Only used by `scramble`. */
        interval?: number
        class?: string
    }

    const {
        word,
        variant = "scramble",
        delay = 0,
        stagger = 60,
        duration = 600,
        interval = 40,
        class: className,
    }: Props = $props()

    const letters = $derived(word.split(""))
    const total = $derived(delay + (letters.length - 1) * stagger + duration)

    /** Milliseconds since the reveal started, stepped once per `interval`. */
    let elapsed = $state(Number.NEGATIVE_INFINITY)

    /** `null` means the letter hasn't started revealing yet. */
    const shown = $derived(
        letters.map((letter, index) => {
            if (letter.trim() === "") return letter

            const begin = delay + index * stagger
            if (elapsed < begin) return null
            if (elapsed < begin + duration) return randomCharacter()
            return letter
        }),
    )

    $effect(() => {
        const end = total
        const step = interval
        if (variant !== "scramble" || letters.length === 0) return

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            elapsed = Number.POSITIVE_INFINITY
            return
        }

        elapsed = Number.NEGATIVE_INFINITY

        let frame = 0
        let start: number | null = null

        const tick = (now: number) => {
            start ??= now
            const stepped = Math.floor((now - start) / step) * step

            if (stepped !== elapsed) elapsed = stepped
            if (stepped < end) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(frame)
    })
</script>

<span class={className}>
    <span class="sr-only">{word}</span>
    {#if variant === "slide"}
        <span aria-hidden="true"
            >{#each letters as letter, index (index)}{#if letter.trim() === ""}{letter}{:else}<span
                        class="-mb-[0.15em] inline-block overflow-x-visible overflow-y-clip pb-[0.15em] align-bottom"
                        ><span
                            class="slide inline-block"
                            style:animation-delay="{delay + index * stagger}ms"
                            style:animation-duration="{duration}ms">{letter}</span
                        ></span
                    >{/if}{/each}</span
        >
    {:else}
    <span aria-hidden="true"
        >{#each letters as letter, index (index)}{@const current =
                shown[index]}{#if letter.trim() === ""}{letter}{:else}<span class="inline-grid"
                    ><span class="invisible col-start-1 row-start-1">{letter}</span><span
                        class={[
                            "col-start-1 row-start-1",
                            current !== letter && "text-muted-foreground",
                        ]}>{current ?? ""}</span
                    ></span
                >{/if}{/each}</span
    >
    {/if}
</span>

<style>
    .slide {
        animation-name: slide-up;
        animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        animation-fill-mode: both;
    }

    @keyframes slide-up {
        from {
            transform: translateY(110%);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .slide {
            animation: none;
        }
    }
</style>
