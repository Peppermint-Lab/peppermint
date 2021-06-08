"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _he_IL = _interopRequireDefault(require("rc-picker/lib/locale/he_IL"));

var _he_IL2 = _interopRequireDefault(require("../../time-picker/locale/he_IL"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'בחר תאריך',
    rangePlaceholder: ['תאריך התחלה', 'תאריך סיום']
  }, _he_IL["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _he_IL2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;