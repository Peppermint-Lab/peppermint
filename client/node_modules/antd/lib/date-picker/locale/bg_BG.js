"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _bg_BG = _interopRequireDefault(require("rc-picker/lib/locale/bg_BG"));

var _bg_BG2 = _interopRequireDefault(require("../../time-picker/locale/bg_BG"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Избор на дата',
    rangePlaceholder: ['Начална', 'Крайна']
  }, _bg_BG["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _bg_BG2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;