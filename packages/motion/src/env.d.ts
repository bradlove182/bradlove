/** Vite replaces this at build time, so dev-only code is dropped from production bundles. */
interface ImportMetaEnv {
    readonly DEV: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
