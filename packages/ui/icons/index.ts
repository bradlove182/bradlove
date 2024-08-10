import type { SVGAttributes } from "svelte/elements"
import IconCheck from "./IconCheck.svelte"
import IconDotFilled from "./IconDotFilled.svelte"
import IconSun from "./IconSun.svelte"
import IconMoon from "./IconMoon.svelte"

interface IconProps extends SVGAttributes<SVGSVGElement> {
    color?: string
    size?: number | string
    stroke?: string
    class?: string
}

export { type IconProps, IconCheck, IconDotFilled, IconSun, IconMoon }
