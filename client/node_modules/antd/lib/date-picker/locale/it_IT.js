"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _it_IT = _interopRequireDefault(require("rc-picker/lib/locale/it_IT"));

var _it_IT2 = _interopRequireDefault(require("../../time-picker/locale/it_IT"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Selezionare la data',
    rangePlaceholder: ["Data d'inizio", 'Data di fine']
  }, _it_IT["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _it_IT2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;