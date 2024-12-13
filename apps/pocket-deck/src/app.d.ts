// See https://svelte.dev/docs/kit/types#app.d.ts

import type { CardInterface } from "$lib/types/card"

// for information about these interfaces
declare global {
    namespace App {
        interface Locals {
            cards: CardInterface[]
        }
        interface PageData {
            cards: CardInterface[]
        }
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {}
