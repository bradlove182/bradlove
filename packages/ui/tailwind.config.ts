import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
    darkMode: ["class"],
    safelist: ["dark"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1280px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["Geist", ...fontFamily.sans],
            },
            backgroundImage: {
                "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                "slide-up": "slide-up 1s ease-in-out forwards",
                "slide-down": "slide-down 1s ease-in-out forwards",
                "disco-border": "disco 6s linear infinite",
                "spin-slow": "spin 60s linear infinite",
            },
            keyframes: {
                "slide-up": {
                    "0%": { transform: "translateY(16px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "slide-down": {
                    "0%": { transform: "translateY(-16px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "disco": {
                    "0%": { transform: "translateY(-50%) rotate(0deg)" },
                    "100%": { transform: "translateY(-50%) rotate(1turn)" },
                },
            },
        },
    },
} satisfies Partial<Config>
