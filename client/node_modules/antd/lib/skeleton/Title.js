"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

/* eslint-disable jsx-a11y/heading-has-content */
var Title = function Title(_ref) {
  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      width = _ref.width,
      style = _ref.style;
  return /*#__PURE__*/React.createElement("h3", {
    className: (0, _classnames["default"])(prefixCls, className),
    style: (0, _extends2["default"])({
      width: width
    }, style)
  });
};

var _default = Title;
exports["default"] = _default;