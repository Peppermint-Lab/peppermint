  // tailwind.config.js
  const colors = require('tailwindcss/colors')

  module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
     darkMode: false, // or 'media' or 'class'
     theme: {
      extend: {
        colors: {
          'light-blue': colors.lightBlue,
          teal: colors.teal,
          cyan: colors.cyan,
          rose: colors.rose,
        }
      }
    },
     variants: {
       extend: {},
     },
     plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
     ],
   }