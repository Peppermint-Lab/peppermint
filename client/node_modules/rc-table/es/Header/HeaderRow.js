import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext';
import { getCellFixedInfo } from '../utils/fixUtil';
import { getColumnsKey } from '../utils/valueUtil';

function HeaderRow(_ref) {
  var cells = _ref.cells,
      stickyOffsets = _ref.stickyOffsets,
      flattenColumns = _ref.flattenColumns,
      RowComponent = _ref.rowComponent,
      CellComponent = _ref.cellComponent,
      onHeaderRow = _ref.onHeaderRow,
      index = _ref.index;

  var _React$useContext = React.useContext(TableContext),
      prefixCls = _React$useContext.prefixCls,
      direction = _React$useContext.direction;

  var rowProps;

  if (onHeaderRow) {
    rowProps = onHeaderRow(cells.map(function (cell) {
      return cell.column;
    }), index);
  }

  var columnsKey = getColumnsKey(cells.map(function (cell) {
    return cell.column;
  }));
  return /*#__PURE__*/React.createElement(RowComponent, rowProps, cells.map(function (cell, cellIndex) {
    var column = cell.column;
    var fixedInfo = getCellFixedInfo(cell.colStart, cell.colEnd, flattenColumns, stickyOffsets, direction);
    var additionalProps;

    if (column && column.onHeaderCell) {
      additionalProps = cell.column.onHeaderCell(column);
    }

    return /*#__PURE__*/React.createElement(Cell, _extends({}, cell, {
      ellipsis: column.ellipsis,
      align: column.align,
      component: CellComponent,
      prefixCls: prefixCls,
      key: columnsKey[cellIndex]
    }, fixedInfo, {
      additionalProps: additionalProps,
      rowType: "header"
    }));
  }));
}

HeaderRow.displayName = 'HeaderRow';
export default HeaderRow;