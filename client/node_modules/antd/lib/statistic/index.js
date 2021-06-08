"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Statistic = _interopRequireDefault(require("./Statistic"));

var _Countdown = _interopRequireDefault(require("./Countdown"));

_Statistic["default"].Countdown = _Countdown["default"];
var _default = _Statistic["default"];
exports["default"] = _default;