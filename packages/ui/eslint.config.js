import antfu from "@antfu/eslint-config"

export default antfu({
    svelte: true,
    typescript: {
        tsconfigPath: "tsconfig.json",
    },
    rules: {
        "no-undef-init": "off",
    },
    stylistic: {
        indent: 4,
        quotes: "double",
    },
})
