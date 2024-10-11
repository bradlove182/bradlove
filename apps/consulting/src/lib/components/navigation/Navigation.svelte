<script lang="ts">
    import {
        Box,
        Button,
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
        cn,
    } from "@repo/ui"
    import { ModeSwitcher } from "$lib/components/mode-switcher"

    let scrollY = 0
</script>

<svelte:window bind:scrollY />

<header class={cn(
    "sticky left-0 top-0 z-50 flex h-fit w-full items-center justify-between border-border bg-background",
)}>
    <Box>
        <div class="flex items-center container py-2">
            <div class="w-full flex items-center justify-start">
                <a href="/" class="font-bold text-xl tracking-wide">DRVN</a>
            </div>
            <div class="w-full flex items-center justify-center">
                <nav>
                    <ul class="flex gap-1">
                        <li>
                            <Button variant="ghost">About</Button>
                        </li>
                        <li>
                            <Button variant="ghost">Pricing</Button>
                        </li>
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild let:builder>
                                    <Button builders={[builder]} variant="ghost">Services</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Consulting</DropdownMenuItem>
                                    <DropdownMenuItem>Design</DropdownMenuItem>
                                    <DropdownMenuItem>Development</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>
                            <Button variant="ghost">Contact</Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="w-full flex items-center justify-end gap-2">
                <ModeSwitcher />
                <Button>Book a sprint</Button>
            </div>
        </div>
    </Box>
</header>
