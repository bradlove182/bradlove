<script lang="ts">
    import "../app.css"
    import { ModeWatcher as ThemeWatcher } from "mode-watcher"
    import { Navigation } from "$lib/components/navigation"
</script>

<ThemeWatcher />
<Navigation />
<main class="container grid gap-2">
    <slot />
</main>
