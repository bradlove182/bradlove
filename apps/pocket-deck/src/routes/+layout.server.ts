import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    const cards = (await import("$lib/data/cards")).default

    locals.cards = cards

    return {
        cards,
    }
}
