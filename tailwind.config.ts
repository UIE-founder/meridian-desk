import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 50: "#f4f1ea", 100: "#e7e0d2", 400: "#8a7f6c", 700: "#3a342b", 900: "#161410", 950: "#0c0b09" },
        brass: { 300: "#d4c4a0", 400: "#c4ae7a", 500: "#b8964a" },
      },
      fontFamily: {
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
