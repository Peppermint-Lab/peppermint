"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Anchor = _interopRequireDefault(require("./Anchor"));

var _AnchorLink = _interopRequireDefault(require("./AnchorLink"));

_Anchor["default"].Link = _AnchorLink["default"];
var _default = _Anchor["default"];
exports["default"] = _default;