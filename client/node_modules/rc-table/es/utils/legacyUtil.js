import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import warning from "rc-util/es/warning";
export var INTERNAL_COL_DEFINE = 'RC_TABLE_INTERNAL_COL_DEFINE';
export function getExpandableProps(props) {
  var expandable = props.expandable,
      legacyExpandableConfig = _objectWithoutProperties(props, ["expandable"]);

  if ('expandable' in props) {
    return _objectSpread(_objectSpread({}, legacyExpandableConfig), expandable);
  }

  if (process.env.NODE_ENV !== 'production' && ['indentSize', 'expandedRowKeys', 'defaultExpandedRowKeys', 'defaultExpandAllRows', 'expandedRowRender', 'expandRowByClick', 'expandIcon', 'onExpand', 'onExpandedRowsChange', 'expandedRowClassName', 'expandIconColumnIndex'].some(function (prop) {
    return prop in props;
  })) {
    warning(false, 'expanded related props have been moved into `expandable`.');
  }

  return legacyExpandableConfig;
}
/**
 * Returns only data- and aria- key/value pairs
 * @param {object} props
 */

export function getDataAndAriaProps(props) {
  /* eslint-disable no-param-reassign */
  return Object.keys(props).reduce(function (memo, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      memo[key] = props[key];
    }

    return memo;
  }, {});
  /* eslint-enable */
}