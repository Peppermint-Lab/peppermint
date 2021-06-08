"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _vi_VN = _interopRequireDefault(require("rc-picker/lib/locale/vi_VN"));

var _vi_VN2 = _interopRequireDefault(require("../../time-picker/locale/vi_VN"));

// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Chọn thời điểm',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc']
  }, _vi_VN["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _vi_VN2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;