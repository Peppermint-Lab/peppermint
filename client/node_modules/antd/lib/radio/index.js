"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Group", {
  enumerable: true,
  get: function get() {
    return _group["default"];
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _radioButton["default"];
  }
});
exports["default"] = void 0;

var _radio = _interopRequireDefault(require("./radio"));

var _group = _interopRequireDefault(require("./group"));

var _radioButton = _interopRequireDefault(require("./radioButton"));

var Radio = _radio["default"];
Radio.Button = _radioButton["default"];
Radio.Group = _group["default"];
var _default = Radio;
exports["default"] = _default;