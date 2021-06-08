"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _configProvider = require("../config-provider");

var BreadcrumbSeparator = function BreadcrumbSeparator(_ref) {
  var children = _ref.children;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('breadcrumb');
  return /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-separator")
  }, children || '/');
};

BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;
var _default = BreadcrumbSeparator;
exports["default"] = _default;