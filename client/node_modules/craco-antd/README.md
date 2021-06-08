[![Build Status](https://travis-ci.org/DocSpring/craco-antd.svg?branch=master)](https://travis-ci.org/DocSpring/craco-antd)
[![Coverage Status](https://coveralls.io/repos/github/DocSpring/craco-antd/badge.svg?branch=master)](https://coveralls.io/github/DocSpring/craco-antd?branch=master)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

### Community Maintained

We rely on your help to keep this project up to date and work with the latest versions of `craco` and `react-scripts`.

Before you send a PR, please check the following:

- 100% test coverage

```
jest --coverage --testPathIgnorePatterns test-app
```

- Code is formatted with Prettier

```
yarn prettier --write "**/*.{js,jsx,json,css,scss,html,md,yml}"
```

- No ESLint warnings

```
yarn eslint --fix --ext .js lib/
```

- No security vulnerabilities in any NPM packages

```
yarn audit
```

You are also welcome to add your GitHub username to the [Contributors](#Contributors) section at the bottom of this README. (_optional_)

### Please don't send a pull request if it does not meet the above requirements

Pull requests will be ignored and closed if there is a failing build on Travis CI.

---

# Craco Ant Design Plugin

This is a [craco](https://github.com/sharegate/craco) plugin that makes it easy to use the [Ant Design](https://ant.design/) UI library with [create-react-app](https://facebook.github.io/create-react-app/) version >= 2.

> Use [react-app-rewired](https://github.com/timarney/react-app-rewired) for `create-react-app` version 1.

`craco-antd` includes:

- Less (provided by [craco-less](https://github.com/DocSpring/craco-less))
- `babel-plugin-import` to only import the required CSS, instead of everything
- An easy way to customize the theme. Set your custom variables in `./antd.customize.less`

## Supported Versions

The latest version of `craco-antd` is tested with:

- `react-scripts`: `^3.2.0`
- `@craco/craco`: `^5.5.0`
- `craco-less`: `^1.14.4`

## Installation

First, follow the beginning of the [Ant Design `create-react-app` Documentation](https://ant.design/docs/react/use-with-create-react-app) to set up your app with Ant Design.
(Stop before the "Advanced Guides" section, because this plugin handles all of that for you.)

Then, follow the [`craco` Installation Instructions](https://github.com/sharegate/craco/blob/master/packages/craco/README.md##installation) to install the `craco` package, create a `craco.config.js` file, and modify the scripts in your `package.json`.

Then install `craco-antd` and `antd`:

```bash
$ yarn add craco-antd antd

# OR

$ npm i -S craco-antd antd
```

> `craco-antd` only has a "peer dependency" for `antd >= 3.0.0`. You should add `antd` to your own `package.json` and use a fixed version (e.g. `3.11.2`). Be careful when upgrading `antd`, because unexpected changes could break your application.

## Basic Usage

Here is a complete `craco.config.js` configuration file that sets up Less compilation and `babel-plugin-import` for `create-react-app`:

```js
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [{ plugin: CracoAntDesignPlugin }],
};
```

## Advanced Usage

Here is a production-ready `craco.config.js` file that sets up [`webpackbar`](https://github.com/nuxt/webpackbar) and [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer).
It also sets up [Preact](https://preactjs.com/) with the [`craco-preact`](https://github.com/DocSpring/craco-preact) plugin. (Preact is faster and smaller than React, and it works fine with Ant Design.)

I put my custom theme variables in `src/style/AntDesign/customTheme.less`. I also use that folder for some custom components and other CSS.

```javascript
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

// Don't open the browser during development
process.env.BROWSER = "none";

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
        ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
        : []),
    ],
  },
  plugins: [
    { plugin: require("craco-preact") },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/style/AntDesign/customTheme.less"
        ),
      },
    },
  ],
};
```

> See the [Reload Custom Variables During Development](#reload-custom-variables-during-development) section to wrap your "start" script with [`nodemon`](https://github.com/remy/nodemon).

## Customize Ant Design Theme

You can modify the default Ant Design theme by changing some Less variables.

`craco-antd` will look for variables in a Less file at `./antd.customize.less`. (You can customize this file path with the `customizeThemeLessPath` option.)

```less
// ./antd.customize.less
@primary-color: #1da57a;
@link-color: #1da57a;
```

> [Here's a list of all the variables that can be modified.](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

You can also customize these variables directly in your `craco.config.js` with the `customizeTheme` option:

```js
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#1DA57A",
          "@link-color": "#1DA57A",
        },
      },
    },
  ],
};
```

> `customizeTheme` is just an alias for the `modifyVars` option in `less-loader`.

If you use multiple options to customize the theme variables, they are merged together in the following order:

- The file at `options.customizeThemeLessPath` (default: `./antd.customize.less`)
- `options.customizeTheme`
- `options.lessLoaderOptions.modifyVars`

> For more information, see Ant Design's ["Customize Theme" documentation](https://ant.design/docs/react/customize-theme).

## Reload Custom Variables During Development

The webpack dev server needs to be restarted whenever you make a change to your custom theme variables. (It's not possible to reload this file automatically, because the variables are set in the webpack config. [I tried to fix this issue but hit a dead-end.](https://github.com/webpack-contrib/less-loader/pull/230#issuecomment-445466520))

However, you can automatically restart webpack by wrapping `craco start` with [`nodemon`](https://github.com/remy/nodemon).

Install `nodemon`:

```bash
yarn add -D nodemon

# Or globally (not recommended):

npm install -g nodemon
```

Update the "start" script in `package.json`:

```json
"scripts": {
  "start": "nodemon -w ./antd.customize.less --exec \"craco start\"",
}
```

> (Change `./antd.customize.less` if you are using a different file.)

The webpack dev server will now be restarted whenever you make a change to `./antd.customize.less`.

#### Restart Webpack When `craco.config.js` Changes

While you're here, you can also add `-w craco.config.js` to restart webpack whenever your `craco` configuration changes (`craco` doesn't do this automatically):

```json
"scripts": {
  "start": "nodemon -w craco.config.js -w ./antd.customize.less --exec \"craco start\"",
}
```

## Disable "Open In Browser"

By default, `create-react-app` will open a new browser tab every time it starts. This can be really annoying, especially if you set up the `nodemon` watcher. You can [disable this behavior with an environment variable: `BROWSER=none`](https://facebook.github.io/create-react-app/docs/advanced-configuration).

You can set this in an `.env` file:

```bash
BROWSER=none
```

I prefer to set it at the top of `craco.config.js`:

```javascript
// Don't open the browser during development
process.env.BROWSER = "none";
```

## Options

You can pass an `options` object to configure the loaders and plugins. You can also pass a `modifyLessRule` callback to have full control over the Less webpack rule.
See the [`craco-less`](https://github.com/DocSpring/craco-less#configuration) documentation for more information about these options:

- `options.styleLoaderOptions`
- `options.cssLoaderOptions`
- `options.postcssLoaderOptions`
- `options.lessLoaderOptions`
- `options.miniCssExtractPluginOptions`
- `options.modifyLessRule`

See the [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import#options) documentation for more information about this option:

- `options.babelPluginImportOptions`

Example:

```js
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: { "@primary-color": "#1DA57A" },
          strictMath: true,
          noIeCompat: true,
        },
        cssLoaderOptions: {
          modules: true,
          localIdentName: "[local]_[hash:base64:5]",
        },
        babelPluginImportOptions: {
          libraryDirectory: "es",
        },
      },
    },
  ],
};
```

## Large Bundle Size from Ant Design Icons

You can use the [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) plugin to see a breakdown of all the JS and CSS in your webpack build. Here's how to add this plugin to your `craco.config.js` configuration file:

```js
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  webpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },
  plugins: [{ plugin: require("craco-antd") }],
};
```

If you have imported any icons from Ant Design, you will see a very large (> 500KB) entry for `@ant-design/icons/lib`:

<img src="https://github.com/DocSpring/craco-antd/raw/master/img/large-ant-design-icons-lib.png" alt="Ant Design Large Icons" width="500">

This is a problem with Ant Design `v3.9.0+`, and it will be fixed in the next version. See [this GitHub issue](https://github.com/ant-design/ant-design/issues/12011) for more information. [This comment](https://github.com/ant-design/ant-design/issues/12011#issuecomment-433775872) talks about the fix, and here is [the PR](https://github.com/ant-design/ant-design/pull/12888).

In the meantime, you can [set up an import alias](https://github.com/ant-design/ant-design/issues/12011#issuecomment-423470708) and only include the required icons.

## Further Configuration

If you need to configure anything else for the webpack build, take a look at the
[Configuration Overview section in the `craco` README](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview). You can use `CracoAntDesignPlugin` while making other changes to `babel` and `webpack`, etc.

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

## Test Application

We've included a test React application in this repo, under `./test-app`.

Install dependencies:

```
cd test-app
yarn install
```

Test the app in development:

```
yarn start
```

Test the production build:

```
yarn build

# Install the "serve" package
yarn global add serve

# Serve the production build
serve -s build
```

## Releasing a new version

- Make sure the "Supported Versions" section is updated at the top of the README.
- Check which files will be included in the NPM package:
  - `npm pack`
  - Update `.npmignore` to exclude any files.
- Release new version to NPM:
  - `npm publish`

## License

[MIT](./LICENSE)

## Contributors

- [ndbroadbent](https://github.com/ndbroadbent)
- [cemremengu](https://github.com/cemremengu)
- [patricklafrance](https://github.com/patricklafrance)
- [kovyazin](https://github.com/kovyazin)
- [Vovan-VE](https://github.com/Vovan-VE)
- [pybuche](https://github.com/pybuche)
- [aitsvet](https://github.com/aitsvet)
- [daniel-hauser](https://github.com/daniel-hauser)
