import type { z } from "zod"

export interface SuccessResponse<T> {
    status: "success"
    data: T
    error: undefined
}

export interface ErrorResponse {
    status: "error"
    error: {
        code: number
        message: string
    }
    data: undefined
}

export type QueryResponse<T> = SuccessResponse<T> | ErrorResponse

export async function queryRequest<T>(url: string, options?: RequestInit): Promise<QueryResponse<T>> {
    try {
        const response = await fetch(url, options)

        const data = await response.json() as T

        if (response.ok) {
            return {
                status: "success",
                data,
                error: undefined,
            }
        }

        return {
            status: "error",
            error: { code: response.status, message: response.statusText },
            data: undefined,
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                status: "error",
                error: { code: 500, message: error.message },
                data: undefined,
            }
        }

        return {
            status: "error",
            error: { code: 500, message: "Internal Server Error" },
            data: undefined,
        }
    }
}

export async function queryAndValidate<T>(
    url: string,
    schema: z.ZodSchema<T>,
    options?: RequestInit,
): Promise<QueryResponse<T>> {
    const res = await queryRequest<T>(url, options)
    if (res.status === "success") {
        const parsed = schema.safeParse(res.data)
        if (parsed.success)
            return { status: "success", data: parsed.data, error: undefined }
        return { status: "error", error: { code: 502, message: "Upstream schema mismatch" }, data: undefined }
    }
    return res as QueryResponse<T>
}
