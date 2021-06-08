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
exports["default"] = void 0;

var _avatar = _interopRequireDefault(require("./avatar"));

var _group = _interopRequireDefault(require("./group"));

var Avatar = _avatar["default"];
Avatar.Group = _group["default"];
var _default = Avatar;
exports["default"] = _default;