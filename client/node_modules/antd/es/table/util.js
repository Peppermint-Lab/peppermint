export function getColumnKey(column, defaultKey) {
  if ('key' in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }

  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex;
  }

  return defaultKey;
}
export function getColumnPos(index, pos) {
  return pos ? "".concat(pos, "-").concat(index) : "".concat(index);
}
export function renderColumnTitle(title, props) {
  if (typeof title === 'function') {
    return title(props);
  }

  return title;
}