<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements"
    import type { HeadingLevel } from "./index"
    import { cn } from "../../utils"

    const {
        class: className = undefined,
        tag = "h3",
        children,
        ...rest
    }: HTMLAttributes<HTMLHeadingElement> & {
        tag?: HeadingLevel
    } = $props()

</script>

<svelte:element
    this={tag}
    class={cn("font-semibold leading-none tracking-tight", className)}
    {...rest}
>
    {@render children?.()}
</svelte:element>
