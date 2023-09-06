const removeImports = require('next-remove-imports')();
const nextTranslate = require('next-translate');
const TerserPlugin = require('terser-webpack-plugin');
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')



module.exports = removeImports({
  reactStrictMode: true,
  swcMinify: false,
  ...nextTranslate(),

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
  
});
