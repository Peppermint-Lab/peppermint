"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _context = require("../config-provider/context");

var _skeleton = _interopRequireDefault(require("../skeleton"));

var _Number = _interopRequireDefault(require("./Number"));

var Statistic = function Statistic(props) {
  var prefixCls = props.prefixCls,
      className = props.className,
      style = props.style,
      valueStyle = props.valueStyle,
      _props$value = props.value,
      value = _props$value === void 0 ? 0 : _props$value,
      title = props.title,
      valueRender = props.valueRender,
      prefix = props.prefix,
      suffix = props.suffix,
      loading = props.loading,
      direction = props.direction,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave;
  var valueNode = /*#__PURE__*/React.createElement(_Number["default"], (0, _extends2["default"])({}, props, {
    value: value
  }));
  var cls = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: style,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title), /*#__PURE__*/React.createElement(_skeleton["default"], {
    paragraph: false,
    loading: loading
  }, /*#__PURE__*/React.createElement("div", {
    style: valueStyle,
    className: "".concat(prefixCls, "-content")
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-prefix")
  }, prefix), valueRender ? valueRender(valueNode) : valueNode, suffix && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-suffix")
  }, suffix))));
};

Statistic.defaultProps = {
  decimalSeparator: '.',
  groupSeparator: ',',
  loading: false
};
var WrapperStatistic = (0, _context.withConfigConsumer)({
  prefixCls: 'statistic'
})(Statistic);
var _default = WrapperStatistic;
exports["default"] = _default;