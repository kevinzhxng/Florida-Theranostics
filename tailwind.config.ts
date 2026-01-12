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
        "warm-white": "#faf9f7",
        charcoal: "#1a1918",
        "charcoal-light": "#2a2928",
        "text-muted": "#6b6a67",
        "text-subtle": "#9b9a97",
        accent: "#8b8678",
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
