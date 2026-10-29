import type { Attachment } from "svelte/attachments"

/**
 * Marks a tall wrapper as the pin for scroll animations inside it. Its direct child should be sticky;
 * `reveal` and `highlight` then play exactly while that child is held in place.
 */
export const pin: Attachment<HTMLElement> = (element) => {
    element.setAttribute("data-motion-pin", "")
    return () => element.removeAttribute("data-motion-pin")
}
