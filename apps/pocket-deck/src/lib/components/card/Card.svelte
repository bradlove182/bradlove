<script lang="ts">
    import type { Props } from "."
    import { cn } from "@repo/ui"

    const {
        card,
        onclick,
        class: className = undefined,
        ...rest
    }: Props = $props()

</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
    class={cn("h-min transition-transform active:scale-[0.95]", className)}
    onclick={() => onclick?.(card)}
    onkeypress={() => onclick?.(card)}
    {...rest}
>
    <div class="aspect-[63/88] pointer-events-none">
        <img class="size-full" src={card.imageUrl} alt={card.name} loading="lazy" />
    </div>
</article>
