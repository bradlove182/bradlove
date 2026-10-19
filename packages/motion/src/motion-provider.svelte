<script lang="ts">
    import type { Snippet } from "svelte"

    import { createMotion } from "./context.svelte.ts"

    type Props = {
        options?: IntersectionObserverInit
        children: Snippet
    }

    const { options, children }: Props = $props()

    // svelte-ignore state_referenced_locally
    createMotion(options)
</script>

{@render children()}
