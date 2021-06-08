"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ru_RU = _interopRequireDefault(require("rc-picker/lib/locale/ru_RU"));

var _ru_RU2 = _interopRequireDefault(require("../../time-picker/locale/ru_RU"));

/** Created by Andrey Gayvoronsky on 13/04/16. */
// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Выберите дату',
    yearPlaceholder: 'Выберите год',
    quarterPlaceholder: 'Выберите квартал',
    monthPlaceholder: 'Выберите месяц',
    weekPlaceholder: 'Выберите неделю',
    rangePlaceholder: ['Начальная дата', 'Конечная дата'],
    rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
    rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
    rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя']
  }, _ru_RU["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _ru_RU2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;