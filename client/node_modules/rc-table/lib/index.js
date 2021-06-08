"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Summary", {
  enumerable: true,
  get: function get() {
    return _Footer.FooterComponents;
  }
});
Object.defineProperty(exports, "Column", {
  enumerable: true,
  get: function get() {
    return _Column.default;
  }
});
Object.defineProperty(exports, "ColumnGroup", {
  enumerable: true,
  get: function get() {
    return _ColumnGroup.default;
  }
});
Object.defineProperty(exports, "INTERNAL_COL_DEFINE", {
  enumerable: true,
  get: function get() {
    return _legacyUtil.INTERNAL_COL_DEFINE;
  }
});
exports.default = void 0;

var _Table = _interopRequireDefault(require("./Table"));

var _Footer = require("./Footer");

var _Column = _interopRequireDefault(require("./sugar/Column"));

var _ColumnGroup = _interopRequireDefault(require("./sugar/ColumnGroup"));

var _legacyUtil = require("./utils/legacyUtil");

var _default = _Table.default;
exports.default = _default;