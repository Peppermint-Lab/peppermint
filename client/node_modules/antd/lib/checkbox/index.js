"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _Group = _interopRequireDefault(require("./Group"));

var Checkbox = _Checkbox["default"];
Checkbox.Group = _Group["default"];
Checkbox.__ANT_CHECKBOX = true;
var _default = Checkbox;
exports["default"] = _default;