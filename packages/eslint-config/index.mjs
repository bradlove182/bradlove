import antfu from "@antfu/eslint-config"
import tailwind from "eslint-plugin-tailwindcss"

export default antfu(
    {
        svelte: true,
        rules: {
            "no-undef-init": "off",
        },
        stylistic: {
            quotes: "double",
            indent: 4,
        },
        ignores: ["node_modules", ".svelte-kit", ".turbo", "dist", "build"],
    },
    ...tailwind.configs["flat/recommended"],
    {
        settings: {
            tailwindcss: {
                callees: ["classnames", "clsx", "ctl", "cn"],
                cssFiles: [
                    "**/*.css",
                    "**/*.svelte",
                    "!**/node_modules",
                    "!**/.*",
                    "!**/dist",
                    "!**/build",
                ],
            },
        },
        rules: {
            "tailwindcss/no-custom-classname": "off",
        },
    },
)
