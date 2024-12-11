import type { SVGAttributes } from "svelte/elements"
import IconCheck from "./IconCheck.svelte"
import IconDotFilled from "./IconDotFilled.svelte"
import IconMoon from "./IconMoon.svelte"
import IconSun from "./IconSun.svelte"

interface IconProps extends SVGAttributes<SVGSVGElement> {
    color?: string
    size?: number | string
    stroke?: string
    class?: string
}

export { IconCheck, IconDotFilled, IconMoon, type IconProps, IconSun }
