<script lang="ts" module>
    export interface Props {
        error: unknown
        reset?: () => void
    }

</script>

<script lang="ts">
    import { dev } from "$app/environment"

    import { isErrorDetails } from "$lib/data"
    import { Button } from "@repo/ui"

    const { error, reset }: Props = $props()

    const stack = $derived.by(() => {
        if (error instanceof Error) {
            return error.stack
        }
    })

    const message = $derived.by(() => {
        if (isErrorDetails(error) || error instanceof Error) {
            return error.message
        }

        if (typeof error === "string") {
            return error
        }

        return "Unknown error"
    })

    const details = $derived.by(() => {
        if (isErrorDetails(error)) {
            return error.details
        }
    })

    const code = $derived.by(() => {
        if (isErrorDetails(error)) {
            return error.code
        }
    })
</script>

<div class="grid size-full place-items-center p-4">
    <div role="alert" aria-live="polite" class="
        grid size-full place-items-center rounded border border-destructive bg-destructive/10 p-4 shadow
    ">
        <div class="grid grid-cols-1 gap-2">
            {#if code}
                <p class="text-sm font-semibold text-destructive">Code: {code}</p>
            {/if}
            <p class="text-sm font-semibold text-destructive">Error: {message}</p>
            {#if dev && stack}
                <pre class="max-h-64 overflow-auto text-xs break-words whitespace-pre-wrap text-destructive/70">{stack}</pre>
            {/if}
            {#if dev && details}
                <pre class="max-h-64 overflow-auto text-xs break-words whitespace-pre-wrap text-destructive/70">{JSON.stringify(details, null, 2)}</pre>
            {/if}
            {#if reset}
                <Button
                    variant="destructive"
                    onclick={reset}
                >
                    Retry
                </Button>
            {/if}
        </div>
    </div>
</div>
