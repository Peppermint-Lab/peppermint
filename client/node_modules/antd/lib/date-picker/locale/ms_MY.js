"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ms_MY = _interopRequireDefault(require("rc-picker/lib/locale/ms_MY"));

var _ms_MY2 = _interopRequireDefault(require("../../time-picker/locale/ms_MY"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Pilih tarikh',
    rangePlaceholder: ['Tarikh mula', 'Tarikh akhir']
  }, _ms_MY["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _ms_MY2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;