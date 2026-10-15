<script lang="ts">
    import { RiAsterisk } from "@bradlove/ui/icons/index.js"
    import { cn } from "@bradlove/ui/utils.ts"

    interface Props {
        items: string[]
        /** Seconds for one full loop. */
        duration?: number
        /** Scroll left to right instead of right to left. */
        reverse?: boolean
        pauseOnHover?: boolean
        class?: string
    }

    const {
        items,
        duration = 30,
        reverse = false,
        pauseOnHover = true,
        class: className,
    }: Props = $props()
</script>

<div
    class={cn([
        "flex overflow-hidden border-y py-4 text-4xl tracking-wider uppercase italic",
        pauseOnHover && "pausable",
        className,
    ])}
>
    <ul class="sr-only">
        {#each items as item, index (index)}
            <li>{item}</li>
        {/each}
    </ul>
    {#each [0, 1] as copy (copy)}
        <div
            aria-hidden="true"
            class={[
                "track flex min-w-full shrink-0 items-center justify-around gap-8 pr-8",
                reverse && "reverse",
            ]}
            style:animation-duration="{duration}s"
        >
            {#each items as item, index (index)}
                <span class="whitespace-nowrap">{item}</span>
                <RiAsterisk class="text-muted-foreground size-8" />
            {/each}
        </div>
    {/each}
</div>

<style>
    .track {
        animation: marquee linear infinite;
    }

    .reverse {
        animation-direction: reverse;
    }

    .pausable:hover .track {
        animation-play-state: paused;
    }

    @keyframes marquee {
        to {
            transform: translateX(-100%);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .track {
            animation-play-state: paused;
        }
    }
</style>
