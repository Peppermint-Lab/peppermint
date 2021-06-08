"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ro_RO = _interopRequireDefault(require("rc-picker/lib/locale/ro_RO"));

var _ro_RO2 = _interopRequireDefault(require("../../time-picker/locale/ro_RO"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Selectează data',
    rangePlaceholder: ['Data start', 'Data sfârșit']
  }, _ro_RO["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _ro_RO2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;