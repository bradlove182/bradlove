<script lang="ts">
    import { Tabs as TabsPrimitive } from "bits-ui"
    import { cn } from "../../utils"

    const {
        class: className = undefined,
        children,
        ...rest
    }: TabsPrimitive.ListProps = $props()

</script>

<TabsPrimitive.List
    class={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</TabsPrimitive.List>
