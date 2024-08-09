import antfu from "@antfu/eslint-config"

export default antfu({
    svelte: true,
    rules: {
        "no-undef-init": "off",
    },
    stylistic: {
        quotes: "double",
        indent: 4,
    },
    ignores: ["node_modules", ".svelte-kit", ".turbo", "dist", "build"],
})
