import type { LayoutServerLoad } from "./$types"
import { createDateString, getImage } from "$lib/data/image"

async function getImageWithFallback(date: string, thumbs: boolean) {
    return getImage({ date, thumbs }).then(async (result) => {
        // If today's image fails with 404, try yesterday
        if (result.status === "error" && result.error?.code === 404) {
            const yesterday = new Date()
            yesterday.setUTCDate(yesterday.getUTCDate() - 1)
            const fallbackDate = createDateString(yesterday)
            return getImage({ date: fallbackDate, thumbs })
        }
        return result
    })
}

export const load: LayoutServerLoad = () => {
    const date = createDateString(new Date())

    return {
        image: getImageWithFallback(date, true),
    }
}
