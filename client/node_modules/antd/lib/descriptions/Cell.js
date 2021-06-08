"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function notEmpty(val) {
  return val !== undefined && val !== null;
}

var Cell = function Cell(_ref) {
  var itemPrefixCls = _ref.itemPrefixCls,
      component = _ref.component,
      span = _ref.span,
      className = _ref.className,
      style = _ref.style,
      labelStyle = _ref.labelStyle,
      contentStyle = _ref.contentStyle,
      bordered = _ref.bordered,
      label = _ref.label,
      content = _ref.content,
      colon = _ref.colon;
  var Component = component;

  if (bordered) {
    var _classNames;

    return /*#__PURE__*/React.createElement(Component, {
      className: (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(itemPrefixCls, "-item-label"), notEmpty(label)), (0, _defineProperty2["default"])(_classNames, "".concat(itemPrefixCls, "-item-content"), notEmpty(content)), _classNames), className),
      style: style,
      colSpan: span
    }, notEmpty(label) && /*#__PURE__*/React.createElement("span", {
      style: labelStyle
    }, label), notEmpty(content) && /*#__PURE__*/React.createElement("span", {
      style: contentStyle
    }, content));
  }

  return /*#__PURE__*/React.createElement(Component, {
    className: (0, _classnames["default"])("".concat(itemPrefixCls, "-item"), className),
    style: style,
    colSpan: span
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(itemPrefixCls, "-item-container")
  }, label && /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames["default"])("".concat(itemPrefixCls, "-item-label"), (0, _defineProperty2["default"])({}, "".concat(itemPrefixCls, "-item-no-colon"), !colon)),
    style: labelStyle
  }, label), content && /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames["default"])("".concat(itemPrefixCls, "-item-content")),
    style: contentStyle
  }, content)));
};

var _default = Cell;
exports["default"] = _default;