"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _path = require('path');
var _helpermoduleimports = require('@babel/helper-module-imports');
function transCamel(_str, symbol) {
  const str = _str[0].toLowerCase() + _str.substr(1);
  return str.replace(/([A-Z])/g, ($1) => `${symbol}${$1.toLowerCase()}`);
}
function winPath(path2) {
  return path2.replace(/\\/g, "/");
}
function normalizeCustomName(originCustomName) {
  if (typeof originCustomName === "string") {
    const customNameExports = require(originCustomName);
    return typeof customNameExports === "function" ? customNameExports : customNameExports.default;
  }
  return originCustomName;
}
 class Plugin {
  constructor(libraryName, libraryDirectory, style, styleLibraryDirectory, customStyleName, camel2DashComponentName, camel2UnderlineComponentName, fileName, customName, transformToDefaultImport, types, index = 0) {
    this.libraryName = libraryName;
    this.libraryDirectory = typeof libraryDirectory === "undefined" ? "lib" : libraryDirectory;
    this.camel2DashComponentName = typeof camel2DashComponentName === "undefined" ? true : camel2DashComponentName;
    this.camel2UnderlineComponentName = camel2UnderlineComponentName;
    this.style = style || false;
    this.styleLibraryDirectory = styleLibraryDirectory;
    this.customStyleName = normalizeCustomName(customStyleName);
    this.fileName = fileName || "";
    this.customName = normalizeCustomName(customName);
    this.transformToDefaultImport = typeof transformToDefaultImport === "undefined" ? true : transformToDefaultImport;
    this.types = types;
    this.pluginStateKey = `importPluginState${index}`;
  }
  getPluginState(state) {
    if (!state[this.pluginStateKey]) {
      state[this.pluginStateKey] = {};
    }
    return state[this.pluginStateKey];
  }
  importMethod(methodName, file, pluginState) {
    if (!pluginState.selectedMethods[methodName]) {
      const {style, libraryDirectory} = this;
      const transformedMethodName = this.camel2UnderlineComponentName ? transCamel(methodName, "_") : this.camel2DashComponentName ? transCamel(methodName, "-") : methodName;
      const path2 = winPath(this.customName ? this.customName(transformedMethodName, file) : _path.join.call(void 0, this.libraryName, libraryDirectory, transformedMethodName, this.fileName));
      pluginState.selectedMethods[methodName] = this.transformToDefaultImport ? _helpermoduleimports.addDefault.call(void 0, file.path, path2, {nameHint: methodName}) : _helpermoduleimports.addNamed.call(void 0, file.path, methodName, path2);
      if (this.customStyleName) {
        const stylePath = winPath(this.customStyleName(transformedMethodName));
        _helpermoduleimports.addSideEffect.call(void 0, file.path, `${stylePath}`);
      } else if (this.styleLibraryDirectory) {
        const stylePath = winPath(_path.join.call(void 0, this.libraryName, this.styleLibraryDirectory, transformedMethodName, this.fileName));
        _helpermoduleimports.addSideEffect.call(void 0, file.path, `${stylePath}`);
      } else if (style === true) {
        _helpermoduleimports.addSideEffect.call(void 0, file.path, `${path2}/style`);
      } else if (style === "css") {
        _helpermoduleimports.addSideEffect.call(void 0, file.path, `${path2}/style/css`);
      } else if (typeof style === "function") {
        const stylePath = style(path2, file);
        if (stylePath) {
          _helpermoduleimports.addSideEffect.call(void 0, file.path, stylePath);
        }
      }
    }
    return {...pluginState.selectedMethods[methodName]};
  }
  buildExpressionHandler(node, props, path2, state) {
    const file = path2 && path2.hub && path2.hub.file || state && state.file;
    const {types} = this;
    const pluginState = this.getPluginState(state);
    props.forEach((prop) => {
      if (!types.isIdentifier(node[prop]))
        return;
      if (pluginState.specified[node[prop].name] && types.isImportSpecifier(path2.scope.getBinding(node[prop].name).path)) {
        node[prop] = this.importMethod(pluginState.specified[node[prop].name], file, pluginState);
      }
    });
  }
  buildDeclaratorHandler(node, prop, path2, state) {
    const file = path2 && path2.hub && path2.hub.file || state && state.file;
    const {types} = this;
    const pluginState = this.getPluginState(state);
    const checkScope = (targetNode) => pluginState.specified[targetNode.name] && path2.scope.hasBinding(targetNode.name) && path2.scope.getBinding(targetNode.name).path.type === "ImportSpecifier";
    if (types.isIdentifier(node[prop]) && checkScope(node[prop])) {
      node[prop] = this.importMethod(pluginState.specified[node[prop].name], file, pluginState);
    } else if (types.isSequenceExpression(node[prop])) {
      node[prop].expressions.forEach((expressionNode, index) => {
        if (types.isIdentifier(expressionNode) && checkScope(expressionNode)) {
          node[prop].expressions[index] = this.importMethod(pluginState.specified[expressionNode.name], file, pluginState);
        }
      });
    }
  }
  ProgramEnter(path2, state) {
    const pluginState = this.getPluginState(state);
    pluginState.specified = Object.create(null);
    pluginState.libraryObjs = Object.create(null);
    pluginState.selectedMethods = Object.create(null);
    pluginState.pathsToRemove = [];
  }
  ProgramExit(path2, state) {
    this.getPluginState(state).pathsToRemove.forEach((p) => !p.removed && p.remove());
  }
  ImportDeclaration(path2, state) {
    const {node} = path2;
    if (!node)
      return;
    const {value} = node.source;
    const {libraryName} = this;
    const {types} = this;
    const pluginState = this.getPluginState(state);
    if (value === libraryName) {
      node.specifiers.forEach((spec) => {
        if (types.isImportSpecifier(spec)) {
          pluginState.specified[spec.local.name] = spec.imported.name;
        } else {
          pluginState.libraryObjs[spec.local.name] = true;
        }
      });
      pluginState.pathsToRemove.push(path2);
    }
  }
  CallExpression(path2, state) {
    const {node} = path2;
    const file = path2 && path2.hub && path2.hub.file || state && state.file;
    const {name} = node.callee;
    const {types} = this;
    const pluginState = this.getPluginState(state);
    if (types.isIdentifier(node.callee)) {
      if (pluginState.specified[name]) {
        node.callee = this.importMethod(pluginState.specified[name], file, pluginState);
      }
    }
    node.arguments = node.arguments.map((arg) => {
      const {name: argName} = arg;
      if (pluginState.specified[argName] && path2.scope.hasBinding(argName) && path2.scope.getBinding(argName).path.type === "ImportSpecifier") {
        return this.importMethod(pluginState.specified[argName], file, pluginState);
      }
      return arg;
    });
  }
  MemberExpression(path2, state) {
    const {node} = path2;
    const file = path2 && path2.hub && path2.hub.file || state && state.file;
    const pluginState = this.getPluginState(state);
    if (!node.object || !node.object.name)
      return;
    if (pluginState.libraryObjs[node.object.name]) {
      path2.replaceWith(this.importMethod(node.property.name, file, pluginState));
    } else if (pluginState.specified[node.object.name] && path2.scope.hasBinding(node.object.name)) {
      const {scope} = path2.scope.getBinding(node.object.name);
      if (scope.path.parent.type === "File") {
        node.object = this.importMethod(pluginState.specified[node.object.name], file, pluginState);
      }
    }
  }
  Property(path2, state) {
    const {node} = path2;
    this.buildDeclaratorHandler(node, "value", path2, state);
  }
  VariableDeclarator(path2, state) {
    const {node} = path2;
    this.buildDeclaratorHandler(node, "init", path2, state);
  }
  ArrayExpression(path2, state) {
    const {node} = path2;
    const props = node.elements.map((_, index) => index);
    this.buildExpressionHandler(node.elements, props, path2, state);
  }
  LogicalExpression(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["left", "right"], path2, state);
  }
  ConditionalExpression(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["test", "consequent", "alternate"], path2, state);
  }
  IfStatement(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["test"], path2, state);
    this.buildExpressionHandler(node.test, ["left", "right"], path2, state);
  }
  ExpressionStatement(path2, state) {
    const {node} = path2;
    const {types} = this;
    if (types.isAssignmentExpression(node.expression)) {
      this.buildExpressionHandler(node.expression, ["right"], path2, state);
    }
  }
  ReturnStatement(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["argument"], path2, state);
  }
  ExportDefaultDeclaration(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["declaration"], path2, state);
  }
  BinaryExpression(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["left", "right"], path2, state);
  }
  NewExpression(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["callee", "arguments"], path2, state);
  }
  SwitchStatement(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["discriminant"], path2, state);
  }
  SwitchCase(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["test"], path2, state);
  }
  ClassDeclaration(path2, state) {
    const {node} = path2;
    this.buildExpressionHandler(node, ["superClass"], path2, state);
  }
} exports.default = Plugin;
