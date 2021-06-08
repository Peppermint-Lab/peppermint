"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _lt_LT = _interopRequireDefault(require("rc-picker/lib/locale/lt_LT"));

var _lt_LT2 = _interopRequireDefault(require("../../time-picker/locale/lt_LT"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Pasirinkite datą',
    yearPlaceholder: 'Pasirinkite metus',
    quarterPlaceholder: 'Pasirinkite ketvirtį',
    monthPlaceholder: 'Pasirinkite mėnesį',
    weekPlaceholder: 'Pasirinkite savaitę',
    rangePlaceholder: ['Pradžios data', 'Pabaigos data'],
    rangeYearPlaceholder: ['Pradžios metai', 'Pabaigos metai'],
    rangeMonthPlaceholder: ['Pradžios mėnesis', 'Pabaigos mėnesis'],
    rangeWeekPlaceholder: ['Pradžios savaitė', 'Pabaigos savaitė']
  }, _lt_LT["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _lt_LT2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;