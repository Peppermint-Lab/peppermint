const removeImports = require("next-remove-imports")();
const nextTranslate = require("next-translate");

module.exports = removeImports({
  reactStrictMode: true,
  swcMinify: true,
  ...nextTranslate(),

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5003/api/v1/:path*",
      },
    ];
  },
});
