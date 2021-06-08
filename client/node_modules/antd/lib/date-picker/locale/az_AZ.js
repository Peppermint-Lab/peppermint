"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _az_AZ = _interopRequireDefault(require("rc-picker/lib/locale/az_AZ"));

var _az_AZ2 = _interopRequireDefault(require("../../time-picker/locale/az_AZ"));

var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Tarix seçin',
    rangePlaceholder: ['Başlama tarixi', 'Bitmə tarixi']
  }, _az_AZ["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _az_AZ2["default"])
};
var _default = locale;
exports["default"] = _default;