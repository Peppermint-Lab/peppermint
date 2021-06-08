import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { renderColumnTitle } from '../util';

function fillTitle(columns, columnTitleProps) {
  return columns.map(function (column) {
    var cloneColumn = _extends({}, column);

    cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);

    if ('children' in cloneColumn) {
      cloneColumn.children = fillTitle(cloneColumn.children, columnTitleProps);
    }

    return cloneColumn;
  });
}

export default function useTitleColumns(columnTitleProps) {
  var filledColumns = React.useCallback(function (columns) {
    return fillTitle(columns, columnTitleProps);
  }, [columnTitleProps]);
  return [filledColumns];
}