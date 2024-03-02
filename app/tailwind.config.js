/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "sans-serif"],
      },
    },
    boxShadow: {
      sm: "0.375rem 0.375rem 0 0 rgba(0, 0, 0, 0.5)",
      md: "0.75rem 0.75rem 0 0 rgba(0, 0, 0, 0.5)",
    },
  },
  plugins: [],
};
