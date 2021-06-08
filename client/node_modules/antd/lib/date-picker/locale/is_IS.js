"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _is_IS = _interopRequireDefault(require("rc-picker/lib/locale/is_IS"));

var _is_IS2 = _interopRequireDefault(require("../../time-picker/locale/is_IS"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Veldu dag',
    rangePlaceholder: ['Upphafsdagur', 'Lokadagur']
  }, _is_IS["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _is_IS2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;