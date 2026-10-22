import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFDF9",
        "primary-green": "#7FBF8C",
        "accent-green": "#3E7C4A",
        "text-dark": "#1F2A1F",
        "text-muted": "#6B7A6E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
        telugu: ["var(--font-telugu)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
