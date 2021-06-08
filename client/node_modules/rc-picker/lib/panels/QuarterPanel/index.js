"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _QuarterHeader = _interopRequireDefault(require("./QuarterHeader"));

var _QuarterBody = _interopRequireDefault(require("./QuarterBody"));

var _uiUtil = require("../../utils/uiUtil");

function QuarterPanel(props) {
  var prefixCls = props.prefixCls,
      operationRef = props.operationRef,
      onViewDateChange = props.onViewDateChange,
      generateConfig = props.generateConfig,
      value = props.value,
      viewDate = props.viewDate,
      onPanelChange = props.onPanelChange,
      _onSelect = props.onSelect;
  var panelPrefixCls = "".concat(prefixCls, "-quarter-panel"); // ======================= Keyboard =======================

  operationRef.current = {
    onKeyDown: function onKeyDown(event) {
      return (0, _uiUtil.createKeyDownHandler)(event, {
        onLeftRight: function onLeftRight(diff) {
          _onSelect(generateConfig.addMonth(value || viewDate, diff * 3), 'key');
        },
        onCtrlLeftRight: function onCtrlLeftRight(diff) {
          _onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onUpDown: function onUpDown(diff) {
          _onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        }
      });
    }
  }; // ==================== View Operation ====================

  var onYearChange = function onYearChange(diff) {
    var newDate = generateConfig.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: panelPrefixCls
  }, /*#__PURE__*/React.createElement(_QuarterHeader.default, (0, _extends2.default)({}, props, {
    prefixCls: prefixCls,
    onPrevYear: function onPrevYear() {
      onYearChange(-1);
    },
    onNextYear: function onNextYear() {
      onYearChange(1);
    },
    onYearClick: function onYearClick() {
      onPanelChange('year', viewDate);
    }
  })), /*#__PURE__*/React.createElement(_QuarterBody.default, (0, _extends2.default)({}, props, {
    prefixCls: prefixCls,
    onSelect: function onSelect(date) {
      _onSelect(date, 'mouse');
    }
  })));
}

var _default = QuarterPanel;
exports.default = _default;