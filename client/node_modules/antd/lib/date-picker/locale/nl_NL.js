"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _nl_NL = _interopRequireDefault(require("rc-picker/lib/locale/nl_NL"));

var _nl_NL2 = _interopRequireDefault(require("../../time-picker/locale/nl_NL"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Selecteer datum',
    rangePlaceholder: ['Begin datum', 'Eind datum']
  }, _nl_NL["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _nl_NL2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;