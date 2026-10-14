<script lang="ts">
    import { buttonVariants } from "@bradlove/ui/base/button/variants.ts"
    import * as NavigationMenu from "@bradlove/ui/base/navigation-menu/index.ts"
    import { cn } from "@bradlove/ui/utils.js"

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
</script>

<header
    class="bg-background/10 sticky top-0 left-0 z-10 flex items-center justify-between border-b px-8 py-3 backdrop-blur"
>
    <a href="/" title="Home" class="bg-foreground size-4 rounded-full"></a>
    <NavigationMenu.Root>
        <NavigationMenu.List class="gap-4">
            {#each items as item (item.link)}
                <NavigationMenu.Item>
                    <NavigationMenu.Link
                        href={item.link}
                        class={cn(
                            buttonVariants({ variant: item.cta ? "default" : "ghost", size: "sm" }),
                            "text-xs font-normal tracking-wider uppercase",
                        )}
                    >
                        {item.title}
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
</header>
