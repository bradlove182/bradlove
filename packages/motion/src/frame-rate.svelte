<script lang="ts">
    import type { Attachment } from "svelte/attachments"

    type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right"

    let { position = "bottom-left" }: { position?: Corner } = $props()

    const samples = 120
    const width = 120
    const height = 32
    /** Frame time at the top of the graph, in ms. */
    const ceiling = 50

    let fps = $state(0)
    let worst = $state(0)

    const colourFor = (ms: number) => (ms <= 20 ? "#4ade80" : ms <= 34 ? "#facc15" : "#f87171")

    const meter: Attachment<HTMLCanvasElement> = (canvas) => {
        const context = canvas.getContext("2d")
        if (!context) return
        const scale = devicePixelRatio
        canvas.width = width * scale
        canvas.height = height * scale
        context.scale(scale, scale)

        const times = new Float32Array(samples)
        let head = 0
        let frame = 0
        let last = performance.now()
        let windowStart = last
        let windowFrames = 0
        let windowWorst = 0

        const draw = () => {
            context.clearRect(0, 0, width, height)
            const bar = width / samples
            for (let i = 0; i < samples; i++) {
                const ms = times[(head + i) % samples]
                if (!ms) continue
                const barHeight = Math.min(ms / ceiling, 1) * height
                context.fillStyle = colourFor(ms)
                context.fillRect(i * bar, height - barHeight, bar, barHeight)
            }
            context.fillStyle = "rgb(255 255 255 / 0.35)"
            context.fillRect(0, height - (1000 / 60 / ceiling) * height, width, 1)
        }

        const tick = (now: number) => {
            const delta = now - last
            last = now
            times[head] = delta
            head = (head + 1) % samples
            windowFrames++
            windowWorst = Math.max(windowWorst, delta)
            // Text updates twice a second so the meter itself doesn't re-render every frame.
            if (now - windowStart >= 500) {
                fps = Math.round((windowFrames * 1000) / (now - windowStart))
                worst = windowWorst
                windowStart = now
                windowFrames = 0
                windowWorst = 0
            }
            draw()
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(frame)
    }
</script>

{#if import.meta.env.DEV}
    <div class="frame-rate" data-position={position} aria-hidden="true">
        <div class="readout">
            <span style:color={colourFor(1000 / Math.max(fps, 1))}>{fps} fps</span>
            <span>worst {worst.toFixed(1)}ms</span>
        </div>
        <canvas {@attach meter} style:width="{width}px" style:height="{height}px"></canvas>
    </div>
{/if}

<style>
    .frame-rate {
        position: fixed;
        z-index: 2147483647;
        display: grid;
        gap: 4px;
        padding: 6px 8px;
        border-radius: 6px;
        background: rgb(0 0 0 / 0.8);
        color: rgb(255 255 255 / 0.7);
        font:
            11px/1 ui-monospace,
            monospace;
        font-variant-numeric: tabular-nums;
        pointer-events: none;
    }

    .readout {
        display: flex;
        justify-content: space-between;
        gap: 12px;
    }

    [data-position^="top"] {
        top: 8px;
    }

    [data-position^="bottom"] {
        bottom: 8px;
    }

    [data-position$="left"] {
        left: 8px;
    }

    [data-position$="right"] {
        right: 8px;
    }
</style>
