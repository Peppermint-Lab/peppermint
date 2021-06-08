"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Item;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _ = require(".");

function Item(_ref) {
  var className = _ref.className,
      direction = _ref.direction,
      index = _ref.index,
      marginDirection = _ref.marginDirection,
      children = _ref.children,
      split = _ref.split,
      wrap = _ref.wrap;

  var _React$useContext = React.useContext(_.SpaceContext),
      horizontalSize = _React$useContext.horizontalSize,
      verticalSize = _React$useContext.verticalSize,
      latestIndex = _React$useContext.latestIndex;

  var style = {};

  if (direction === 'vertical') {
    if (index < latestIndex) {
      style = {
        marginBottom: horizontalSize / (split ? 2 : 1)
      };
    }
  } else {
    style = (0, _extends2["default"])((0, _extends2["default"])({}, index < latestIndex && (0, _defineProperty2["default"])({}, marginDirection, horizontalSize / (split ? 2 : 1))), wrap && {
      paddingBottom: verticalSize
    });
  }

  if (children === null || children === undefined) {
    return null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, children), index < latestIndex && split && /*#__PURE__*/React.createElement("span", {
    className: "".concat(className, "-split"),
    style: style
  }, split));
}