<script lang="ts" context="module">

    let observer: IntersectionObserver
    const observables = new Map<Element, (target: Element) => void>()

</script>

<script lang="ts">

    import { onMount } from "svelte"
    import { cn } from "../../utils"
    import { type Props } from "."

    type $$Props = Props

    export let tag: $$Props["tag"] = "div"
    export let animations: $$Props["animations"] = ""
    let className: $$Props["class"] = undefined
    export { className as class }

    let element: HTMLElement

    onMount(() => {
        if (!observer) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Call the relevant elements animations from the observables map
                        observables.get(entry.target)?.(entry.target)
                    }
                })
            })
        }

        // Add the relevant elements animations to the observables map
        observables.set(element, (element: Element) => {
            if (animations) {
                element.classList.add(animations)
            }
        })

        observer.observe(element)

        return () => {
            observer.unobserve(element)
            observables.delete(element)
            if (observables.size === 0) {
                observer.disconnect()
            }
        }
    })

</script>

<svelte:element this={tag} bind:this={element} class={cn(className)} {...$$restProps}>
    <slot />
</svelte:element>
