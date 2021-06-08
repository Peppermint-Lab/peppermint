[![Build Status](https://travis-ci.org/DocSpring/craco-less.svg?branch=master)](https://travis-ci.org/DocSpring/craco-less)
[![Coverage Status](https://coveralls.io/repos/github/DocSpring/craco-less/badge.svg?branch=master)](https://coveralls.io/github/DocSpring/craco-less?branch=master)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

# Craco Less Plugin

This is a [craco](https://github.com/sharegate/craco) plugin that adds Less support to [create-react-app](https://facebook.github.io/create-react-app/) version >= 2.

> Use [react-app-rewired](https://github.com/timarney/react-app-rewired) for `create-react-app` version 1.

## Ant Design

If you want to use [Ant Design](https://ant.design/) with `create-react-app`,
you should use the [`craco-antd`](https://github.com/FormAPI/craco-antd) plugin.
`craco-antd` includes Less and `babel-plugin-import` (to only include the required CSS.) It also makes it easy to customize the theme variables.

## Supported Versions

`craco-less` is tested with:

- `react-scripts`: `^3.2.0`
- `@craco/craco`: `^5.5.0`

## Installation

First, follow the [`craco` Installation Instructions](https://github.com/sharegate/craco/blob/master/packages/craco/README.md##installation) to install the `craco` package, create a `craco.config.js` file, and modify the scripts in your `package.json`.

Then install `craco-less`:

```bash
$ yarn add craco-less

# OR

$ npm i -S craco-less
```

## Usage

Here is a complete `craco.config.js` configuration file that adds Less compilation to `create-react-app`:

```js
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }]
};
```

## Configuration

You can pass an `options` object to configure the loaders and plugins. You can also pass a `modifyLessRule` callback to have full control over the Less webpack rule.

- `options.styleLoaderOptions`
  - _Default:_ `{}`
  - [View the `style-loader` options](https://webpack.js.org/loaders/style-loader/#options)
- `options.cssLoaderOptions`
  - _Default:_ `{ importLoaders: 2 }`
  - [View the `css-loader` options](https://webpack.js.org/loaders/css-loader/#options)
- `options.postcssLoaderOptions`
  - _Default:_ `{ ident: "postcss", plugins: () => [ ... ] }`
  - [View the `postcss-loader` options](https://webpack.js.org/loaders/postcss-loader/#options)
- `options.lessLoaderOptions`
  - _Default:_ `{}`
  - [View the `less-loader` documentation](https://webpack.js.org/loaders/less-loader/)
  - [View the Less options](http://lesscss.org/usage/#less-options)
    - You must use "camelCase" instead of "dash-case", e.g. `--source-map` => `sourceMap`
- `options.miniCssExtractPluginOptions` _(only used in production)_
  - _Default:_ `{}`
  - [View the `mini-css-extract-plugin` documentation](https://github.com/webpack-contrib/mini-css-extract-plugin)
- `options.modifyLessRule(lessRule, context)`
  - A callback function that receives two arguments: the webpack rule, and the context. You must return an updated rule object.
    - `lessRule`:
      - `test`: Regex (default: `/\.less$/`)
      - `exclude`: Regex (default: `/\.module\.(less)$/`)
      - `use`: Array of loaders and options.
    - `context`:
      - `env`: "development" or "production"
      - `paths`: An object with paths, e.g. `appBuild`, `appPath`, `ownNodeModules`

For example, to configure `less-loader`:

```js
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            "@primary-color": "#1DA57A",
            "@link-color": "#1DA57A",
            "@border-radius-base": "2px"
          },
          javascriptEnabled: true
        }
      }
    }
  ]
};
```

## CSS Modules

You can configure the [`css-loader` options](https://webpack.js.org/loaders/css-loader/#options) to set up CSS modules. For example:

```js
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: {localIdentName: '[local]_[hash:base64:5]'}
        }
      }
    }
  ]
};
```

#### CSS modules gotcha

There is a known problem with Less and [CSS modules](https://github.com/css-modules/css-modules) regarding relative file paths in `url(...)` statements. [See this issue for an explanation.](https://github.com/webpack-contrib/less-loader/issues/109#issuecomment-253797335)

> ([Copied from the less-loader README](https://github.com/webpack-contrib/less-loader#css-modules-gotcha).)

## Further Configuration

If you need to configure anything else for the webpack build, take a look at the
[Configuration Overview section in the `craco` README](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview). You can use `CracoLessPlugin` while making other changes to `babel` and `webpack`, etc.

## Contributing

Install dependencies:

```bash
$ yarn install

# OR

$ npm install
```

Run tests:

```
$ yarn test
```

Before submitting a pull request, please check the following:

- All tests are passing
  - Run `yarn test`
- 100% test coverage
  - Coverage will be printed after running tests.
  - Check the coverage results in your browser: `open coverage/lcov-report/index.html`
- No ESLint errors
  - `yarn lint`
- All code is formatted with [Prettier](https://prettier.io/)
  - `yarn format`
  - If you use VS Code, you should enable the `formatOnSave` option.
- Using the correct webpack version as a dependency
  - `yarn update_deps`
  - NOTE: The `webpack` dependency is needed to silence some annoying warnings from NPM.
    This must always match the version from `react-scripts`.

## Releasing a new version

- Make sure the "Supported Versions" section is updated at the top of the README.
- Check which files will be included in the NPM package:
  - `npm pack`
  - Update `.npmignore` to exclude any files.
- Release new version to NPM:
  - `npm publish`

## License

[MIT](./LICENSE)
