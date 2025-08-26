import { z } from "zod"

export interface ErrorDetails {
    code: number
    message: string
    details?: Record<string, string[] | undefined>
}

export interface SuccessResponse<T> {
    status: "success"
    data: T
    error: undefined
}

export interface ErrorResponse {
    status: "error"
    error: ErrorDetails
    data: undefined
}

export type QueryResponse<T> = SuccessResponse<T> | ErrorResponse

export function isErrorResponse(error: unknown): error is ErrorResponse {
    return typeof error === "object" && error !== null && "status" in error && error.status === "error"
}

export function isErrorDetails(error: unknown): error is ErrorDetails {
    return typeof error === "object" && error !== null && "code" in error && "message" in error
}

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
    schema: z.ZodType<T>,
    options?: RequestInit,
): Promise<QueryResponse<T>> {
    const res = await queryRequest<unknown>(url, options)

    if (res.status === "success") {
        const parsed = schema.safeParse(res.data)

        if (parsed.success) {
            return {
                status: "success",
                data: parsed.data,
                error: undefined,
            }
        }

        const formatted = z.flattenError(parsed.error)

        return {
            status: "error",
            error: {
                code: 502,
                message: "Upstream schema mismatch",
                details: formatted.fieldErrors,
            },
            data: undefined,
        }
    }

    return res as QueryResponse<T>
}
