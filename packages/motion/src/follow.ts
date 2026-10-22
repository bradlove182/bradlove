import type { Attachment } from "svelte/attachments"
import { prefersReducedMotion } from "svelte/motion"

export type FollowOptions = {
    /** Fraction of the remaining distance covered per 60fps frame; lower trails further behind. */
    follow?: number
    /** Degrees of tilt per pixel of movement per frame. */
    tilt?: number
    /** Largest tilt in degrees. */
    maxTilt?: number
    /** Pixels between the cursor and the element's nearest edge. */
    gap?: number
    /** Pull toward the new side when the element swaps sides. */
    swapStiffness?: number
    /** Fraction of swap speed kept each frame (0-1); higher overshoots more. */
    swapDamping?: number
    /** Fraction of the viewport width either side of centre the cursor must cross before swapping sides. */
    deadZone?: number
}

const frameMs = 1000 / 60

/**
 * Eases an element after the cursor, beside it on whichever side has more room, tilting with its speed.
 * The element should be `position: fixed` at the top left of the viewport; this sets its `translate` and `rotate`.
 */
export class CursorFollow {
    private options: Required<FollowOptions>
    private element: HTMLElement | null = null
    private cursor = { x: 0, y: 0 }
    /** `side` runs from 0 (left of the cursor) to 1 (right of the cursor). */
    private current = { x: 0, y: 0, rotate: 0, side: 1, sideVelocity: 0 }
    private side = 1
    private frame = 0
    private last = 0

    constructor(options: FollowOptions = {}) {
        this.options = {
            follow: 0.1,
            tilt: 0.4,
            maxTilt: 12,
            gap: 32,
            swapStiffness: 0.008,
            swapDamping: 0.86,
            deadZone: 0.08,
            ...options,
        }
    }

    attach: Attachment<HTMLElement> = (element) => {
        this.element = element
        this.render()
        return () => {
            cancelAnimationFrame(this.frame)
            this.frame = 0
            this.element = null
        }
    }

    /** Eases toward the pointer. Use as a `pointermove` handler. */
    move = (event: PointerEvent) => {
        this.aim(event)
        if (prefersReducedMotion.current) this.settle()
        else if (!this.frame) this.frame = requestAnimationFrame(this.step)
    }

    /** Places the element at the pointer immediately, e.g. while it's hidden so it doesn't fly in from its last spot. */
    jump = (event: PointerEvent) => {
        this.aim(event)
        this.side = event.clientX / innerWidth > 0.5 ? 0 : 1
        this.settle()
    }

    private aim(event: PointerEvent) {
        const { deadZone } = this.options
        this.cursor.x = event.clientX
        this.cursor.y = event.clientY
        const position = event.clientX / innerWidth
        if (position > 0.5 + deadZone) this.side = 0
        else if (position < 0.5 - deadZone) this.side = 1
    }

    private settle() {
        cancelAnimationFrame(this.frame)
        this.frame = 0
        this.last = 0
        Object.assign(this.current, this.cursor, { rotate: 0, side: this.side, sideVelocity: 0 })
        this.render()
    }

    private render() {
        const { element, current } = this
        if (!element) return
        const { gap } = this.options
        const width = element.offsetWidth
        const offset = -gap - width + current.side * (width + gap * 2)
        element.style.translate = `${current.x + offset}px ${current.y - element.offsetHeight / 2}px`
        element.style.rotate = `${current.rotate}deg`
    }

    /** Tuning values are per 60fps frame; `frames` rescales them so high-refresh screens move at the same speed. */
    private step = (now: number) => {
        const { follow, tilt, maxTilt, gap, swapStiffness, swapDamping } = this.options
        const { cursor, current } = this
        const frames = Math.min((now - (this.last || now - frameMs)) / frameMs, 4)
        this.last = now
        const ease = 1 - (1 - follow) ** frames

        const dx = cursor.x - current.x
        const dy = cursor.y - current.y
        current.x += dx * ease
        current.y += dy * ease

        current.sideVelocity += (this.side - current.side) * swapStiffness * frames
        current.sideVelocity *= swapDamping ** frames
        current.side += current.sideVelocity * frames

        const swapSpeed = current.sideVelocity * ((this.element?.offsetWidth ?? 0) + gap * 2)
        const speed = dx * follow + swapSpeed * 0.5
        const lean = Math.max(-maxTilt, Math.min(maxTilt, speed * tilt))
        current.rotate += (lean - current.rotate) * ease
        this.render()

        const settled =
            Math.abs(dx) < 0.1 &&
            Math.abs(dy) < 0.1 &&
            Math.abs(this.side - current.side) < 0.001 &&
            Math.abs(current.sideVelocity) < 0.001 &&
            Math.abs(current.rotate) < 0.01
        this.frame = settled ? 0 : requestAnimationFrame(this.step)
        if (settled) this.last = 0
    }
}
