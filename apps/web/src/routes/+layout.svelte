<script lang="ts">
    import "./layout.css"
    import favicon from "#lib/assets/favicon.svg"
    import Navigation from "#lib/components/navigation.svelte"

    import type { LayoutProps } from "./$types"

    let { children }: LayoutProps = $props()
</script>

<svelte:head>
    <title>Bradley Love - Creative Developer</title>
    <link rel="icon" href={favicon} />
</svelte:head>

<Navigation />
{@render children()}
