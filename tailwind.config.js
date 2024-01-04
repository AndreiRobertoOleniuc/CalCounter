/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./App.tsx", "./src/views/*.tsx", "./src/views/**/*.tsx", "./src/shared/components/*.tsx", ".src/shared/components/BackButton.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
}

