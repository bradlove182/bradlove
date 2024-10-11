<script lang="ts">
    import {
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
    "sticky left-0 top-0 z-50 flex h-fit w-full animate-slide-down items-center justify-between border-b border-transparent bg-background/50 py-2 backdrop-blur-md transition duration-200 ease-in-out",
    scrollY > 5 ? "border-border" : "",
)}>
    <div class="flex items-center container">
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
</header>
