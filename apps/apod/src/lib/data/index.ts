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

        console.log(data)

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
