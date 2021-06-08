import _extends from "@babel/runtime/helpers/esm/extends";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import DatePicker from '../date-picker';
import devWarning from '../_util/devWarning';
var InternalTimePicker = DatePicker.TimePicker,
    InternalRangePicker = DatePicker.RangePicker;
var RangePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(InternalRangePicker, _extends({}, props, {
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
      devWarning(false, 'TimePicker', '`addon` is deprecated. Please use `renderExtraFooter` instead.');
      return addon;
    }

    return undefined;
  }, [addon, renderExtraFooter]);
  return /*#__PURE__*/React.createElement(InternalTimePicker, _extends({}, restProps, {
    dropdownClassName: popupClassName,
    mode: undefined,
    ref: ref,
    renderExtraFooter: internalRenderExtraFooter
  }));
});
TimePicker.displayName = 'TimePicker';
TimePicker.RangePicker = RangePicker;
export default TimePicker;