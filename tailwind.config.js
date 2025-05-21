/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cappiPurple: "#7e22ce", // optional custom name
        cappiPink: "#ec4899"
      }
    },
  },
  plugins: [],
}
