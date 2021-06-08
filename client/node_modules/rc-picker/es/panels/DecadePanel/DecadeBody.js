import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { DECADE_DISTANCE_COUNT, DECADE_UNIT_DIFF } from '.';
import PanelBody from '../PanelBody';
export var DECADE_COL_COUNT = 3;
var DECADE_ROW_COUNT = 4;

function DecadeBody(props) {
  var DECADE_UNIT_DIFF_DES = DECADE_UNIT_DIFF - 1;
  var prefixCls = props.prefixCls,
      viewDate = props.viewDate,
      generateConfig = props.generateConfig;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var yearNumber = generateConfig.getYear(viewDate);
  var decadeYearNumber = Math.floor(yearNumber / DECADE_UNIT_DIFF) * DECADE_UNIT_DIFF;
  var startDecadeYear = Math.floor(yearNumber / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
  var endDecadeYear = startDecadeYear + DECADE_DISTANCE_COUNT - 1;
  var baseDecadeYear = generateConfig.setYear(viewDate, startDecadeYear - Math.ceil((DECADE_COL_COUNT * DECADE_ROW_COUNT * DECADE_UNIT_DIFF - DECADE_DISTANCE_COUNT) / 2));

  var getCellClassName = function getCellClassName(date) {
    var _ref;

    var startDecadeNumber = generateConfig.getYear(date);
    var endDecadeNumber = startDecadeNumber + DECADE_UNIT_DIFF_DES;
    return _ref = {}, _defineProperty(_ref, "".concat(cellPrefixCls, "-in-view"), startDecadeYear <= startDecadeNumber && endDecadeNumber <= endDecadeYear), _defineProperty(_ref, "".concat(cellPrefixCls, "-selected"), startDecadeNumber === decadeYearNumber), _ref;
  };

  return /*#__PURE__*/React.createElement(PanelBody, _extends({}, props, {
    rowNum: DECADE_ROW_COUNT,
    colNum: DECADE_COL_COUNT,
    baseDate: baseDecadeYear,
    getCellText: function getCellText(date) {
      var startDecadeNumber = generateConfig.getYear(date);
      return "".concat(startDecadeNumber, "-").concat(startDecadeNumber + DECADE_UNIT_DIFF_DES);
    },
    getCellClassName: getCellClassName,
    getCellDate: function getCellDate(date, offset) {
      return generateConfig.addYear(date, offset * DECADE_UNIT_DIFF);
    }
  }));
}

export default DecadeBody;