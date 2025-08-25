import { query } from "$app/server"
import { env } from "$env/dynamic/private"
import { queryRequest } from ".."

export interface Image {
    title: string
    url: string
}

type DateString = `${string}-${string}-${string}`

export interface ImageQueryParams {
    date: DateString
    start_date?: DateString
    end_date?: DateString
    thumbs?: boolean
}

const API_URL = "https://api.nasa.gov/planetary/apod"

export function createImageQueryParams(params: ImageQueryParams) {
    const { date, start_date, end_date, thumbs } = params

    const queryParams = new URLSearchParams()

    if (date)
        queryParams.set("date", date)
    if (start_date)
        queryParams.set("start_date", start_date)
    if (end_date)
        queryParams.set("end_date", end_date)
    if (thumbs)
        queryParams.set("thumbs", "true")

    return queryParams.toString()
}

export const getImage = query("unchecked", async (params: ImageQueryParams) => {
    const queryParams = createImageQueryParams(params)

    const url = `${API_URL}?${queryParams}&api_key=${env.NASA_API_KEY}`

    return queryRequest<Image>(url)
})
