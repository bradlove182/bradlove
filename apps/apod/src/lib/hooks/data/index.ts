import type { APODImage } from "$lib/data/image"
import { useState } from "$lib/hooks/index.svelte"

export function useImage() {
    const state = useState<APODImage | undefined>("image", undefined)

    const get = () => {
        return state.current
    }

    const set = (image: APODImage) => {
        state.current = image
    }

    return {
        ...state,
        get,
        set,
    }
}
