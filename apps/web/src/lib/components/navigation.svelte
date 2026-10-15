<script lang="ts">
    import { buttonVariants } from "@bradlove/ui/base/button/variants.ts"
    import * as NavigationMenu from "@bradlove/ui/base/navigation-menu/index.ts"
    import * as Popover from "@bradlove/ui/base/popover/index.ts"
    import { RiMenu3Line } from "@bradlove/ui/icons/index.ts"
    import { cn } from "@bradlove/ui/utils.ts"

    let header = $state<HTMLElement | null>(null)

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
    class="bg-background/10 sticky top-0 left-0 z-10 flex h-(--header-height) items-center justify-between border-b px-8 backdrop-blur"
>
    <a href="/" title="Home" class="bg-foreground size-4 rounded-full"></a>
    <NavigationMenu.Root class="hidden md:flex">
        <NavigationMenu.List class="gap-4">
            {#each items as item (item.link)}
                <NavigationMenu.Item>
                    <NavigationMenu.Link
                        href={item.link}
                        class={cn(
                            buttonVariants({
                                variant: item.cta ? "default" : "ghost",
                                size: "sm",
                            }),
                            "text-xs font-normal tracking-wider uppercase",
                        )}
                    >
                        {item.title}
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
    <Popover.Root>
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
            class={`bg-background h-(--bits-floating-available-height) w-dvw justify-start px-8 shadow-none ring-0`}
            customAnchor={header}
            side="top"
        >
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
                                class="animate-in fade-in slide-in-from-bottom-4 fill-mode-both group-has-[a:is(:hover,:focus-visible)]/menu:[&:not(:hover,:focus-visible)]:text-muted-foreground flex w-full justify-between border-b px-0 py-4 text-5xl font-bold tracking-wider uppercase transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent focus:bg-transparent"
                                style="--tw-animation-delay: {index * 100}ms"
                            >
                                <span>{item.title}</span>
                                <span class="text-muted-foreground self-end text-xs font-normal">
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    {/each}
                    <NavigationMenu.Item class="mt-auto">
                        <NavigationMenu.Link
                            class="animate-in fade-in slide-in-from-bottom-2 fill-mode-both group-has-[a:is(:hover,:focus-visible)]/menu:[&:not(:hover,:focus-visible)]:text-muted-foreground p-0 py-4 text-sm tracking-wider uppercase duration-700 hover:bg-transparent focus:bg-transparent"
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
