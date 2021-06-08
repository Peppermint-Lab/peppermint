"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnKey = getColumnKey;
exports.getColumnPos = getColumnPos;
exports.renderColumnTitle = renderColumnTitle;

function getColumnKey(column, defaultKey) {
  if ('key' in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }

  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex;
  }

  return defaultKey;
}

function getColumnPos(index, pos) {
  return pos ? "".concat(pos, "-").concat(index) : "".concat(index);
}

function renderColumnTitle(title, props) {
  if (typeof title === 'function') {
    return title(props);
  }

  return title;
}