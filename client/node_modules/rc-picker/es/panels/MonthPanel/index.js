import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import MonthHeader from './MonthHeader';
import MonthBody, { MONTH_COL_COUNT } from './MonthBody';
import { createKeyDownHandler } from '../../utils/uiUtil';

function MonthPanel(props) {
  var prefixCls = props.prefixCls,
      operationRef = props.operationRef,
      onViewDateChange = props.onViewDateChange,
      generateConfig = props.generateConfig,
      value = props.value,
      viewDate = props.viewDate,
      onPanelChange = props.onPanelChange,
      _onSelect = props.onSelect;
  var panelPrefixCls = "".concat(prefixCls, "-month-panel"); // ======================= Keyboard =======================

  operationRef.current = {
    onKeyDown: function onKeyDown(event) {
      return createKeyDownHandler(event, {
        onLeftRight: function onLeftRight(diff) {
          _onSelect(generateConfig.addMonth(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: function onCtrlLeftRight(diff) {
          _onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onUpDown: function onUpDown(diff) {
          _onSelect(generateConfig.addMonth(value || viewDate, diff * MONTH_COL_COUNT), 'key');
        },
        onEnter: function onEnter() {
          onPanelChange('date', value || viewDate);
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
  }, /*#__PURE__*/React.createElement(MonthHeader, _extends({}, props, {
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
  })), /*#__PURE__*/React.createElement(MonthBody, _extends({}, props, {
    prefixCls: prefixCls,
    onSelect: function onSelect(date) {
      _onSelect(date, 'mouse');

      onPanelChange('date', date);
    }
  })));
}

export default MonthPanel;