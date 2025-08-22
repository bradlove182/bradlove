<script lang="ts">
    import { ModeSwitcher } from "$lib/components/mode-switcher"
    import {
        Button,
        cn,
    } from "@repo/ui"

    let scrollY = $state(0)
</script>

<svelte:window bind:scrollY />

<header class={cn(
    "@container animate-in slide-in-from-top-5 fade-in bg-background/50 animation-duration-[1000ms] sticky left-0 top-0 z-50 flex h-fit w-full items-center justify-center mx-auto border-b border-transparent py-2 backdrop-blur-md transition duration-200 ease-in-out",
    scrollY > 5 ? "border-border" : "",
)}>
    <div class="flex items-center w-full px-8">
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
                        <Button variant="ghost">Services</Button>
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
