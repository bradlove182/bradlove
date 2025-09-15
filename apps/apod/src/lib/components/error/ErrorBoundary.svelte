<script lang="ts" module>
    import type { Snippet } from "svelte"
    import { ErrorDisplay } from "."

    export interface Props {
        children: Snippet<[]>
    }
</script>

<script lang="ts">
    const { children }: Props = $props()
</script>

<svelte:boundary>
    {#snippet failed(error)}
        <ErrorDisplay error={error} />
    {/snippet}
    {@render children?.()}
</svelte:boundary>
