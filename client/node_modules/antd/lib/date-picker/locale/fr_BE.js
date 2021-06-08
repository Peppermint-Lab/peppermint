"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fr_BE = _interopRequireDefault(require("rc-picker/lib/locale/fr_BE"));

var _fr_BE2 = _interopRequireDefault(require("../../time-picker/locale/fr_BE"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Sélectionner une date',
    rangePlaceholder: ['Date de début', 'Date de fin']
  }, _fr_BE["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _fr_BE2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;