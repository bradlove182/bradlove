<script lang="ts" generics="T extends MotionTag">
    import { useMotion } from "./context.svelte.ts"
    import type { MotionBaseProps, MotionProps, MotionTag } from "./types.ts"

    const props: MotionProps<T> = $props()
    const {
        animation,
        delay,
        duration,
        once = false,
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
    {...rest}
    class={className}
    data-motion={animation}
    data-motion-once={once || undefined}
    style:--motion-delay={delay === undefined ? undefined : `${delay}ms`}
    style:--motion-duration={duration === undefined ? undefined : `${duration}ms`}>
    {@render children?.()}
</svelte:element>
