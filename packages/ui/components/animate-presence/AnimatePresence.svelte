<script lang="ts" module>
    let observer: IntersectionObserver
    const observables = new Map<Element, (target: Element) => void>()
</script>

<script lang="ts">
    import { onMount } from "svelte"
    import { type Props } from "."
    import { cn } from "../../utils"

    const {
        tag = "div",
        animations = "",
        delay = "",
        class: className = undefined,
        children,
        ...rest
    }: Props = $props()

    let element: HTMLElement | undefined = $state()

    onMount(() => {
        if (!observer) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Call the relevant elements animations from the observables map
                        observables.get(entry.target)?.(entry.target)
                    }
                })
            }, {
                rootMargin: "-10%",
            })
        }

        if (element) {
            // Add the relevant elements animations to the observables map
            observables.set(element, (element: Element) => {
                if (animations) {
                    element.classList.add(animations)
                }
            })

            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
                observables.delete(element)
            }

            if (observables.size === 0) {
                observer.disconnect()
            }
        }
    })

</script>

<svelte:element this={tag} bind:this={element} class={cn("opacity-0", className)} style="animation-delay: {delay}" {...rest}>
    {@render children?.()}
</svelte:element>
