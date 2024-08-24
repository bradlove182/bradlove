<script lang="ts">
    import { IconMoon, IconSun } from "@repo/ui/icons"
    import { Button } from "@repo/ui"
    import { mode, toggleMode } from "mode-watcher"
    import { type FlyParams, fly } from "svelte/transition"

    const flyAnimation = (mode: "dark" | "light" | undefined): FlyParams => {
        switch (mode) {
            case "light":
                return {
                    y: 16,
                }

            case "dark":
                return {
                    y: -16,
                }

            default:
                return {}
        }
    }
</script>

<Button variant="ghost" size="icon" on:click={() => toggleMode()} class="overflow-hidden">
    {#key $mode}
        <span in:fly={flyAnimation($mode)} out:fly={{ duration: 0 }} class="absolute">
            {#if $mode === "dark"}
                <IconMoon />
            {:else}
                <IconSun />
            {/if}
        </span>
    {/key}
</Button>
