"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _hi_IN = _interopRequireDefault(require("rc-picker/lib/locale/hi_IN"));

var _hi_IN2 = _interopRequireDefault(require("../../time-picker/locale/hi_IN"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'तारीख़ चुनें',
    rangePlaceholder: ['प्रारंभ तिथि', 'समाप्ति तिथि']
  }, _hi_IN["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _hi_IN2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;