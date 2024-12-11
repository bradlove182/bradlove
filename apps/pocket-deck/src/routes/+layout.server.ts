import type { Card } from "$lib/types/Card"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    const cards = (await import("$lib/data/cards.json")).default as Card[]

    locals.cards = cards

    return {
        cards,
    }
}
