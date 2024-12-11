<script lang="ts">
    import type { Props } from "."

    const {
        card,
    }: Props = $props()

</script>

<article class="space-y-4 bg-muted">
    <div class="aspect-[63/88]">
        <img class="size-full" src={card.imageUrl} alt={card.name} loading="lazy" />
    </div>
    <h3>{card.name}</h3>
</article>
