const fs = require('fs')
const postcss = require('postcss')
const tailwind = require('tailwindcss')
const CleanCSS = require('clean-css')

function buildDistFile(filename) {
  return postcss([
    tailwind({
      corePlugins: false,
      plugins: [require('../src/index.js')],
    }),
    require('autoprefixer'),
  ])
    .process('@tailwind utilities', {
      from: null,
      to: `./dist/${filename}.css`,
      map: false,
    })
    .then((result) => {
      fs.writeFileSync(`./dist/${filename}.css`, result.css)
      return result
    })
    .then((result) => {
      const minified = new CleanCSS().minify(result.css)
      fs.writeFileSync(`./dist/${filename}.min.css`, minified.styles)
    })
    .catch((error) => {
      console.log(error)
    })
}

console.info('Building CSS...')

Promise.all([buildDistFile('line-clamp')]).then(() => {
  console.log('Finished building CSS.')
})
