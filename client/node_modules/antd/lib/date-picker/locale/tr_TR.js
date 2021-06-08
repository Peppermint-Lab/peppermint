"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _tr_TR = _interopRequireDefault(require("rc-picker/lib/locale/tr_TR"));

var _tr_TR2 = _interopRequireDefault(require("../../time-picker/locale/tr_TR"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Tarih seç',
    yearPlaceholder: 'Yıl seç',
    quarterPlaceholder: 'Çeyrek seç',
    monthPlaceholder: 'Ay seç',
    weekPlaceholder: 'Hafta seç',
    rangePlaceholder: ['Başlangıç tarihi', 'Bitiş tarihi'],
    rangeYearPlaceholder: ['Başlangıç yılı', 'Bitiş yılı'],
    rangeMonthPlaceholder: ['Başlangıç ayı', 'Bitiş ayı'],
    rangeWeekPlaceholder: ['Başlangıç haftası', 'Bitiş haftası']
  }, _tr_TR["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _tr_TR2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;