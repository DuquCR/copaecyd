import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f0fe",
          100: "#c5d9fc",
          200: "#9fbffa",
          300: "#78a4f7",
          400: "#5a8ff5",
          500: "#1a365d",
          600: "#162d4e",
          700: "#11233e",
          800: "#0d1a2f",
          900: "#08101f",
        },
        accent: {
          50: "#fef9e7",
          100: "#fcefc3",
          200: "#fae49b",
          300: "#f7d873",
          400: "#f5cd4b",
          500: "#d4a017",
          600: "#b38614",
          700: "#926d10",
          800: "#71540c",
          900: "#503b08",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
