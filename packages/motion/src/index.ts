export { M } from "./proxy.ts"
export { default as MotionProvider } from "./motion-provider.svelte"
export { default as FrameRate } from "./frame-rate.svelte"
export { MotionContext, useMotion } from "./context.svelte.ts"
export type { Watcher } from "./context.svelte.ts"
export { CursorFollow } from "./follow.ts"
export type { FollowOptions } from "./follow.ts"
export { splitLetters } from "./letters.ts"
export type { LettersOptions, MotionLetters } from "./letters.ts"
export { scrollReveal } from "./reveal.ts"
export type { RevealOptions } from "./reveal.ts"
export type {
    MotionAnimation,
    MotionElementAnimation,
    MotionElementProps,
    MotionProps,
    MotionTag,
} from "./types.ts"
