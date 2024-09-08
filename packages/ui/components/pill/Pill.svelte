<script lang="ts">
    import { cn } from "../../utils"
    import { type Props } from "."

    type $$Props = Props

    export let tag: $$Props["tag"] = "span"
    let className: $$Props["class"] = undefined
    export { className as class }
</script>

<svelte:element
    this={tag}
    class={cn(
        "rounded-full px-3 py-1 text-sm bg-card inline-flex border shadow-sm w-fit items-center gap-1",
        className,
    )}
    {...$$restProps}
>
    <slot />
</svelte:element>
