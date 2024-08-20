<script lang="ts">
    import {
        Button,
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
    } from "@repo/ui"
    import { ModeSwitcher } from "$lib/components/mode-switcher"
</script>

<header class="sticky top-0 left-0 w-full h-fit flex items-center py-2 z-50 justify-between container">
    <div class="w-full flex items-center justify-start">
        <a href="/" class="font-bold text-xl tracking-wide">Driven</a>
    </div>
    <div class="w-full flex items-center justify-center">
        <nav class="bg-card rounded-lg border border-border p-1">
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
</header>
