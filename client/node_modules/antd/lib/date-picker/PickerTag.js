"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PickerTag;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _tag = _interopRequireDefault(require("../tag"));

function PickerTag(props) {
  return /*#__PURE__*/React.createElement(_tag["default"], (0, _extends2["default"])({
    color: "blue"
  }, props));
}