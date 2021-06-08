"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _kk_KZ = _interopRequireDefault(require("rc-picker/lib/locale/kk_KZ"));

var _kk_KZ2 = _interopRequireDefault(require("../../time-picker/locale/kk_KZ"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Күнді таңдаңыз',
    yearPlaceholder: 'Жылды таңдаңыз',
    quarterPlaceholder: 'Тоқсанды таңдаңыз',
    monthPlaceholder: 'Айды таңдаңыз',
    weekPlaceholder: 'Аптаны таңдаңыз',
    rangePlaceholder: ['Бастау күні', 'Аяқталу күні'],
    rangeYearPlaceholder: ['Бастау жылы', 'Аяқталу жылы'],
    rangeMonthPlaceholder: ['Бастау айы', 'Аяқталу айы'],
    rangeWeekPlaceholder: ['Бастау апта', 'Аяқталу апта']
  }, _kk_KZ["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _kk_KZ2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;