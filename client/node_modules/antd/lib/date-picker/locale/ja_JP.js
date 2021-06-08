"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ja_JP = _interopRequireDefault(require("rc-picker/lib/locale/ja_JP"));

var _ja_JP2 = _interopRequireDefault(require("../../time-picker/locale/ja_JP"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: '日付を選択',
    rangePlaceholder: ['開始日付', '終了日付']
  }, _ja_JP["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _ja_JP2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;