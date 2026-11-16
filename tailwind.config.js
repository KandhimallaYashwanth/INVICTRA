/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ["DM Sans", "sans-serif"], display: ["Manrope", "sans-serif"] },
    colors: { ink: "#171323", muted: "#716b7d", violet: "#8b50c7" }
  }},
  plugins: []
}