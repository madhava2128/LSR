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
        sans: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        telugu: ["var(--font-telugu)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
