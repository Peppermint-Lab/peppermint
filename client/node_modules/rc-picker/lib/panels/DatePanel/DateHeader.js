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

function DateHeader(props) {
  var prefixCls = props.prefixCls,
      generateConfig = props.generateConfig,
      locale = props.locale,
      viewDate = props.viewDate,
      onNextMonth = props.onNextMonth,
      onPrevMonth = props.onPrevMonth,
      onNextYear = props.onNextYear,
      onPrevYear = props.onPrevYear,
      onYearClick = props.onYearClick,
      onMonthClick = props.onMonthClick;

  var _React$useContext = React.useContext(_PanelContext.default),
      hideHeader = _React$useContext.hideHeader;

  if (hideHeader) {
    return null;
  }

  var headerPrefixCls = "".concat(prefixCls, "-header");
  var monthsLocale = locale.shortMonths || (generateConfig.locale.getShortMonths ? generateConfig.locale.getShortMonths(locale.locale) : []);
  var month = generateConfig.getMonth(viewDate); // =================== Month & Year ===================

  var yearNode = /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: "year",
    onClick: onYearClick,
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, (0, _dateUtil.formatValue)(viewDate, {
    locale: locale,
    format: locale.yearFormat,
    generateConfig: generateConfig
  }));
  var monthNode = /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: "month",
    onClick: onMonthClick,
    tabIndex: -1,
    className: "".concat(prefixCls, "-month-btn")
  }, locale.monthFormat ? (0, _dateUtil.formatValue)(viewDate, {
    locale: locale,
    format: locale.monthFormat,
    generateConfig: generateConfig
  }) : monthsLocale[month]);
  var monthYearNodes = locale.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
  return /*#__PURE__*/React.createElement(_Header.default, (0, _extends2.default)({}, props, {
    prefixCls: headerPrefixCls,
    onSuperPrev: onPrevYear,
    onPrev: onPrevMonth,
    onNext: onNextMonth,
    onSuperNext: onNextYear
  }), monthYearNodes);
}

var _default = DateHeader;
exports.default = _default;