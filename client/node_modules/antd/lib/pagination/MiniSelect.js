"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _select = _interopRequireDefault(require("../select"));

var MiniSelect = function MiniSelect(props) {
  return /*#__PURE__*/React.createElement(_select["default"], (0, _extends2["default"])({
    size: "small"
  }, props));
};

MiniSelect.Option = _select["default"].Option;
var _default = MiniSelect;
exports["default"] = _default;