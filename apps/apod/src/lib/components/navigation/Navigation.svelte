<script lang="ts">
    import { Button, IconMoon } from "@repo/ui"
</script>

<header class="@container pointer-events-none fixed bottom-0 left-0 z-50 w-full border-b border-border py-2">
    <div class="flex place-content-center">
        <nav class="
            pointer-events-auto flex items-center justify-center gap-1 rounded-md border border-border bg-background p-1
            shadow-2xl
        ">
            <Button variant="secondary" size="icon">
                <IconMoon />
            </Button>
            <Button variant="secondary" href="/">
                Today
            </Button>
            <Button variant="secondary" size="icon">
                <IconMoon />
            </Button>
        </nav>
    </div>
</header>
