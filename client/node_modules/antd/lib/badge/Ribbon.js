"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _utils = require("./utils");

var Ribbon = function Ribbon(_ref) {
  var _classNames;

  var className = _ref.className,
      customizePrefixCls = _ref.prefixCls,
      style = _ref.style,
      color = _ref.color,
      children = _ref.children,
      text = _ref.text,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'end' : _ref$placement;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('ribbon', customizePrefixCls);
  var colorInPreset = (0, _utils.isPresetColor)(color);
  var ribbonCls = (0, _classnames["default"])(prefixCls, "".concat(prefixCls, "-placement-").concat(placement), (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-color-").concat(color), colorInPreset), _classNames), className);
  var colorStyle = {};
  var cornerColorStyle = {};

  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-wrapper")
  }, children, /*#__PURE__*/React.createElement("div", {
    className: ribbonCls,
    style: (0, _extends2["default"])((0, _extends2["default"])({}, colorStyle), style)
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-text")
  }, text), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-corner"),
    style: cornerColorStyle
  })));
};

var _default = Ribbon;
exports["default"] = _default;