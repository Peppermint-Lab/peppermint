"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _radio = _interopRequireDefault(require("./radio"));

var _configProvider = require("../config-provider");

var _context = _interopRequireDefault(require("./context"));

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

var RadioButton = function RadioButton(props, ref) {
  var radioGroupContext = React.useContext(_context["default"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var customizePrefixCls = props.prefixCls,
      radioProps = __rest(props, ["prefixCls"]);

  var prefixCls = getPrefixCls('radio-button', customizePrefixCls);

  if (radioGroupContext) {
    radioProps.checked = props.value === radioGroupContext.value;
    radioProps.disabled = props.disabled || radioGroupContext.disabled;
  }

  return /*#__PURE__*/React.createElement(_radio["default"], (0, _extends2["default"])({
    prefixCls: prefixCls
  }, radioProps, {
    type: "radio",
    ref: ref
  }));
};

var _default = /*#__PURE__*/React.forwardRef(RadioButton);

exports["default"] = _default;