"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rcFieldForm = require("rc-field-form");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _configProvider = require("../config-provider");

var _context = require("./context");

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var FormList = function FormList(_a) {
  var customizePrefixCls = _a.prefixCls,
      children = _a.children,
      props = __rest(_a, ["prefixCls", "children"]);

  (0, _devWarning["default"])(!!props.name, 'Form.List', 'Miss `name` prop.');

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('form', customizePrefixCls);
  return /*#__PURE__*/React.createElement(_rcFieldForm.List, props, function (fields, operation, meta) {
    return /*#__PURE__*/React.createElement(_context.FormItemPrefixContext.Provider, {
      value: {
        prefixCls: prefixCls,
        status: 'error'
      }
    }, children(fields.map(function (field) {
      return (0, _extends2["default"])((0, _extends2["default"])({}, field), {
        fieldKey: field.key
      });
    }), operation, {
      errors: meta.errors
    }));
  });
};

var _default = FormList;
exports["default"] = _default;