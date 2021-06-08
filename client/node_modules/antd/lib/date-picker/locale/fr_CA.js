"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fr_CA = _interopRequireDefault(require("rc-picker/lib/locale/fr_CA"));

var _fr_CA2 = _interopRequireDefault(require("../../time-picker/locale/fr_CA"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Sélectionner une date',
    yearPlaceholder: 'Sélectionner une année',
    quarterPlaceholder: 'Sélectionner un trimestre',
    monthPlaceholder: 'Sélectionner un mois',
    weekPlaceholder: 'Sélectionner une semaine',
    rangePlaceholder: ['Date de début', 'Date de fin'],
    rangeYearPlaceholder: ['Année de début', 'Année de fin'],
    rangeMonthPlaceholder: ['Mois de début', 'Mois de fin'],
    rangeWeekPlaceholder: ['Semaine de début', 'Semaine de fin']
  }, _fr_CA["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _fr_CA2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;