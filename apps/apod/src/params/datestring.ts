import type { DateString } from "$lib/data/image"
import type { ParamMatcher } from "@sveltejs/kit"
import { dev } from "$app/environment"
import { DateStringSchema } from "$lib/data/image"

export const match = ((param: string): param is DateString => {
    const result = DateStringSchema.safeParse(param)
    if (dev && !result.success) {
        console.error(result.error)
    }
    return result.success
}) satisfies ParamMatcher
