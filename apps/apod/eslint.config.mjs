import antfu from "@antfu/eslint-config"
import config from "@repo/eslint-config"

export default antfu(
    {
        typescript: {
            tsconfigPath: "./tsconfig.json",
        },
    },
    config,
    {
        settings: {
            "better-tailwindcss": {
                entryPoint: "src/app.css",
            },
        },
    },
)
