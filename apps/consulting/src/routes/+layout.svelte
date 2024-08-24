<script lang="ts">
    import "../app.css"
    import { ModeWatcher as ThemeWatcher } from "mode-watcher"
    import { Navigation } from "$lib/components/navigation"
</script>

<ThemeWatcher />
<Navigation />
<main class="grid">
    <slot />
</main>
