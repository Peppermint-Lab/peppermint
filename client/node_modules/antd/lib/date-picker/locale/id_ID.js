"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _id_ID = _interopRequireDefault(require("rc-picker/lib/locale/id_ID"));

var _id_ID2 = _interopRequireDefault(require("../../time-picker/locale/id_ID"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Pilih tanggal',
    rangePlaceholder: ['Mulai tanggal', 'Tanggal akhir']
  }, _id_ID["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _id_ID2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;