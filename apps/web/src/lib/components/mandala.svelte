<script lang="ts">
    import type { Attachment } from "svelte/attachments"

    interface Props {
        /** Rosettes visible at once. */
        count?: number
        /** Zoom cycles per second. */
        speed?: number
        /** Opacity multiplier. */
        intensity?: number
        /** Element the mandala radiates from. Defaults to the canvas center. */
        center?: HTMLElement | null
        /** Gap between each ring starting to fade in on load, in ms. */
        introStagger?: number
        /** How long each ring takes to fade in on load, in ms. */
        introDuration?: number
        class?: string
    }

    let {
        count = 6,
        speed = 0.0125,
        intensity = 1,
        center = null,
        introStagger = 180,
        introDuration = 900,
        class: className,
    }: Props = $props()

    const TAU = Math.PI * 2
    const PETALS = 16
    const SECTOR = TAU / PETALS
    const ROTATION_SPEED = 0.0175
    const INNER = 0.02
    const OUTER = 0.95

    const mandala: Attachment<HTMLCanvasElement> = (canvas) => {
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const anchor = center
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)")

        let width = 0
        let height = 0
        let cx = 0
        let cy = 0
        let time = 0
        let last: number | null = null
        let frame = 0
        let visible = true

        const polar = (radius: number, angle: number): [number, number] => [
            cx + Math.cos(angle) * radius,
            cy + Math.sin(angle) * radius,
        ]

        const rosette = (radius: number, rotation: number) => {
            const cusp = radius * 0.52

            ctx.beginPath()
            for (let petal = 0; petal < PETALS; petal++) {
                const tip = rotation + petal * SECTOR

                for (const side of [-1, 1]) {
                    const base = tip + side * SECTOR * 1.5

                    ctx.moveTo(...polar(cusp, base))
                    ctx.bezierCurveTo(
                        ...polar(radius * 0.92, base),
                        ...polar(radius * 0.76, tip + side * SECTOR * 0.5),
                        ...polar(radius, tip),
                    )
                }
            }
            ctx.stroke()
        }

        const measure = () => {
            const rect = canvas.getBoundingClientRect()
            const dpr = Math.min(window.devicePixelRatio || 1, 2)

            width = rect.width
            height = rect.height
            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            if (anchor) {
                const a = anchor.getBoundingClientRect()
                cx = a.left + a.width / 2 - rect.left
                cy = a.top + a.height / 2 - rect.top
            } else {
                cx = width / 2
                cy = height / 2
            }
        }

        const intro = (ring: number) => {
            if (motion.matches) return 1

            const t = (time * 1000 - ring * introStagger) / introDuration
            const clamped = Math.min(Math.max(t, 0), 1)
            return 1 - (1 - clamped) ** 3
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            const color = getComputedStyle(canvas).color
            ctx.strokeStyle = color
            ctx.fillStyle = color
            ctx.lineWidth = 1

            const inner = Math.max(width, height) * INNER
            const span = Math.log(OUTER / INNER)
            const phase = (time * speed) % 1

            for (let ring = 0; ring < count; ring++) {
                const progress = (ring / count + phase) % 1
                const alpha = 0.32 * intensity * Math.sin(progress * Math.PI) ** 1.2 * intro(ring)
                if (alpha < 0.01) continue

                ctx.globalAlpha = alpha * 0.8
                rosette(
                    inner * Math.exp(progress * span),
                    time * ROTATION_SPEED * (ring % 2 === 0 ? 1 : -1),
                )
            }

            ctx.globalAlpha = 1
        }

        const tick = (now: number) => {
            if (last !== null) time += Math.min(now - last, 100) / 1000
            last = now
            draw()
            frame = requestAnimationFrame(tick)
        }

        const sync = () => {
            cancelAnimationFrame(frame)
            last = null
            if (visible && !motion.matches) frame = requestAnimationFrame(tick)
            else draw()
        }

        const resizeObserver = new ResizeObserver(() => {
            measure()
            draw()
        })
        resizeObserver.observe(canvas)
        if (anchor) resizeObserver.observe(anchor)

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? true
            sync()
        })
        intersectionObserver.observe(canvas)

        motion.addEventListener("change", sync)

        measure()
        sync()

        return () => {
            cancelAnimationFrame(frame)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            motion.removeEventListener("change", sync)
        }
    }
</script>

<canvas {@attach mandala} class={className} aria-hidden="true"></canvas>
