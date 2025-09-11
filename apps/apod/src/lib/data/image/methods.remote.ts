import type {
    ImageRangeQueryParams,
    ImageSingleQueryParams,
} from "./index"
import { query } from "$app/server"
import { queryAndValidate } from ".."
import {
    createDateString,
    createImageUrl,
    ImageRangeQueryParamsSchema,
    ImageSchema,
    ImageSingleQueryParamsSchema,
    ImagesSchema,
} from "./index"

export const getImage = query(ImageSingleQueryParamsSchema, async (params: ImageSingleQueryParams) => {
    return queryAndValidate(createImageUrl(params), ImageSchema)
})

export const getImages = query(ImageRangeQueryParamsSchema, async (params: ImageRangeQueryParams) => {
    return queryAndValidate(createImageUrl(params), ImagesSchema)
})

export const getImageWithFallback = query(ImageSingleQueryParamsSchema, async (params: ImageSingleQueryParams) => {
    const image = await getImage(params)

    if (image.data?.url === null || image.data?.url?.trim() === "") {
        return getYesterdayImage(params)
    }

    if (!params.date && image.status === "error" && image.error?.code === 404) {
        return getYesterdayImage(params)
    }
    return image
})

async function getYesterdayImage(params: ImageSingleQueryParams) {
    const base = params.date ? new Date(params.date) : new Date()
    base.setUTCDate(base.getUTCDate() - 1)
    return getImage({ date: createDateString(base), thumbs: params.thumbs })
}
