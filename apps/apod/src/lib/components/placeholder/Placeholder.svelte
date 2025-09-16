<script lang="ts">
    import type { Snippet } from "svelte"
    import type { HTMLAttributes } from "svelte/elements"
    import { cn } from "@repo/ui"

    interface Props extends HTMLAttributes<HTMLDivElement> {
        children?: Snippet<[]>
    }

    const { children, class: className, ...rest }: Props = $props()
</script>

<div class={cn("rounded-md bg-muted", className)} {...rest}>
    {@render children?.()}
</div>
