"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Header = _interopRequireDefault(require("../Header"));

var _PanelContext = _interopRequireDefault(require("../../PanelContext"));

var _dateUtil = require("../../utils/dateUtil");

function QuarterHeader(props) {
  var prefixCls = props.prefixCls,
      generateConfig = props.generateConfig,
      locale = props.locale,
      viewDate = props.viewDate,
      onNextYear = props.onNextYear,
      onPrevYear = props.onPrevYear,
      onYearClick = props.onYearClick;

  var _React$useContext = React.useContext(_PanelContext.default),
      hideHeader = _React$useContext.hideHeader;

  if (hideHeader) {
    return null;
  }

  var headerPrefixCls = "".concat(prefixCls, "-header");
  return /*#__PURE__*/React.createElement(_Header.default, (0, _extends2.default)({}, props, {
    prefixCls: headerPrefixCls,
    onSuperPrev: onPrevYear,
    onSuperNext: onNextYear
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onYearClick,
    className: "".concat(prefixCls, "-year-btn")
  }, (0, _dateUtil.formatValue)(viewDate, {
    locale: locale,
    format: locale.yearFormat,
    generateConfig: generateConfig
  })));
}

var _default = QuarterHeader;
exports.default = _default;