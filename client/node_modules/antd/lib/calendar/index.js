"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("rc-picker/lib/generate/moment"));

var _generateCalendar = _interopRequireDefault(require("./generateCalendar"));

var Calendar = (0, _generateCalendar["default"])(_moment["default"]);
var _default = Calendar;
exports["default"] = _default;