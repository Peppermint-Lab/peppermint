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

var _ = require(".");

var _PanelContext = _interopRequireDefault(require("../../PanelContext"));

function YearHeader(props) {
  var prefixCls = props.prefixCls,
      generateConfig = props.generateConfig,
      viewDate = props.viewDate,
      onPrevDecade = props.onPrevDecade,
      onNextDecade = props.onNextDecade,
      onDecadeClick = props.onDecadeClick;

  var _React$useContext = React.useContext(_PanelContext.default),
      hideHeader = _React$useContext.hideHeader;

  if (hideHeader) {
    return null;
  }

  var headerPrefixCls = "".concat(prefixCls, "-header");
  var yearNumber = generateConfig.getYear(viewDate);

  var startYear = Math.floor(yearNumber / _.YEAR_DECADE_COUNT) * _.YEAR_DECADE_COUNT;

  var endYear = startYear + _.YEAR_DECADE_COUNT - 1;
  return /*#__PURE__*/React.createElement(_Header.default, (0, _extends2.default)({}, props, {
    prefixCls: headerPrefixCls,
    onSuperPrev: onPrevDecade,
    onSuperNext: onNextDecade
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDecadeClick,
    className: "".concat(prefixCls, "-decade-btn")
  }, startYear, "-", endYear));
}

var _default = YearHeader;
exports.default = _default;