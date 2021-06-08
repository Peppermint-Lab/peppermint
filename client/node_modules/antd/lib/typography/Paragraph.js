"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Base = _interopRequireDefault(require("./Base"));

var Paragraph = function Paragraph(props) {
  return /*#__PURE__*/React.createElement(_Base["default"], (0, _extends2["default"])({}, props, {
    component: "div"
  }));
};

var _default = Paragraph;
exports["default"] = _default;