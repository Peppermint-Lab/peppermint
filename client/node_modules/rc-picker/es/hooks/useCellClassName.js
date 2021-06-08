import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { isInRange } from '../utils/dateUtil';
import { getValue } from '../utils/miscUtil';
export default function useCellClassName(_ref) {
  var cellPrefixCls = _ref.cellPrefixCls,
      generateConfig = _ref.generateConfig,
      rangedValue = _ref.rangedValue,
      hoverRangedValue = _ref.hoverRangedValue,
      isInView = _ref.isInView,
      isSameCell = _ref.isSameCell,
      offsetCell = _ref.offsetCell,
      today = _ref.today,
      value = _ref.value;

  function getClassName(currentDate) {
    var _ref2;

    var prevDate = offsetCell(currentDate, -1);
    var nextDate = offsetCell(currentDate, 1);
    var rangeStart = getValue(rangedValue, 0);
    var rangeEnd = getValue(rangedValue, 1);
    var hoverStart = getValue(hoverRangedValue, 0);
    var hoverEnd = getValue(hoverRangedValue, 1);
    var isRangeHovered = isInRange(generateConfig, hoverStart, hoverEnd, currentDate);

    function isRangeStart(date) {
      return isSameCell(rangeStart, date);
    }

    function isRangeEnd(date) {
      return isSameCell(rangeEnd, date);
    }

    var isHoverStart = isSameCell(hoverStart, currentDate);
    var isHoverEnd = isSameCell(hoverEnd, currentDate);
    var isHoverEdgeStart = (isRangeHovered || isHoverEnd) && (!isInView(prevDate) || isRangeEnd(prevDate));
    var isHoverEdgeEnd = (isRangeHovered || isHoverStart) && (!isInView(nextDate) || isRangeStart(nextDate));
    return _ref2 = {}, _defineProperty(_ref2, "".concat(cellPrefixCls, "-in-view"), isInView(currentDate)), _defineProperty(_ref2, "".concat(cellPrefixCls, "-in-range"), isInRange(generateConfig, rangeStart, rangeEnd, currentDate)), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-start"), isRangeStart(currentDate)), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-end"), isRangeEnd(currentDate)), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-start-single"), isRangeStart(currentDate) && !rangeEnd), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-end-single"), isRangeEnd(currentDate) && !rangeStart), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-start-near-hover"), isRangeStart(currentDate) && (isSameCell(prevDate, hoverStart) || isInRange(generateConfig, hoverStart, hoverEnd, prevDate))), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-end-near-hover"), isRangeEnd(currentDate) && (isSameCell(nextDate, hoverEnd) || isInRange(generateConfig, hoverStart, hoverEnd, nextDate))), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-hover"), isRangeHovered), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-hover-start"), isHoverStart), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-hover-end"), isHoverEnd), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-hover-edge-start"), isHoverEdgeStart), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-hover-edge-end"), isHoverEdgeEnd), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-hover-edge-start-near-range"), isHoverEdgeStart && isSameCell(prevDate, rangeEnd)), _defineProperty(_ref2, "".concat(cellPrefixCls, "-range-hover-edge-end-near-range"), isHoverEdgeEnd && isSameCell(nextDate, rangeStart)), _defineProperty(_ref2, "".concat(cellPrefixCls, "-today"), isSameCell(today, currentDate)), _defineProperty(_ref2, "".concat(cellPrefixCls, "-selected"), isSameCell(value, currentDate)), _ref2;
  }

  return getClassName;
}