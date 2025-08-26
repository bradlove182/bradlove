<script lang="ts">
    import { Button, IconSun } from "@repo/ui"
</script>

<header class="@container border-b border-border bg-background py-2">
    <div class="flex items-center justify-between gap-2 px-4">
        <span>APOD</span>
        <nav>
            <Button href="/">
                Today
            </Button>
        </nav>
        <div class="flex items-center gap-2">
            <Button variant="secondary" size="icon" href="/">
                <IconSun />
            </Button>
        </div>
    </div>
</header>
