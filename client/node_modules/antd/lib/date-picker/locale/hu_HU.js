"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _hu_HU = _interopRequireDefault(require("rc-picker/lib/locale/hu_HU"));

var _hu_HU2 = _interopRequireDefault(require("../../time-picker/locale/hu_HU"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Válasszon dátumot',
    rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma']
  }, _hu_HU["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _hu_HU2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;