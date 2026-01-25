import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // MD2.com inspired color palette + logo colors
        "warm-white": "#f5f3f0", // Cream/off-white
        "cream": "#f5f3f0",
        "charcoal": "#2c2c2c", // Dark grey/charcoal
        "charcoal-light": "#3a3a3a",
        "navy": "#1a2332", // Dark navy blue (from logo)
        "navy-light": "#2a3444",
        "grey": "#6b6a67", // Medium grey
        "grey-light": "#9b9a97",
        "text-muted": "#6b6a67",
        "text-subtle": "#9b9a97",
        accent: "#1a2332", // Navy as accent
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        wide: "0.05em",
        wider: "0.1em",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "1.9",
      },
    },
  },
  plugins: [],
};
export default config;
