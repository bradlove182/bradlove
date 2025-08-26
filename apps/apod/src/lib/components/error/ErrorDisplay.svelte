<script lang="ts" module>
    export interface ErrorDisplayProps {
        error: unknown
    }

</script>

<script lang="ts">
    import { isErrorDetails } from "$lib/data"

    const { error }: ErrorDisplayProps = $props()

    const stack = $derived.by(() => {
        if (error instanceof Error) {
            return error.stack
        }
    })

    const message = $derived.by(() => {
        if (isErrorDetails(error) || error instanceof Error) {
            return error.message
        }

        return "Unknown error"
    })

    const details = $derived.by(() => {
        if (isErrorDetails(error)) {
            return error.details
        }
    })
</script>

<div class="grid size-full place-items-center p-4">
    <div class="
        grid size-full place-items-center rounded border border-destructive
        bg-destructive/10 p-4 shadow
    ">
        <div class="grid grid-cols-1 gap-2">
            <p class="text-sm font-semibold text-destructive">Error: {message}</p>
            {#if stack}
                <pre class="text-xs text-destructive/70">{stack}</pre>
            {/if}
            {#if details}
                <pre class="text-xs text-destructive/70">{JSON.stringify(details, null, 2)}</pre>
            {/if}
        </div>
    </div>
</div>
