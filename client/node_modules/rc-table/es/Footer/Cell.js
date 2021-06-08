import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext';
export default function SummaryCell(_ref) {
  var className = _ref.className,
      index = _ref.index,
      children = _ref.children,
      colSpan = _ref.colSpan,
      rowSpan = _ref.rowSpan,
      align = _ref.align;

  var _React$useContext = React.useContext(TableContext),
      prefixCls = _React$useContext.prefixCls,
      fixedInfoList = _React$useContext.fixedInfoList;

  var fixedInfo = fixedInfoList[index];
  return /*#__PURE__*/React.createElement(Cell, _extends({
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