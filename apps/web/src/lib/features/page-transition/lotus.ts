const RINGS = [
    { count: 16, length: 1.45, width: 0.3, offset: 0.5 },
    { count: 12, length: 1, width: 0.26, offset: 0 },
    { count: 8, length: 0.65, width: 0.22, offset: 0.5 },
]

export interface Lotus {
    x: number
    y: number
    radius: number
    origin: string
    /** Petal paths per ring, outermost first. */
    rings: string[][]
}

const petal = (x: number, y: number, angle: number, length: number, width: number) => {
    const point = (along: number, across: number) => {
        const px = x + along * Math.cos(angle) - across * Math.sin(angle)
        const py = y + along * Math.sin(angle) + across * Math.cos(angle)
        return `${px.toFixed(1)} ${py.toFixed(1)}`
    }
    return [
        `M ${point(0, 0)}`,
        `C ${point(length * 0.3, width * 1.1)} ${point(length * 0.8, width * 0.6)} ${point(length, 0)}`,
        `C ${point(length * 0.8, -width * 0.6)} ${point(length * 0.3, -width * 1.1)} ${point(0, 0)}`,
        "Z",
    ].join(" ")
}

/** Lotus centred in a viewport, sized so the outer ring reaches past the corners. */
export const lotus = (width: number, height: number): Lotus => {
    const x = width / 2
    const y = height / 2
    const radius = Math.hypot(width, height) / 2

    return {
        x,
        y,
        radius,
        origin: `${x}px ${y}px`,
        rings: RINGS.map(({ count, length, width, offset }) =>
            Array.from({ length: count }, (_, index) =>
                petal(
                    x,
                    y,
                    ((index + offset) / count) * Math.PI * 2 - Math.PI / 2,
                    radius * length,
                    radius * width,
                ),
            ),
        ),
    }
}
