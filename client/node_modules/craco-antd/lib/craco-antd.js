const path = require("path");

// We need to mock these in tests,
// Mocking fs functions breaks a lot of things in jest
/* istanbul ignore next */
const readAntdCustomizeLess = (filename) => {
  const fs = require("fs");
  if (!fs.existsSync(filename)) return false;
  return fs.readFileSync(filename, "utf8");
};
/* istanbul ignore next */
const readAntdCustomizeJSON = (filename) => {
  const fs = require("fs");
  if (!fs.existsSync(filename)) return false;
  return fs.readFileSync(filename, "utf8");
};

const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  pluginOptions = pluginOptions || {};
  const CracoLessPlugin = require("craco-less");
  const modifyVars = {};

  // Look for antd.customize.less in the project root
  const antdCustomVarsLess = module.exports.readAntdCustomizeLess(
    pluginOptions.customizeThemeLessPath || `.${path.sep}antd.customize.less`
  );
  if (antdCustomVarsLess) {
    // Note: This isn't a Less parser, so it doesn't crash if the Less is invalid.
    // It just returns an empty object.
    const lessToJs = require("less-vars-to-js");
    const antdCustomVars = lessToJs(antdCustomVarsLess);
    Object.assign(modifyVars, antdCustomVars);
  } else {
    // Look for antd.customize.json in the project root
    const antdCustomVarsJSON = module.exports.readAntdCustomizeJSON(
      pluginOptions.customVarsJSONPath || `.${path.sep}antd.customize.json`
    );
    if (antdCustomVarsJSON) {
      let antdCustomVars;
      try {
        antdCustomVars = JSON.parse(antdCustomVarsJSON);
      } catch (e) {
        throw new Error("Could not parse JSON in antd.customize.json!\n\n" + e);
      }
      Object.assign(modifyVars, antdCustomVars);
    }
  }

  if (pluginOptions.customizeTheme) {
    Object.assign(modifyVars, pluginOptions.customizeTheme);
  }

  const lessLoaderOptions = pluginOptions.lessLoaderOptions || {};
  lessLoaderOptions.lessOptions = lessLoaderOptions.lessOptions || {};
  if (lessLoaderOptions.lessOptions.modifyVars) {
    Object.assign(modifyVars, lessLoaderOptions.lessOptions.modifyVars);
  }

  lessLoaderOptions.lessOptions.modifyVars = modifyVars;
  // javascriptEnabled: true is suggested in the Ant Design docs:
  // https://ant.design/docs/react/customize-theme#Customize-in-webpack
  lessLoaderOptions.lessOptions.javascriptEnabled = true;

  return CracoLessPlugin.overrideWebpackConfig({
    context,
    webpackConfig,
    pluginOptions: {
      styleLoaderOptions: pluginOptions.styleLoaderOptions || {},
      cssLoaderOptions: pluginOptions.cssLoaderOptions || {},
      postcssLoaderOptions: pluginOptions.postcssLoaderOptions || {},
      lessLoaderOptions,
      modifyLessRule: pluginOptions.modifyLessRule,
      miniCssExtractPluginOptions:
        pluginOptions.miniCssExtractPluginOptions || {},
    },
  });
};

module.exports = {
  readAntdCustomizeLess,
  readAntdCustomizeJSON,
  overrideWebpackConfig,
  overrideCracoConfig: ({ cracoConfig, pluginOptions }) => {
    if (!cracoConfig.babel) cracoConfig.babel = {};
    if (!cracoConfig.babel.plugins) cracoConfig.babel.plugins = [];

    const babelPluginImportOptions = {
      libraryName: "antd",
      libraryDirectory: "lib",
      style: true,
    };
    if (pluginOptions && pluginOptions.babelPluginImportOptions) {
      Object.assign(
        babelPluginImportOptions,
        pluginOptions.babelPluginImportOptions
      );
    }
    // Use `style: 'css'` to include the precompiled CSS.
    // `style: true` loads the original Less so that variables can be modified.
    // See: https://github.com/DocSpring/craco-antd/issues/3
    cracoConfig.babel.plugins.push(["import", babelPluginImportOptions]);
    return cracoConfig;
  },
};
