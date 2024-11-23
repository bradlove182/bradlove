<script lang="ts">
    import "../app.css"
    import { ModeWatcher as ThemeWatcher } from "mode-watcher"
    import { Navigation } from "$lib/components/navigation"
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<ThemeWatcher />
<Navigation />
<main class="grid space-y-16">
    {@render children?.()}
</main>
