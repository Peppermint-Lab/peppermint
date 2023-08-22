/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  reactStrictMode: true,
  swcMinify: true,
});