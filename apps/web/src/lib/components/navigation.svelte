<script lang="ts">
    import { beforeNavigate } from "$app/navigation"
    import { page } from "$app/state"
    import { buttonVariants } from "@bradlove/ui/base/button/variants.ts"
    import * as NavigationMenu from "@bradlove/ui/base/navigation-menu/index.ts"
    import * as Popover from "@bradlove/ui/base/popover/index.ts"
    import { RiMenu3Line } from "@bradlove/ui/icons/index.ts"
    import { cn } from "@bradlove/ui/utils.ts"

    import Logo from "./logo.svelte"
    import Mandala from "./mandala.svelte"

    let header = $state<HTMLElement | null>(null)
    let corner = $state<HTMLElement | null>(null)
    let open = $state(false)

    beforeNavigate(() => {
        open = false
    })

    const isActive = (link: string) =>
        page.url.pathname === link || page.url.pathname.startsWith(`${link}/`)

    const items: { title: string; link: string; cta?: boolean }[] = [
        {
            title: "Work",
            link: "/work",
        },
        {
            title: "About",
            link: "/about",
        },
        {
            title: "Services",
            link: "/services",
        },
        {
            title: "Start a project",
            link: "/contact",
            cta: true,
        },
    ]

    const mobileItems: { title: string; link: string; cta?: boolean }[] = [
        {
            title: "Work",
            link: "/work",
        },
        {
            title: "About",
            link: "/about",
        },
        {
            title: "Services",
            link: "/services",
        },
        {
            title: "Contact",
            link: "/contact",
            cta: true,
        },
    ]
</script>

<header
    bind:this={header}
    class="bg-background/80 sticky top-0 left-0 z-10 flex h-(--header-height) items-center justify-between border-b px-8 backdrop-blur-2xl"
>
    <a href="/" title="Home" class="text-foreground">
        <Logo class="size-8" />
        <span class="sr-only">Home</span>
    </a>
    <NavigationMenu.Root class="hidden md:flex">
        <NavigationMenu.List class="gap-4">
            {#each items as item (item.link)}
                <NavigationMenu.Item>
                    <NavigationMenu.Link
                        href={item.link}
                        active={isActive(item.link)}
                        class={cn(
                            buttonVariants({
                                variant: item.cta ? "default" : "ghost",
                                size: "sm",
                            }),
                            "text-xs font-normal tracking-wider uppercase",
                            item.cta
                                ? "bg-accent text-accent-foreground hover:bg-accent/80 data-active:bg-accent data-active:hover:bg-accent/80 data-active:focus:bg-accent/80"
                                : "data-active:text-accent data-active:hover:bg-muted data-active:bg-transparent",
                        )}
                    >
                        {item.title}
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
    <Popover.Root bind:open>
        <Popover.Trigger
            class={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-xs tracking-wider uppercase md:hidden",
            )}
        >
            <RiMenu3Line class="size-3" />
            Menu
        </Popover.Trigger>
        <Popover.Content
            sideOffset={0}
            alignOffset={0}
            class={`bg-background relative isolate h-(--bits-floating-available-height) w-dvw justify-start overflow-hidden px-8 shadow-none ring-0`}
            customAnchor={header}
            side="top"
        >
            <Mandala
                center={corner}
                count={5}
                speed={0.008}
                intensity={0.47}
                class="text-foreground pointer-events-none absolute inset-0 -z-10 size-full"
            />
            <span bind:this={corner} aria-hidden="true" class="absolute right-0 bottom-0 size-0">
            </span>
            <NavigationMenu.Root
                class="h-full w-full max-w-full items-start justify-start [&>div]:h-full [&>div]:w-full"
            >
                <NavigationMenu.List
                    class="group/menu flex h-full w-full flex-col items-start gap-0"
                >
                    {#each mobileItems as item, index (item.link)}
                        <NavigationMenu.Item class="h-fit w-full">
                            <NavigationMenu.Link
                                href={item.link}
                                active={isActive(item.link)}
                                class="data-active:text-accent animate-in fade-in slide-in-from-bottom-4 fill-mode-both group-has-[a:is(:hover,:focus-visible)]/menu:[&:not(:hover,:focus-visible)]:text-muted-foreground font-heading flex w-full justify-between border-b px-0 py-4 text-5xl font-bold tracking-wider uppercase transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent"
                                style="--tw-animation-delay: {index * 100}ms"
                            >
                                <span>{item.title}</span>
                                <span
                                    class="text-muted-foreground self-end font-mono text-xs font-normal"
                                >
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    {/each}
                    <NavigationMenu.Item class="mt-auto">
                        <NavigationMenu.Link
                            class="animate-in fade-in slide-in-from-bottom-2 fill-mode-both group-has-[a:is(:hover,:focus-visible)]/menu:[&:not(:hover,:focus-visible)]:text-muted-foreground inline-flex items-center gap-2 p-0 py-4 font-mono text-sm tracking-wider uppercase duration-700 hover:bg-transparent focus:bg-transparent"
                            href="mailto:brad@bradlove.co.za"
                            style="--tw-animation-delay: {mobileItems.length * 100}ms"
                        >
                            brad@bradlove.co.za
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </NavigationMenu.Root>
        </Popover.Content>
    </Popover.Root>
</header>
