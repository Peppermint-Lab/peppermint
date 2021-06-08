"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DECADE_COL_COUNT = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _ = require(".");

var _PanelBody = _interopRequireDefault(require("../PanelBody"));

var DECADE_COL_COUNT = 3;
exports.DECADE_COL_COUNT = DECADE_COL_COUNT;
var DECADE_ROW_COUNT = 4;

function DecadeBody(props) {
  var DECADE_UNIT_DIFF_DES = _.DECADE_UNIT_DIFF - 1;
  var prefixCls = props.prefixCls,
      viewDate = props.viewDate,
      generateConfig = props.generateConfig;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var yearNumber = generateConfig.getYear(viewDate);

  var decadeYearNumber = Math.floor(yearNumber / _.DECADE_UNIT_DIFF) * _.DECADE_UNIT_DIFF;

  var startDecadeYear = Math.floor(yearNumber / _.DECADE_DISTANCE_COUNT) * _.DECADE_DISTANCE_COUNT;

  var endDecadeYear = startDecadeYear + _.DECADE_DISTANCE_COUNT - 1;
  var baseDecadeYear = generateConfig.setYear(viewDate, startDecadeYear - Math.ceil((DECADE_COL_COUNT * DECADE_ROW_COUNT * _.DECADE_UNIT_DIFF - _.DECADE_DISTANCE_COUNT) / 2));

  var getCellClassName = function getCellClassName(date) {
    var _ref;

    var startDecadeNumber = generateConfig.getYear(date);
    var endDecadeNumber = startDecadeNumber + DECADE_UNIT_DIFF_DES;
    return _ref = {}, (0, _defineProperty2.default)(_ref, "".concat(cellPrefixCls, "-in-view"), startDecadeYear <= startDecadeNumber && endDecadeNumber <= endDecadeYear), (0, _defineProperty2.default)(_ref, "".concat(cellPrefixCls, "-selected"), startDecadeNumber === decadeYearNumber), _ref;
  };

  return /*#__PURE__*/React.createElement(_PanelBody.default, (0, _extends2.default)({}, props, {
    rowNum: DECADE_ROW_COUNT,
    colNum: DECADE_COL_COUNT,
    baseDate: baseDecadeYear,
    getCellText: function getCellText(date) {
      var startDecadeNumber = generateConfig.getYear(date);
      return "".concat(startDecadeNumber, "-").concat(startDecadeNumber + DECADE_UNIT_DIFF_DES);
    },
    getCellClassName: getCellClassName,
    getCellDate: function getCellDate(date, offset) {
      return generateConfig.addYear(date, offset * _.DECADE_UNIT_DIFF);
    }
  }));
}

var _default = DecadeBody;
exports.default = _default;