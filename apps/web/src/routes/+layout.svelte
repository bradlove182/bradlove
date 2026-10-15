<script lang="ts">
    import "./layout.css"
    import { onNavigate } from "$app/navigation"
    import favicon from "#lib/assets/favicon.svg"
    import Navigation from "#lib/components/navigation.svelte"

    import type { LayoutProps } from "./$types"

    let { children }: LayoutProps = $props()

    onNavigate((navigation) => {
        if (!document.startViewTransition || navigation.shallow) return

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve()
                await navigation.complete
            })
        })
    })
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Navigation />
{@render children()}
