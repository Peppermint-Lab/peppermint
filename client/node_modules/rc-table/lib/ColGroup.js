"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _legacyUtil = require("./utils/legacyUtil");

function ColGroup(_ref) {
  var colWidths = _ref.colWidths,
      columns = _ref.columns,
      columCount = _ref.columCount;
  var cols = [];
  var len = columCount || columns.length; // Only insert col with width & additional props
  // Skip if rest col do not have any useful info

  var mustInsert = false;

  for (var i = len - 1; i >= 0; i -= 1) {
    var width = colWidths[i];
    var column = columns && columns[i];
    var additionalProps = column && column[_legacyUtil.INTERNAL_COL_DEFINE];

    if (width || additionalProps || mustInsert) {
      cols.unshift( /*#__PURE__*/React.createElement("col", (0, _extends2.default)({
        key: i,
        style: {
          width: width,
          minWidth: width
        }
      }, additionalProps)));
      mustInsert = true;
    }
  }

  return /*#__PURE__*/React.createElement("colgroup", null, cols);
}

var _default = ColGroup;
exports.default = _default;