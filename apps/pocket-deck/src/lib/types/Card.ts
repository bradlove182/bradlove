export type Category = "Pokemon" | "Trainer"

export type Evolution = "Basic" | "Stage 1" | "Stage 2" | ["Stage 1" | "Stage 2" | "Basic", "ex"]

export type PokemonType = "Grass" | "Fire" | "Water" | "Lightning" | "Psychic" | "Fighting" | "Colorless" | "Metal" | "Dragon" | "Darkness"

export type Rarity = "◇" | "◇◇" | "◇◇◇" | "◇◇◇◇" | "☆" | "☆☆" | "☆☆☆" | "♛" | "Promo"

export type SubSet = "Mewtwo" | "Pikachu" | "Charizard" | "Any" | "Special" | "Promo-A"

export type TrainerSubcategory = "Supporter" | "Item"

export type Set = "Genetic Apex (A1)" | "Promo"

export interface CardInterface {
    id: string
    cardNumber: string
    name: string
    category: Category
    evolution?: Evolution
    type?: PokemonType
    trainerSubcategory?: TrainerSubcategory
    rarity: Rarity
    set: Set
    subSet: SubSet
    imageUrl: string
    thumbnailUrl: string
    hp?: string
    relatedCards?: string
}

export function toUrlSafeId(id: string): string {
    return id.toLowerCase().replace(/\s+/g, "-")
}
