const removeImports = require("next-remove-imports")();
const nextTranslate = require("next-translate");

module.exports = removeImports({
  reactStrictMode: true,
  swcMinify: false,
  ...nextTranslate(),

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `/:path*`,
  //     },
  //   ];
  // },

  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.plugins = [...config.plugins, new PrismaPlugin()]
  //   }

  //   return config
  // },
});
