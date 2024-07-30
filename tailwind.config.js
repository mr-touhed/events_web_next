/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme:{
    extend:{
      colors:{
        primary:"var(--primary)",
        secondary: "var(--secondary)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}