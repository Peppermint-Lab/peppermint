"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _da_DK = _interopRequireDefault(require("rc-picker/lib/locale/da_DK"));

var _da_DK2 = _interopRequireDefault(require("../../time-picker/locale/da_DK"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Vælg dato',
    rangePlaceholder: ['Startdato', 'Slutdato']
  }, _da_DK["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _da_DK2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;