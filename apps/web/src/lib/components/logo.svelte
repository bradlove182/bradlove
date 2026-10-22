<script lang="ts">
    interface Props {
        class?: string
    }

    let { class: className }: Props = $props()
</script>

<!-- Units are thousandths of an em; the squares echo the b's tail at x 17–170, y 0–150. -->
<svg viewBox="-70 -710 706 800" fill="currentColor" aria-hidden="true" class={className}>
    <rect x="-63" y="-70" width="153" height="150" class="fill-accent opacity-50" />
    <rect x="-23" y="-110" width="153" height="150" class="fill-accent" />
    <text font-size="1000" font-weight="800" style:font-family="var(--font-heading)">b</text>
</svg>
