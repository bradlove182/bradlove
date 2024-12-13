<script lang="ts">
    import type { Props } from "."

    const {
        card,
        onclick,
    }: Props = $props()

</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
    class="h-min"
    onclick={() => onclick?.(card)}
    onkeypress={() => onclick?.(card)}
>
    <div class="aspect-[63/88] active:scale-[0.95] transition-transform pointer-events-none">
        <img class="size-full" src={card.imageUrl} alt={card.name} loading="lazy" />
    </div>
</article>
