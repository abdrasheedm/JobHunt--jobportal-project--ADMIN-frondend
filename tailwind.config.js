/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#F1F5F9",
        myBlue : "#000dff",
        myGreen : "#27CB8B"
      }
    },
  },
  plugins: [],
}