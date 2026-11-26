import * as Cloudflare from "@alchemy.run/cloudflare"
import "alchemy/Phase"
import * as Effect from "effect/Effect"

import { controlPlaneWorker } from "../apps/control-plane/src/worker"
import { getSubdomain } from "./dns"

export class ControlPlane extends Cloudflare.Worker<ControlPlane>()(
    "ControlPlane",
    Effect.gen(function* () {
        const props = {
            main: import.meta.url,
            dev: {
                host: "127.0.0.1",
                port: 3001,
                strictPort: true,
            },
            compatibility: {
                flags: ["nodejs_compat"],
            },
            build: {
                output: {
                    // The Effect runtime's source maps dwarf the executable and stall Cloudflare uploads.
                    sourcemap: false,
                },
            },
        }

        if (globalThis.__ALCHEMY_RUNTIME__) {
            return props
        }

        const domain = yield* getSubdomain("api.proto")
        return { ...props, domain }
    }),
    controlPlaneWorker,
) {}

export const controlPlane = ControlPlane

export default ControlPlane
