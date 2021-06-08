"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _ref = require("rc-util/lib/ref");

var _raf = _interopRequireDefault(require("rc-util/lib/raf"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var SliderTooltip = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var visible = props.visible;
  var innerRef = (0, React.useRef)(null);
  var rafRef = (0, React.useRef)(null);

  function cancelKeepAlign() {
    _raf["default"].cancel(rafRef.current);

    rafRef.current = null;
  }

  function keepAlign() {
    rafRef.current = (0, _raf["default"])(function () {
      var _a;

      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.forcePopupAlign();
      rafRef.current = null;
    });
  }

  React.useEffect(function () {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [visible, props.title]);
  return /*#__PURE__*/React.createElement(_tooltip["default"], (0, _extends2["default"])({
    ref: (0, _ref.composeRef)(innerRef, ref)
  }, props));
});
var _default = SliderTooltip;
exports["default"] = _default;