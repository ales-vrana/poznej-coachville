import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CoachVille brand colors (z Brand Manual v2.0)
        navy: {
          DEFAULT: "#394A82",
          50: "#f4f6fb",
          100: "#e8edf6",
          200: "#cdd6ea",
          300: "#a3b3d6",
          400: "#7388be",
          500: "#5267a5",
          600: "#394A82", // primary
          700: "#324273",
          800: "#2c3963",
          900: "#283254",
          950: "#1a2138",
        },
        teal: {
          DEFAULT: "#38C0C3",
          50: "#effcfc",
          100: "#d6f7f7",
          200: "#b1efef",
          300: "#7be0e2",
          400: "#38C0C3", // accent
          500: "#28a8ac",
          600: "#1f878b",
          700: "#1c6c70",
          800: "#1b585c",
          900: "#1b494d",
        },
        gold: {
          DEFAULT: "#BF933A",
          50: "#fbf8f0",
          100: "#f4ecd6",
          200: "#e8d6ac",
          300: "#dcb978",
          400: "#cfa14d",
          500: "#BF933A", // premium accent
          600: "#a17527",
          700: "#825a22",
          800: "#6c4a22",
          900: "#5a3e21",
        },
        cream: "#FAF9F5",
        dark: "#30302E",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Gotham", "Arial", "sans-serif"],
        display: ["var(--font-montserrat)", "Gotham", "Arial", "sans-serif"],
      },
      fontSize: {
        // Custom scale aligned with brand manual (Gotham/Montserrat UPPERCASE)
        // Pozn.: pro UPPERCASE nadpisy ne-negativní tracking (Reichenstein review).
        "hero": ["clamp(2.25rem, 7vw, 4rem)", { lineHeight: "1.05", letterSpacing: "0", fontWeight: "800" }],
        "h2": ["clamp(1.75rem, 4.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "0.01em", fontWeight: "700" }],
        "h3": ["clamp(1.25rem, 3vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "0.005em", fontWeight: "700" }],
      },
      maxWidth: {
        "content": "1200px",
        "prose-narrow": "640px",
      },
      boxShadow: {
        // Softer, premium shadows (Kennedy review)
        "soft": "0 8px 32px -16px rgba(57, 74, 130, 0.12), 0 2px 8px -4px rgba(57, 74, 130, 0.06)",
        "lifted": "0 24px 48px -16px rgba(57, 74, 130, 0.22), 0 8px 20px -8px rgba(57, 74, 130, 0.10)",
        "glow-teal": "0 0 0 4px rgba(56, 192, 195, 0.15)",
        "card-hover": "0 16px 40px -12px rgba(57, 74, 130, 0.20), 0 4px 12px -4px rgba(57, 74, 130, 0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
