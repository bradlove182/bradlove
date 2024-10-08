<script lang="ts">
    import { cn } from "../../utils"
    import { type Props } from "."

    type $$Props = Props

    let className: $$Props["class"] = undefined
    export let tag: $$Props["tag"] = "div"
    export { className as class }
</script>

<svelte:element this={tag} class={cn("-my-px grid size-full grid-cols-xs border-y sm:grid-cols-sm lg:grid-cols-lg xl:grid-cols-xl", className)}>
    <div class="col-start-2 col-end-3 border-x size-full relative grid items-center">
        <slot />
    </div>
</svelte:element>
