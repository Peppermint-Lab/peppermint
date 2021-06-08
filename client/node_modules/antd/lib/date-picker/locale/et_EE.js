"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _et_EE = _interopRequireDefault(require("rc-picker/lib/locale/et_EE"));

var _et_EE2 = _interopRequireDefault(require("../../time-picker/locale/et_EE"));

// 统一合并为完整的 Locale
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Vali kuupäev',
    rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev']
  }, _et_EE["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _et_EE2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;