/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('./img/hero3.jpg')",
      }
    },
    fontFamily: {
      'sans': ['Lato', ...defaultTheme.fontFamily.sans],
      'montserrat': ['Montserrat', 'Lato', ...defaultTheme.fontFamily.sans]
    },
  },
  
  plugins: [],
}
