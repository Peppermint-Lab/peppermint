"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DatePanel = _interopRequireDefault(require("../DatePanel"));

var _dateUtil = require("../../utils/dateUtil");

function WeekPanel(props) {
  var prefixCls = props.prefixCls,
      generateConfig = props.generateConfig,
      locale = props.locale,
      value = props.value; // Render additional column

  var cellPrefixCls = "".concat(prefixCls, "-cell");

  var prefixColumn = function prefixColumn(date) {
    return /*#__PURE__*/React.createElement("td", {
      key: "week",
      className: (0, _classnames.default)(cellPrefixCls, "".concat(cellPrefixCls, "-week"))
    }, generateConfig.locale.getWeek(locale.locale, date));
  }; // Add row className


  var rowPrefixCls = "".concat(prefixCls, "-week-panel-row");

  var rowClassName = function rowClassName(date) {
    return (0, _classnames.default)(rowPrefixCls, (0, _defineProperty2.default)({}, "".concat(rowPrefixCls, "-selected"), (0, _dateUtil.isSameWeek)(generateConfig, locale.locale, value, date)));
  };

  return /*#__PURE__*/React.createElement(_DatePanel.default, (0, _extends2.default)({}, props, {
    panelName: "week",
    prefixColumn: prefixColumn,
    rowClassName: rowClassName,
    keyboardConfig: {
      onLeftRight: null
    }
  }));
}

var _default = WeekPanel;
exports.default = _default;