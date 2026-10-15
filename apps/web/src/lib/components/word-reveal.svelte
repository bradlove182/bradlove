<script lang="ts" module>
    /** Deterministic 0..1 noise so server and client render the same delays. */
    const noise = (seed: number) => {
        const x = Math.sin(seed * 12.9898) * 43758.5453
        return x - Math.floor(x)
    }

    export type WordRevealVariant = "bloom" | "grow" | "focus" | "wave"
</script>

<script lang="ts">
    interface Props {
        word: string
        /**
         * - `bloom` scales letters out of a blur, radiating from the middle letter
         * - `grow` swells the font weight from hairline to its final weight
         * - `focus` drifts letters together out of a wide, blurred spread
         * - `wave` springs letters up on a sine-wave stagger
         */
        variant?: WordRevealVariant
        /** Delay before the first letter starts, in ms. */
        delay?: number
        /** Gap between each letter starting, in ms. */
        stagger?: number
        /** How long each letter takes to reveal, in ms. */
        duration?: number
        class?: string
    }

    const {
        word,
        variant = "bloom",
        delay = 0,
        stagger = 110,
        duration = 1800,
        class: className,
    }: Props = $props()

    const letters = $derived(word.split(""))
    const middle = $derived((letters.length - 1) / 2)

    const delayFor = (index: number) => {
        const order =
            variant === "bloom"
                ? Math.abs(index - middle)
                : variant === "wave"
                  ? index + Math.sin(index * 0.9) * 0.6
                  : index

        return Math.round(delay + order * stagger + noise(index + 1) * stagger * 0.6)
    }
</script>

<span class={className}>
    <span class="sr-only">{word}</span>
    <span aria-hidden="true"
        >{#each letters as letter, index (index)}{#if letter.trim() === ""}{letter}{:else}<span
                    class="letter {variant} inline-block"
                    style:--spread={index - middle}
                    style:--tilt={Math.sin(index * 1.7) * 10}
                    style:animation-delay="{delayFor(index)}ms"
                    style:animation-duration="{duration}ms">{letter}</span
                >{/if}{/each}</span
    >
</span>

<style>
    .letter {
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        animation-fill-mode: both;
    }

    .bloom {
        animation-name: bloom;
    }

    @keyframes bloom {
        from {
            opacity: 0;
            filter: blur(0.12em);
            transform: scale(0.3);
        }
    }

    .grow {
        animation-name: grow;
    }

    @keyframes grow {
        from {
            opacity: 0;
            font-weight: 100;
        }
        25% {
            opacity: 1;
        }
    }

    .focus {
        animation-name: focus;
    }

    @keyframes focus {
        from {
            opacity: 0;
            filter: blur(0.2em);
            transform: translateX(calc(var(--spread) * 0.45em));
        }
    }

    .wave {
        animation-name: wave;
        animation-timing-function: linear(
            0,
            0.009,
            0.035 2.1%,
            0.141,
            0.281 6.7%,
            0.723 12.9%,
            0.938 16.7%,
            1.017,
            1.077 20.4%,
            1.121,
            1.149 24.3%,
            1.159,
            1.163,
            1.161,
            1.154 29.9%,
            1.129 32.8%,
            1.051 39.6%,
            1.017 43.1%,
            0.991,
            0.977 51%,
            0.974 53.8%,
            0.975 57.1%,
            0.997 69.8%,
            1.003 76.9%,
            1.004 83.8%,
            1
        );
    }

    @keyframes wave {
        from {
            opacity: 0;
            transform: translateY(0.7em) rotate(calc(var(--tilt) * 1deg));
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .letter {
            animation: none;
        }
    }
</style>
