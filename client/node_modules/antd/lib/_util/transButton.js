"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

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
/**
 * Wrap of sub component which need use as Button capacity (like Icon component).
 *
 * This helps accessibility reader to tread as a interactive button to operation.
 */


var inlineStyle = {
  border: 0,
  background: 'transparent',
  padding: 0,
  lineHeight: 'inherit',
  display: 'inline-block'
};
var TransButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var onKeyDown = function onKeyDown(event) {
    var keyCode = event.keyCode;

    if (keyCode === _KeyCode["default"].ENTER) {
      event.preventDefault();
    }
  };

  var onKeyUp = function onKeyUp(event) {
    var keyCode = event.keyCode;
    var onClick = props.onClick;

    if (keyCode === _KeyCode["default"].ENTER && onClick) {
      onClick();
    }
  };

  var style = props.style,
      noStyle = props.noStyle,
      disabled = props.disabled,
      restProps = __rest(props, ["style", "noStyle", "disabled"]);

  var mergedStyle = {};

  if (!noStyle) {
    mergedStyle = (0, _extends2["default"])({}, inlineStyle);
  }

  if (disabled) {
    mergedStyle.pointerEvents = 'none';
  }

  mergedStyle = (0, _extends2["default"])((0, _extends2["default"])({}, mergedStyle), style);
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    role: "button",
    tabIndex: 0,
    ref: ref
  }, restProps, {
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    style: mergedStyle
  }));
});
var _default = TransButton;
exports["default"] = _default;