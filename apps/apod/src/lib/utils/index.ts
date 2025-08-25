import type { DateString } from "$lib/data/image"

export function isDefined<T>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null
}

export function isString(value: unknown): value is string {
    return isDefined(value) && typeof value === "string"
}

export function isBoolean(value: unknown): value is boolean {
    return isDefined(value) && typeof value === "boolean"
}

export function isDateString(value: unknown): value is DateString {
    return isString(value) && /^\d{4}-\d{2}-\d{2}$/.test(value)
}
