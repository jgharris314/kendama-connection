/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "kenConnect-black": "#050a23",
        "kenConnect-blue": "#0c3fa7",
        "kenConnect-red": "#d60000",
        "kenConnect-yellow": "#ffe01f",
        "kenConnect-white": "#f3f6f4",
      },
    },
  },
  plugins: [],
}
