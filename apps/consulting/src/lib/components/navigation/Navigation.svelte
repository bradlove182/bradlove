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

<div class="sticky top-0 left-0 w-screen h-fit flex items-center justify-center py-2">
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
            <li>
                <ModeSwitcher />
            </li>
        </ul>
    </nav>
</div>
