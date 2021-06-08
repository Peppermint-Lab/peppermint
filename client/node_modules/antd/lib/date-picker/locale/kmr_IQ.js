"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _kmr_IQ = _interopRequireDefault(require("rc-picker/lib/locale/kmr_IQ"));

var _kmr_IQ2 = _interopRequireDefault(require("../../time-picker/locale/kmr_IQ"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Dîrok hilbijêre',
    rangePlaceholder: ['Dîroka destpêkê', 'Dîroka dawîn']
  }, _kmr_IQ["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _kmr_IQ2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;