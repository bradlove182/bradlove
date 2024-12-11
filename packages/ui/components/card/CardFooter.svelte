<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements"
    import { cn } from "../../utils"

    const {
        class: className = undefined,
        children,
        ...rest
    }: HTMLAttributes<HTMLDivElement> = $props()

</script>

<div class={cn("flex items-center p-6 pt-0", className)} {...rest}>
    {@render children?.()}
</div>
