import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#155E59",
        "primary-hover": "#104A46",
        secondary: "#8BAF9B",
        "sage-light": "#EAF2EC",
        background: "#FAF9F6",
        surface: "#FFFFFF",
        "text-dark": "#202B29",
        "text-muted": "#5E6B66",
        "border-subtle": "#DDE5DF",
        "accent-gold": "#D6A66A",
        // Semantic aliases
        "primary-green": "#155E59",
        "accent-green": "#8BAF9B",
      },
      fontFamily: {
        lora: ["var(--font-lora)", "Georgia", "serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-lora)", "Georgia", "serif"],
        body: ["var(--font-lora)", "Georgia", "serif"],
        heading: ["var(--font-lora)", "Georgia", "serif"],
        telugu: ["var(--font-telugu)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
