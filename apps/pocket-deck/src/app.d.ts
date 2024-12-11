// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Card } from "$lib/types/Card"

// for information about these interfaces
declare global {
    namespace App {
        interface Locals {
            cards: Card[]
        }
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {}
