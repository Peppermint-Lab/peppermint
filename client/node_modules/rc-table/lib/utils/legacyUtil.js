"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpandableProps = getExpandableProps;
exports.getDataAndAriaProps = getDataAndAriaProps;
exports.INTERNAL_COL_DEFINE = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var INTERNAL_COL_DEFINE = 'RC_TABLE_INTERNAL_COL_DEFINE';
exports.INTERNAL_COL_DEFINE = INTERNAL_COL_DEFINE;

function getExpandableProps(props) {
  var expandable = props.expandable,
      legacyExpandableConfig = (0, _objectWithoutProperties2.default)(props, ["expandable"]);

  if ('expandable' in props) {
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, legacyExpandableConfig), expandable);
  }

  if (process.env.NODE_ENV !== 'production' && ['indentSize', 'expandedRowKeys', 'defaultExpandedRowKeys', 'defaultExpandAllRows', 'expandedRowRender', 'expandRowByClick', 'expandIcon', 'onExpand', 'onExpandedRowsChange', 'expandedRowClassName', 'expandIconColumnIndex'].some(function (prop) {
    return prop in props;
  })) {
    (0, _warning.default)(false, 'expanded related props have been moved into `expandable`.');
  }

  return legacyExpandableConfig;
}
/**
 * Returns only data- and aria- key/value pairs
 * @param {object} props
 */


function getDataAndAriaProps(props) {
  /* eslint-disable no-param-reassign */
  return Object.keys(props).reduce(function (memo, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      memo[key] = props[key];
    }

    return memo;
  }, {});
  /* eslint-enable */
}