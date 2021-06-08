"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _assert = require('assert'); var _assert2 = _interopRequireDefault(_assert);
var _Plugin = require('./Plugin'); var _Plugin2 = _interopRequireDefault(_Plugin);
exports. default = function({types}) {
  let plugins = null;
  global.__clearBabelAntdPlugin = () => {
    plugins = null;
  };
  function applyInstance(method, args, context) {
    for (const plugin of plugins) {
      if (plugin[method]) {
        plugin[method].apply(plugin, [...args, context]);
      }
    }
  }
  const Program = {
    enter(path, {opts = {}}) {
      if (!plugins) {
        if (Array.isArray(opts)) {
          plugins = opts.map(({
            libraryName,
            libraryDirectory,
            style,
            styleLibraryDirectory,
            customStyleName,
            camel2DashComponentName,
            camel2UnderlineComponentName,
            fileName,
            customName,
            transformToDefaultImport
          }, index) => {
            _assert2.default.call(void 0, libraryName, "libraryName should be provided");
            return new (0, _Plugin2.default)(libraryName, libraryDirectory, style, styleLibraryDirectory, customStyleName, camel2DashComponentName, camel2UnderlineComponentName, fileName, customName, transformToDefaultImport, types, index);
          });
        } else {
          _assert2.default.call(void 0, opts.libraryName, "libraryName should be provided");
          plugins = [
            new (0, _Plugin2.default)(opts.libraryName, opts.libraryDirectory, opts.style, opts.styleLibraryDirectory, opts.customStyleName, opts.camel2DashComponentName, opts.camel2UnderlineComponentName, opts.fileName, opts.customName, opts.transformToDefaultImport, types)
          ];
        }
      }
      applyInstance("ProgramEnter", arguments, this);
    },
    exit() {
      applyInstance("ProgramExit", arguments, this);
    }
  };
  const methods = [
    "ImportDeclaration",
    "CallExpression",
    "MemberExpression",
    "Property",
    "VariableDeclarator",
    "ArrayExpression",
    "LogicalExpression",
    "ConditionalExpression",
    "IfStatement",
    "ExpressionStatement",
    "ReturnStatement",
    "ExportDefaultDeclaration",
    "BinaryExpression",
    "NewExpression",
    "ClassDeclaration",
    "SwitchStatement",
    "SwitchCase"
  ];
  const ret = {
    visitor: {Program}
  };
  for (const method of methods) {
    ret.visitor[method] = function() {
      applyInstance(method, arguments, ret.visitor);
    };
  }
  return ret;
}
