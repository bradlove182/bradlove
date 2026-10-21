<script lang="ts">
    import { RiAsterisk } from "@bradlove/ui/icons/index.js"
    import { cn } from "@bradlove/ui/utils.ts"

    interface Props {
        items: string[]
        class?: string
    }

    const { items, class: className }: Props = $props()
</script>

<div
    class={cn([
        "font-heading flex overflow-hidden border-y py-4 text-4xl tracking-wider uppercase italic",
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
            class="track flex min-w-full shrink-0 items-center justify-around gap-8 pr-8"
        >
            {#each items as item, index (index)}
                <span class="whitespace-nowrap">{item}</span>
                <RiAsterisk class="text-accent size-8" />
            {/each}
        </div>
    {/each}
</div>

<style>
    .track {
        animation: marquee 60s linear infinite;
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
