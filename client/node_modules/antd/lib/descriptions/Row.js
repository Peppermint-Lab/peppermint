"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _ = require(".");

function renderCells(items, _ref, _ref2) {
  var colon = _ref.colon,
      prefixCls = _ref.prefixCls,
      bordered = _ref.bordered;
  var component = _ref2.component,
      type = _ref2.type,
      showLabel = _ref2.showLabel,
      showContent = _ref2.showContent,
      rootLabelStyle = _ref2.labelStyle,
      rootContentStyle = _ref2.contentStyle;
  return items.map(function (_ref3, index) {
    var _ref3$props = _ref3.props,
        label = _ref3$props.label,
        children = _ref3$props.children,
        _ref3$props$prefixCls = _ref3$props.prefixCls,
        itemPrefixCls = _ref3$props$prefixCls === void 0 ? prefixCls : _ref3$props$prefixCls,
        className = _ref3$props.className,
        style = _ref3$props.style,
        labelStyle = _ref3$props.labelStyle,
        contentStyle = _ref3$props.contentStyle,
        _ref3$props$span = _ref3$props.span,
        span = _ref3$props$span === void 0 ? 1 : _ref3$props$span,
        key = _ref3.key;

    if (typeof component === 'string') {
      return /*#__PURE__*/React.createElement(_Cell["default"], {
        key: "".concat(type, "-").concat(key || index),
        className: className,
        style: style,
        labelStyle: (0, _extends2["default"])((0, _extends2["default"])({}, rootLabelStyle), labelStyle),
        contentStyle: (0, _extends2["default"])((0, _extends2["default"])({}, rootContentStyle), contentStyle),
        span: span,
        colon: colon,
        component: component,
        itemPrefixCls: itemPrefixCls,
        bordered: bordered,
        label: showLabel ? label : null,
        content: showContent ? children : null
      });
    }

    return [/*#__PURE__*/React.createElement(_Cell["default"], {
      key: "label-".concat(key || index),
      className: className,
      style: (0, _extends2["default"])((0, _extends2["default"])((0, _extends2["default"])({}, rootLabelStyle), style), labelStyle),
      span: 1,
      colon: colon,
      component: component[0],
      itemPrefixCls: itemPrefixCls,
      bordered: bordered,
      label: label
    }), /*#__PURE__*/React.createElement(_Cell["default"], {
      key: "content-".concat(key || index),
      className: className,
      style: (0, _extends2["default"])((0, _extends2["default"])((0, _extends2["default"])({}, rootContentStyle), style), contentStyle),
      span: span * 2 - 1,
      component: component[1],
      itemPrefixCls: itemPrefixCls,
      bordered: bordered,
      content: children
    })];
  });
}

var Row = function Row(props) {
  var descContext = React.useContext(_.DescriptionsContext);
  var prefixCls = props.prefixCls,
      vertical = props.vertical,
      row = props.row,
      index = props.index,
      bordered = props.bordered;

  if (vertical) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("tr", {
      key: "label-".concat(index),
      className: "".concat(prefixCls, "-row")
    }, renderCells(row, props, (0, _extends2["default"])({
      component: 'th',
      type: 'label',
      showLabel: true
    }, descContext))), /*#__PURE__*/React.createElement("tr", {
      key: "content-".concat(index),
      className: "".concat(prefixCls, "-row")
    }, renderCells(row, props, (0, _extends2["default"])({
      component: 'td',
      type: 'content',
      showContent: true
    }, descContext))));
  }

  return /*#__PURE__*/React.createElement("tr", {
    key: index,
    className: "".concat(prefixCls, "-row")
  }, renderCells(row, props, (0, _extends2["default"])({
    component: bordered ? ['th', 'td'] : 'td',
    type: 'item',
    showLabel: true,
    showContent: true
  }, descContext)));
};

var _default = Row;
exports["default"] = _default;