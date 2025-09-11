import type { DateString } from "$lib/data/image"
import type { ParamMatcher } from "@sveltejs/kit"
import { DateStringSchema } from "$lib/data/image"

export const match = ((param: string): param is DateString => {
    return DateStringSchema.safeParse(param).success
}) satisfies ParamMatcher
