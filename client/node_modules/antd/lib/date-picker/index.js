"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("rc-picker/lib/generate/moment"));

var _generatePicker = _interopRequireDefault(require("./generatePicker"));

var DatePicker = (0, _generatePicker["default"])(_moment["default"]);
var _default = DatePicker;
exports["default"] = _default;