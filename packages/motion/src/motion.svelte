<script lang="ts" generics="T extends MotionTag">
    import { useMotion } from "./context.svelte.ts"
    import { isLetters, splitLetters } from "./letters.ts"
    import { scrollReveal } from "./reveal.ts"
    import type { MotionBaseProps, MotionProps, MotionTag } from "./types.ts"

    const props: MotionProps<T> = $props()
    const {
        animation,
        delay,
        duration,
        stagger,
        repeat = false,
        tag,
        children,
        class: className,
        ...rest
    } = $derived(props as MotionBaseProps)

    const letters = $derived(animation && isLetters(animation) ? animation : undefined)
    const reveal = $derived(animation === "reveal")

    const [motion, context] = useMotion()
</script>

<svelte:element
    this={tag}
    {@attach !reveal && motion}
    {@attach letters && splitLetters({ variant: letters, delay, stagger })}
    {@attach reveal && scrollReveal({ context })}
    {...rest}
    class={className}
    data-motion={animation}
    data-motion-repeat={repeat || undefined}
    style:--motion-delay={delay === undefined ? undefined : `${delay}ms`}
    style:--motion-duration={duration === undefined ? undefined : `${duration}ms`}>
    {@render children?.()}
</svelte:element>
