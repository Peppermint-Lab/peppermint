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

var _rcInputNumber = _interopRequireDefault(require("rc-input-number"));

var _UpOutlined = _interopRequireDefault(require("@ant-design/icons/UpOutlined"));

var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));

var _configProvider = require("../config-provider");

var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var InputNumber = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var size = React.useContext(_SizeContext["default"]);

  var className = props.className,
      customizeSize = props.size,
      customizePrefixCls = props.prefixCls,
      _props$bordered = props.bordered,
      bordered = _props$bordered === void 0 ? true : _props$bordered,
      readOnly = props.readOnly,
      others = __rest(props, ["className", "size", "prefixCls", "bordered", "readOnly"]);

  var prefixCls = getPrefixCls('input-number', customizePrefixCls);
  var upIcon = /*#__PURE__*/React.createElement(_UpOutlined["default"], {
    className: "".concat(prefixCls, "-handler-up-inner")
  });
  var downIcon = /*#__PURE__*/React.createElement(_DownOutlined["default"], {
    className: "".concat(prefixCls, "-handler-down-inner")
  });
  var mergeSize = customizeSize || size;
  var inputNumberClass = (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-lg"), mergeSize === 'large'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-sm"), mergeSize === 'small'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-readonly"), readOnly), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _classNames), className);
  return /*#__PURE__*/React.createElement(_rcInputNumber["default"], (0, _extends2["default"])({
    ref: ref,
    className: inputNumberClass,
    upHandler: upIcon,
    downHandler: downIcon,
    prefixCls: prefixCls,
    readOnly: readOnly
  }, others));
});
var _default = InputNumber;
exports["default"] = _default;