/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0a",
          900: "#131313",
          800: "#1f1f1f",
          700: "#2e2e2e",
          600: "#454545",
          500: "#636363",
          400: "#8a8a8a",
          300: "#b3b3b3",
          200: "#d8d8d8",
          150: "#e6e6e4",
          100: "#efefec",
          50: "#f7f7f5",
        },
        accent: {
          50: "#eef7f7",
          100: "#d7ebec",
          200: "#a9d3d6",
          300: "#7fc0c4",
          400: "#4f9da3",
          500: "#2f7d84",
          600: "#245f65",
          700: "#1c4b50",
          800: "#153a3e",
          900: "#0f2a2d",
        },
      },
      fontFamily: {
        sans: [
          "'Inter var'",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
        display: [
          "'Fraunces'",
          "'Iowan Old Style'",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(15, 23, 23, 0.04), 0 1px 1px rgba(15,23,23,0.03)",
        card: "0 4px 16px -4px rgba(15, 23, 23, 0.08), 0 2px 6px -2px rgba(15,23,23,0.05)",
        lift: "0 12px 32px -8px rgba(15, 23, 23, 0.14), 0 4px 12px -4px rgba(15,23,23,0.08)",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        fadeIn: "fadeIn 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
