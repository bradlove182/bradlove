<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements"
    import { cn } from "../../utils"

    const {
        class: className = undefined,
        children,
        ...rest
    }: HTMLAttributes<HTMLDivElement> = $props()

</script>

<div
    class={cn("relative rounded-xl border bg-card text-card-foreground shadow", className)}
    {...rest}
>
    {@render children?.()}
</div>
