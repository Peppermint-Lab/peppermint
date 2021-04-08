// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: false,
  purge: false,
  theme: {
    extend: {
      opacity: ["disabled"],
      colors: {
        "light-blue": colors.lightBlue,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"), 
    require("@tailwindcss/line-clamp"),

  ],
};
