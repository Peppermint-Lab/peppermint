"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _kn_IN = _interopRequireDefault(require("rc-picker/lib/locale/kn_IN"));

var _kn_IN2 = _interopRequireDefault(require("../../time-picker/locale/kn_IN"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
    rangePlaceholder: ['ಪ್ರಾರಂಭ ದಿನಾಂಕ', 'ಅಂತಿಮ ದಿನಾಂಕ']
  }, _kn_IN["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _kn_IN2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;