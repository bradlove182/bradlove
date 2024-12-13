import type { PageLoad } from "./$types"
import { decodeBase64url } from "$lib/crypto"

export const load: PageLoad = ({ params }) => {
    return {
        initialCards: typeof params.code === "string" ? decodeBase64url(params.code).split(",") : [],
    }
}
