import type { LayoutServerLoad } from "./$types"
import { getImage } from "$lib/data/image"

export const load: LayoutServerLoad = () => {
    return {
        image: getImage({
            date: "2025-08-24",
            thumbs: true,
        }),
    }
}
