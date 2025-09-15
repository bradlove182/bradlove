import antfu from "@antfu/eslint-config"
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss"

export default antfu(
    {
        svelte: true,
        rules: {
            "no-undef-init": "off",
            "antfu/no-top-level-await": "off",
        },
        stylistic: {
            quotes: "double",
            indent: 4,
        },
        ignores: ["node_modules", ".svelte-kit", ".turbo", "dist", "build"],
    },
    {
        plugins: {
            "better-tailwindcss": eslintPluginBetterTailwindcss,
        },
        rules: {
            // enable all recommended rules to report a warning
            ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
            // enable all recommended rules to report an error
            ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
            // Overides
            "better-tailwindcss/enforce-consistent-line-wrapping": [
                "error",
                {
                    indent: 4,
                    printWidth: 120,
                    classesPerLine: 0,
                },
            ],
        },
    },
)
