"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useTitleColumns;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _util = require("../util");

function fillTitle(columns, columnTitleProps) {
  return columns.map(function (column) {
    var cloneColumn = (0, _extends2["default"])({}, column);
    cloneColumn.title = (0, _util.renderColumnTitle)(column.title, columnTitleProps);

    if ('children' in cloneColumn) {
      cloneColumn.children = fillTitle(cloneColumn.children, columnTitleProps);
    }

    return cloneColumn;
  });
}

function useTitleColumns(columnTitleProps) {
  var filledColumns = React.useCallback(function (columns) {
    return fillTitle(columns, columnTitleProps);
  }, [columnTitleProps]);
  return [filledColumns];
}