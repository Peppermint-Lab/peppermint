"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.YEAR_COL_COUNT = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _ = require(".");

var _useCellClassName = _interopRequireDefault(require("../../hooks/useCellClassName"));

var _dateUtil = require("../../utils/dateUtil");

var _RangeContext = _interopRequireDefault(require("../../RangeContext"));

var _PanelBody = _interopRequireDefault(require("../PanelBody"));

var YEAR_COL_COUNT = 3;
exports.YEAR_COL_COUNT = YEAR_COL_COUNT;
var YEAR_ROW_COUNT = 4;

function YearBody(props) {
  var prefixCls = props.prefixCls,
      value = props.value,
      viewDate = props.viewDate,
      locale = props.locale,
      generateConfig = props.generateConfig;

  var _React$useContext = React.useContext(_RangeContext.default),
      rangedValue = _React$useContext.rangedValue,
      hoverRangedValue = _React$useContext.hoverRangedValue;

  var yearPrefixCls = "".concat(prefixCls, "-cell"); // =============================== Year ===============================

  var yearNumber = generateConfig.getYear(viewDate);

  var startYear = Math.floor(yearNumber / _.YEAR_DECADE_COUNT) * _.YEAR_DECADE_COUNT;

  var endYear = startYear + _.YEAR_DECADE_COUNT - 1;
  var baseYear = generateConfig.setYear(viewDate, startYear - Math.ceil((YEAR_COL_COUNT * YEAR_ROW_COUNT - _.YEAR_DECADE_COUNT) / 2));

  var isInView = function isInView(date) {
    var currentYearNumber = generateConfig.getYear(date);
    return startYear <= currentYearNumber && currentYearNumber <= endYear;
  };

  var getCellClassName = (0, _useCellClassName.default)({
    cellPrefixCls: yearPrefixCls,
    value: value,
    generateConfig: generateConfig,
    rangedValue: rangedValue,
    hoverRangedValue: hoverRangedValue,
    isSameCell: function isSameCell(current, target) {
      return (0, _dateUtil.isSameYear)(generateConfig, current, target);
    },
    isInView: isInView,
    offsetCell: function offsetCell(date, offset) {
      return generateConfig.addYear(date, offset);
    }
  });
  return /*#__PURE__*/React.createElement(_PanelBody.default, (0, _extends2.default)({}, props, {
    rowNum: YEAR_ROW_COUNT,
    colNum: YEAR_COL_COUNT,
    baseDate: baseYear,
    getCellText: generateConfig.getYear,
    getCellClassName: getCellClassName,
    getCellDate: generateConfig.addYear,
    titleCell: function titleCell(date) {
      return (0, _dateUtil.formatValue)(date, {
        locale: locale,
        format: 'YYYY',
        generateConfig: generateConfig
      });
    }
  }));
}

var _default = YearBody;
exports.default = _default;