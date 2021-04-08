// craco.config.js
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [{ plugin: CracoAntDesignPlugin }],
};

module.exports = {
  style: {
      postcss: {
          plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
          ],
      },
  }
}