import type { Component } from "svelte"

import Motion from "./motion.svelte"
import {
    supportedTags,
    type MotionElementProps,
    type MotionProps,
    type MotionProxy,
    type MotionTag,
} from "./types.ts"

const isMotionTag = (key: PropertyKey): key is MotionTag => supportedTags.some((tag) => tag === key)

// Props must stay a live proxy: spreading them would read every getter once and lose reactivity.
const withTag = <T extends MotionTag>(tag: T): Component<MotionElementProps<T>> => {
    return (internals, props) =>
        Motion(
            internals,
            new Proxy(props as MotionProps<T>, {
                get: (target, key) => (key === "tag" ? tag : Reflect.get(target, key)),
                has: (target, key) => key === "tag" || Reflect.has(target, key),
                ownKeys: (target) => [
                    ...Reflect.ownKeys(target).filter((key) => key !== "tag"),
                    "tag",
                ],
                getOwnPropertyDescriptor: (target, key) =>
                    key === "tag"
                        ? { value: tag, enumerable: true, configurable: true }
                        : Reflect.getOwnPropertyDescriptor(target, key),
            }),
        )
}

const cache = new Map<MotionTag, Component<never>>()

export const M = new Proxy({} as MotionProxy, {
    get(target, key) {
        if (!isMotionTag(key)) return Reflect.get(target, key)
        let component = cache.get(key)
        if (!component) cache.set(key, (component = withTag(key)))
        return component
    },
})
