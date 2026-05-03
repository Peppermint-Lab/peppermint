// next.config.js
const withPlugins = require('next-compose-plugins');
const removeImports = require('next-remove-imports')();
const nextTranslate = require('next-translate');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
});

module.exports = withPlugins(
  [removeImports, nextTranslate, withPWA],
  {
    reactStrictMode: false,
    swcMinify: true,
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack: (config) => {
      // Ignore prosemirror-view import error from @blocknote/core
      config.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/@blocknote/,
        resolve: { fullySpecified: false },
      });
      config.ignoreWarnings = [
        { module: /@blocknote/ },
      ];
      return config;
    },

    async rewrites() {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://localhost:5003/api/v1/:path*',
        },
      ];
    },
  }
);
