<script lang="ts">
    import { Button as ButtonPrimitive } from "bits-ui"
    import { buttonVariants, type Props } from "."
    import { cn } from "../../utils"

    const {
        class: className = undefined,
        variant = "default",
        size = "default",
        children,
        ...rest
    }: Props = $props()

</script>

<ButtonPrimitive.Root
    class={cn(buttonVariants({ variant, size, className }))}
    {...rest}
>
    {@render children?.()}
</ButtonPrimitive.Root>
