import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    const cards = (await import("$lib/data/cards")).default

    const getRandomCard = () => {
        return cards[Math.floor(Math.random() * cards.length)]
    }

    locals.cards = cards

    return {
        cards,
        randomCards: Array.from({ length: 3 }).map(() => getRandomCard()),
    }
}
