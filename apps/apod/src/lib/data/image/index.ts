import { env } from "$env/dynamic/public"
import { z } from "zod"

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const MIN_APOD_DATE = "1995-06-16" // first APOD: June 16, 1995

export function createDateString(date: Date): DateString {
    return date.toISOString().split("T")[0]
}

/**
 * Validates if a date string represents a valid calendar date
 */
function isValidCalendarDate(dateString: string): boolean {
    const [year, month, day] = dateString.split("-").map(Number)
    const date = new Date(Date.UTC(year, month - 1, day))

    return date.getUTCFullYear() === year
        && date.getUTCMonth() === month - 1
        && date.getUTCDate() === day
}

/**
 * Validates if a date string is within the allowed APOD date range
 */
function isInApodRange(dateString: string): boolean {
    const today = new Date().toISOString().slice(0, 10)
    return dateString >= MIN_APOD_DATE && dateString <= today
}

export const DateStringSchema = z
    .string()
    .regex(DATE_REGEX, "Invalid date format. Expected format: YYYY-MM-DD.")
    .refine(isValidCalendarDate, "Invalid calendar date.")
    .refine(isInApodRange, `Date must be between ${MIN_APOD_DATE} (first APOD) and today.`)

export type DateString = z.infer<typeof DateStringSchema>

export const ImageSchema = z.object({
    title: z.string().min(1),
    url: z.url(), // image or video URL
    media_type: z.enum(["image", "video", "other"]),
    hdurl: z.url().optional(), // present for images
    thumbnail_url: z.url().optional(), // present when thumbs=true & media_type=video
    explanation: z.string().optional(), // don’t force consumers, but keep it available
    service_version: z.string().optional(),
    copyright: z.string().optional(),
})

export type Image = z.infer<typeof ImageSchema>

export const ImagesSchema = z.array(ImageSchema)

export type Images = z.infer<typeof ImagesSchema>

export const ImageBaseQueryParamsSchema = z.object({
    thumbs: z.boolean().default(false),
})

export const ImageSingleQueryParamsSchema = ImageBaseQueryParamsSchema.extend({
    date: DateStringSchema,
})

export type ImageSingleQueryParams = z.infer<typeof ImageSingleQueryParamsSchema>

export const ImageRangeQueryParamsSchema = ImageBaseQueryParamsSchema.extend({
    start_date: DateStringSchema,
    end_date: DateStringSchema,
}).refine(({ start_date, end_date }) => start_date <= end_date, {
    message: "start_date must be on or before end_date.",
    path: ["end_date"],
})

export type ImageRangeQueryParams = z.infer<typeof ImageRangeQueryParamsSchema>

export const ImageQueryParamsSchema = z.union([ImageSingleQueryParamsSchema, ImageRangeQueryParamsSchema])

export type ImageQueryParams = z.infer<typeof ImageQueryParamsSchema>

const API_URL = "https://api.nasa.gov/planetary/apod"

export function createImageQueryParams(params: ImageQueryParams) {
    const queryParams = new URLSearchParams()

    if ("date" in params) {
        queryParams.set("date", params.date)
    }

    if ("start_date" in params) {
        queryParams.set("start_date", params.start_date)
    }

    if ("end_date" in params) {
        queryParams.set("end_date", params.end_date)
    }

    if ("thumbs" in params && params.thumbs) {
        queryParams.set("thumbs", "true")
    }

    // Defensive check for unexpected fields in case callers widen the type
    for (const key of Object.keys(params)) {
        if (!["date", "start_date", "end_date", "thumbs"].includes(key)) {
            throw new Error(`Unsupported query param: ${key}`)
        }
    }

    return queryParams.toString()
}

export function createImageUrl(params: ImageQueryParams) {
    const key = env.PUBLIC_NASA_API_KEY ?? "DEMO_KEY"
    const url = new URL(API_URL)
    url.search = createImageQueryParams(params)
    url.searchParams.set("api_key", key)
    return url.toString()
}
