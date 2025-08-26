import type { QueryResponse } from "$lib/data"
import type { Image } from "$lib/data/image"
import type { LayoutServerLoad } from "./$types"
import { createDateString, getImage } from "$lib/data/image"

async function getTodaysImageWithFallback(): Promise<QueryResponse<Image>> {
    const today = new Date()
    const date = createDateString(today)

    const todaysImage = await getImage({ date, thumbs: true })

    if (todaysImage.status === "error" && todaysImage.error?.code === 404) {
        const yesterday = new Date()
        yesterday.setUTCDate(today.getUTCDate() - 1)
        const fallbackDate = createDateString(yesterday)
        return getImage({ date: fallbackDate, thumbs: true })
    }
    return todaysImage
}

export const load: LayoutServerLoad = () => {
    return {
        image: getTodaysImageWithFallback(),
    }
}
