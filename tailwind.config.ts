import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4fb",
          100: "#d7e5f5",
          200: "#b0cbea",
          300: "#80aada",
          400: "#4d85c6",
          500: "#2b66ab",
          600: "#1f4f8a",
          700: "#1a3f6e",
          800: "#163355",
          900: "#122942",
        },
        accent: {
          400: "#d9a441",
          500: "#c08a26",
          600: "#9c6f1c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "76rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
