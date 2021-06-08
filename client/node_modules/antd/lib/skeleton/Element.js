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

var Element = function Element(props) {
  var _classNames, _classNames2;

  var prefixCls = props.prefixCls,
      className = props.className,
      style = props.style,
      size = props.size,
      shape = props.shape;
  var sizeCls = (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _classNames));
  var shapeCls = (0, _classnames["default"])((_classNames2 = {}, (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-circle"), shape === 'circle'), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-square"), shape === 'square'), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-round"), shape === 'round'), _classNames2));
  var sizeStyle = typeof size === 'number' ? {
    width: size,
    height: size,
    lineHeight: "".concat(size, "px")
  } : {};
  return /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames["default"])(prefixCls, sizeCls, shapeCls, className),
    style: (0, _extends2["default"])((0, _extends2["default"])({}, sizeStyle), style)
  });
};

var _default = Element;
exports["default"] = _default;