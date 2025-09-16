import antfu from "@antfu/eslint-config"
import config from "@repo/eslint-config"

export default antfu(
    {
        typescript: {
            tsconfigPath: "./tsconfig.json",
        },
    },
    {
        settings: {
            "better-tailwindcss": {
                entryPoint: "./themes/base.css",
            },
        },
    },
    config,
)
