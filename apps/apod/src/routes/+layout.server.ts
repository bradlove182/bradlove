import type { LayoutServerLoad } from "./$types"
import { createDateString, getImage } from "$lib/data/image"

export const load: LayoutServerLoad = () => {
    const date = createDateString(new Date())

    return {
        image: getImage({
            date,
            thumbs: true,
        }),
    }
}
