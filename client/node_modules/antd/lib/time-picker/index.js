"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _datePicker = _interopRequireDefault(require("../date-picker"));

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

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

var InternalTimePicker = _datePicker["default"].TimePicker,
    InternalRangePicker = _datePicker["default"].RangePicker;
var RangePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(InternalRangePicker, (0, _extends2["default"])({}, props, {
    dropdownClassName: props.popupClassName,
    picker: "time",
    mode: undefined,
    ref: ref
  }));
});
var TimePicker = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var addon = _a.addon,
      renderExtraFooter = _a.renderExtraFooter,
      popupClassName = _a.popupClassName,
      restProps = __rest(_a, ["addon", "renderExtraFooter", "popupClassName"]);

  var internalRenderExtraFooter = React.useMemo(function () {
    if (renderExtraFooter) {
      return renderExtraFooter;
    }

    if (addon) {
      (0, _devWarning["default"])(false, 'TimePicker', '`addon` is deprecated. Please use `renderExtraFooter` instead.');
      return addon;
    }

    return undefined;
  }, [addon, renderExtraFooter]);
  return /*#__PURE__*/React.createElement(InternalTimePicker, (0, _extends2["default"])({}, restProps, {
    dropdownClassName: popupClassName,
    mode: undefined,
    ref: ref,
    renderExtraFooter: internalRenderExtraFooter
  }));
});
TimePicker.displayName = 'TimePicker';
TimePicker.RangePicker = RangePicker;
var _default = TimePicker;
exports["default"] = _default;