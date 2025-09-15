import { z } from "zod"

export interface ErrorDetails {
    code: number
    message: string
    details?: {
        fieldErrors?: Record<string, string[]>
        formErrors?: string[]
    }
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

/* eslint-disable ts/no-unsafe-member-access */
export function isErrorResponse(val: unknown): val is ErrorResponse {
    return typeof val === "object"
        && val !== null
        && (val as any).status === "error"
        && "error" in (val as any)
        && isErrorDetails((val as any).error)
        && (val as any).data === undefined
}

export function isErrorDetails(val: unknown): val is ErrorDetails {
    return typeof val === "object"
        && val !== null
        && typeof (val as any).code === "number"
        && typeof (val as any).message === "string"
}
/* eslint-enable ts/no-unsafe-member-access */

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
