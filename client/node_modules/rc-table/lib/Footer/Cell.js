"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SummaryCell;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Cell = _interopRequireDefault(require("../Cell"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

function SummaryCell(_ref) {
  var className = _ref.className,
      index = _ref.index,
      children = _ref.children,
      colSpan = _ref.colSpan,
      rowSpan = _ref.rowSpan,
      align = _ref.align;

  var _React$useContext = React.useContext(_TableContext.default),
      prefixCls = _React$useContext.prefixCls,
      fixedInfoList = _React$useContext.fixedInfoList;

  var fixedInfo = fixedInfoList[index];
  return /*#__PURE__*/React.createElement(_Cell.default, (0, _extends2.default)({
    className: className,
    index: index,
    component: "td",
    prefixCls: prefixCls,
    record: null,
    dataIndex: null,
    align: align,
    render: function render() {
      return {
        children: children,
        props: {
          colSpan: colSpan,
          rowSpan: rowSpan
        }
      };
    }
  }, fixedInfo));
}