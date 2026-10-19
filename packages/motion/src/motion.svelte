<script lang="ts" generics="T extends MotionTag">
    import { useMotion } from "./context.svelte.ts"
    import { splitLetters } from "./letters.ts"
    import type { MotionBaseProps, MotionProps, MotionTag } from "./types.ts"

    const props: MotionProps<T> = $props()
    const {
        animation,
        letters,
        delay,
        duration,
        stagger,
        repeat = false,
        tag,
        children,
        class: className,
        ...rest
    } = $derived(props as MotionBaseProps)

    const [motion] = useMotion()
</script>

<svelte:element
    this={tag}
    {@attach motion}
    {@attach letters && splitLetters({ variant: letters, delay, stagger })}
    {...rest}
    class={className}
    data-motion={animation}
    data-letters={letters}
    data-motion-repeat={repeat || undefined}
    style:--motion-delay={delay === undefined ? undefined : `${delay}ms`}
    style:--motion-duration={duration === undefined ? undefined : `${duration}ms`}>
    {@render children?.()}
</svelte:element>
