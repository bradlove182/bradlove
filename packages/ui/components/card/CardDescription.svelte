<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements"
    import { cn } from "../../utils"

    const {
        class: className = undefined,
        children,
        ...rest
    }: HTMLAttributes<HTMLParagraphElement> = $props()

</script>

<p class={cn("text-sm text-muted-foreground", className)} {...rest}>
    {@render children?.()}
</p>
