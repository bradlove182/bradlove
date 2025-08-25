import { query } from "$app/server"
import { env } from "$env/dynamic/private"
import { isBoolean, isDateString } from "$lib/utils"
import { z } from "zod"
import { queryRequest } from ".."

export const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected format: YYYY-MM-DD.")

export type DateString = z.infer<typeof DateStringSchema>

export const ImageSchema = z.object({
    title: z.string(),
    url: z.string(),
})

export type Image = z.infer<typeof ImageSchema>

export const ImagesSchema = z.array(ImageSchema)

export type Images = z.infer<typeof ImagesSchema>

export const ImageBaseQueryParamsSchema = z.object({
    thumbs: z.boolean().optional(),
})

export const ImageSingleQueryParamsSchema = ImageBaseQueryParamsSchema.extend({
    date: DateStringSchema,
})

export type ImageSingleQueryParams = z.infer<typeof ImageSingleQueryParamsSchema>

export const ImageRangeQueryParamsSchema = ImageBaseQueryParamsSchema.extend({
    start_date: DateStringSchema,
    end_date: DateStringSchema,
})

export type ImageRangeQueryParams = z.infer<typeof ImageRangeQueryParamsSchema>

export type ImageQueryParams = ImageSingleQueryParams | ImageRangeQueryParams

const API_URL = "https://api.nasa.gov/planetary/apod"

export function createImageQueryParams(params: ImageQueryParams) {
    const queryParams = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
        switch (key) {
            case "date":
                if (isDateString(value))
                    queryParams.set("date", value)
                else
                    throw new Error(`Invalid date: ${value}. Expected format: YYYY-MM-DD.`)
                break
            case "start_date":
                if (isDateString(value))
                    queryParams.set("start_date", value)
                else
                    throw new Error(`Invalid start date: ${value}. Expected format: YYYY-MM-DD.`)
                break
            case "end_date":
                if (isDateString(value))
                    queryParams.set("end_date", value)
                else
                    throw new Error(`Invalid end date: ${value}. Expected format: YYYY-MM-DD.`)
                break
            case "thumbs":
                if (isBoolean(value))
                    queryParams.set("thumbs", value ? "true" : "false")
                else
                    throw new Error(`Invalid thumbs: ${value}. Expected boolean.`)
                break
            default:
                break
        }
    }

    return queryParams.toString()
}

export const getImage = query(ImageSingleQueryParamsSchema, async (params: ImageSingleQueryParams) => {
    const queryParams = createImageQueryParams(params)

    const url = `${API_URL}?${queryParams}&api_key=${env.NASA_API_KEY}`

    return queryRequest<Image>(url)
})

export const getImages = query(ImageRangeQueryParamsSchema, async (params: ImageRangeQueryParams) => {
    const queryParams = createImageQueryParams(params)

    const url = `${API_URL}?${queryParams}&api_key=${env.NASA_API_KEY}`

    return queryRequest<Images>(url)
})
