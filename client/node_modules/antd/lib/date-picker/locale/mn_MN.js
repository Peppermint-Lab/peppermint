"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _mn_MN = _interopRequireDefault(require("rc-picker/lib/locale/mn_MN"));

var _mn_MN2 = _interopRequireDefault(require("../../time-picker/locale/mn_MN"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Огноо сонгох',
    rangePlaceholder: ['Эхлэх огноо', 'Дуусах огноо']
  }, _mn_MN["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _mn_MN2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;