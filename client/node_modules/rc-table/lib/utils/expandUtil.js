"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderExpandIcon = renderExpandIcon;
exports.findAllChildrenKeys = findAllChildrenKeys;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function renderExpandIcon(_ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      record = _ref.record,
      onExpand = _ref.onExpand,
      expanded = _ref.expanded,
      expandable = _ref.expandable;
  var expandClassName = "".concat(prefixCls, "-row-expand-icon");

  if (!expandable) {
    return /*#__PURE__*/React.createElement("span", {
      className: (0, _classnames.default)(expandClassName, "".concat(prefixCls, "-row-spaced"))
    });
  }

  var onClick = function onClick(event) {
    onExpand(record, event);
    event.stopPropagation();
  };

  return /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames.default)(expandClassName, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-row-expanded"), expanded), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-row-collapsed"), !expanded), _classNames)),
    onClick: onClick
  });
}

function findAllChildrenKeys(data, getRowKey, childrenColumnName) {
  var keys = [];

  function dig(list) {
    (list || []).forEach(function (item, index) {
      keys.push(getRowKey(item, index));
      dig(item[childrenColumnName]);
    });
  }

  dig(data);
  return keys;
}