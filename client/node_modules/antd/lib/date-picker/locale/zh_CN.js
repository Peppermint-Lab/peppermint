"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _zh_CN = _interopRequireDefault(require("rc-picker/lib/locale/zh_CN"));

var _zh_CN2 = _interopRequireDefault(require("../../time-picker/locale/zh_CN"));

// 统一合并为完整的 Locale
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: '请选择日期',
    yearPlaceholder: '请选择年份',
    quarterPlaceholder: '请选择季度',
    monthPlaceholder: '请选择月份',
    weekPlaceholder: '请选择周',
    rangePlaceholder: ['开始日期', '结束日期'],
    rangeYearPlaceholder: ['开始年份', '结束年份'],
    rangeMonthPlaceholder: ['开始月份', '结束月份'],
    rangeWeekPlaceholder: ['开始周', '结束周']
  }, _zh_CN["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _zh_CN2["default"])
}; // should add whitespace between char in Button

locale.lang.ok = '确 定'; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;