import { defineEnvVars } from "@sveltejs/kit/env"

export const variables = defineEnvVars({
    CONTROL_PLANE_URL: {
        public: true,
        static: true,
        description: "Base URL for the public Effect control plane.",
        schema: (value) => value ?? "http://127.0.0.1:3001",
    },
})
