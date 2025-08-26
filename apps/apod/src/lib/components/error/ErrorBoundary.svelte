<script lang="ts" module>
    import type { Snippet } from "svelte"
    import { ErrorDisplay } from "."

    export interface ErrorBoundaryProps {
        children: Snippet<[]>
    }
</script>

<script lang="ts">
    const { children }: ErrorBoundaryProps = $props()
</script>

<svelte:boundary>
    {#snippet failed(error)}
        <ErrorDisplay error={error} />
    {/snippet}
    {@render children?.()}
</svelte:boundary>
