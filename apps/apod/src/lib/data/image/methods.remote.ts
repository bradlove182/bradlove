import type {
    APODImage,
    APODImages,
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
    return queryAndValidate<APODImage>(createImageUrl(params), ImageSchema)
})

export const getImages = query(ImageRangeQueryParamsSchema, async (params: ImageRangeQueryParams) => {
    return queryAndValidate<APODImages>(createImageUrl(params), ImagesSchema)
})

export const getImageWithFallback = query(ImageSingleQueryParamsSchema, async (params: ImageSingleQueryParams) => {
    const image = await getImage(params)

    if (image.data?.url === "" || image.data?.url === null) {
        return getYesterdayImage(params)
    }

    if (image.status === "error" && image.error?.code === 404) {
        return getYesterdayImage(params)
    }
    return image
})

async function getYesterdayImage(params: ImageSingleQueryParams) {
    const yesterday = new Date()
    yesterday.setUTCDate(yesterday.getUTCDate() - 1)
    return getImage({ date: createDateString(yesterday), thumbs: params.thumbs })
}
