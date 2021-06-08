"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PickerButton;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _button = _interopRequireDefault(require("../button"));

function PickerButton(props) {
  return /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({
    size: "small",
    type: "primary"
  }, props));
}