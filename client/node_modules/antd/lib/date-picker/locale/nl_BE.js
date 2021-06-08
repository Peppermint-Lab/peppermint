"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _nl_BE = _interopRequireDefault(require("rc-picker/lib/locale/nl_BE"));

var _nl_BE2 = _interopRequireDefault(require("../../time-picker/locale/nl_BE"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Selecteer datum',
    rangePlaceholder: ['Begin datum', 'Eind datum']
  }, _nl_BE["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _nl_BE2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;