/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const nextTranslate = require('next-translate');

module.exports = removeImports({
  reactStrictMode: true,
  swcMinify: true,
  ...nextTranslate()
});
