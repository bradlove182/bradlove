<script lang="ts">
    import { Navigation } from "$lib/components/navigation"
    import { ModeWatcher as ThemeWatcher } from "mode-watcher"
    import "../app.css"

    const { children } = $props()
</script>

<ThemeWatcher />
<Navigation />
<main class="grid space-y-16">
    {@render children?.()}
</main>
