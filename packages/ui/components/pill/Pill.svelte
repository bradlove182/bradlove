<script lang="ts">
    import { cn } from "../../utils"
    import { type Props } from "."

    type $$Props = Props

    interface Props_1 {
        tag?: $$Props["tag"];
        class?: $$Props["class"];
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { tag = "span", class: className = undefined, children, ...rest }: Props_1 = $props();
    
</script>

<svelte:element
    this={tag}
    class={cn(
        "relative inline-flex w-fit items-center gap-1 overflow-hidden rounded-full bg-card text-sm shadow-sm",
        className,
    )}
    {...rest}
>
    <span class={cn("inset-px z-20 m-px grid place-items-center rounded-full bg-card px-3 py-1", className)}>
        {@render children?.()}
    </span>
    <span aria-hidden="true" class="absolute inset-0 z-0 bg-border pointer-events-none"></span>
    <span aria-hidden="true" class="absolute inset-0 z-10 scale-x-[1.5] blur before:absolute before:inset-0 before:top-1/2 before:animate-disco-border before:bg-gradient-conic before:from-primary before:via-transparent before:to-transparent pointer-events-none"></span>
</svelte:element>
