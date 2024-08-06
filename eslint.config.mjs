import { resolve } from "node:path"
import process from "node:process"
import antfu from "@antfu/eslint-config"

export default antfu({
    svelte: true,
    typescript: {
        tsconfigPath: resolve(process.cwd(), "tsconfig.json"),
    },
    rules: {
        "no-undef-init": "off",
    },
    stylistic: {
        quotes: "double",
        indent: 4,
    },
})
