import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import YearHeader from './YearHeader';
import YearBody, { YEAR_COL_COUNT } from './YearBody';
import { createKeyDownHandler } from '../../utils/uiUtil';
export var YEAR_DECADE_COUNT = 10;

function YearPanel(props) {
  var prefixCls = props.prefixCls,
      operationRef = props.operationRef,
      onViewDateChange = props.onViewDateChange,
      generateConfig = props.generateConfig,
      value = props.value,
      viewDate = props.viewDate,
      sourceMode = props.sourceMode,
      _onSelect = props.onSelect,
      onPanelChange = props.onPanelChange;
  var panelPrefixCls = "".concat(prefixCls, "-year-panel"); // ======================= Keyboard =======================

  operationRef.current = {
    onKeyDown: function onKeyDown(event) {
      return createKeyDownHandler(event, {
        onLeftRight: function onLeftRight(diff) {
          _onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: function onCtrlLeftRight(diff) {
          _onSelect(generateConfig.addYear(value || viewDate, diff * YEAR_DECADE_COUNT), 'key');
        },
        onUpDown: function onUpDown(diff) {
          _onSelect(generateConfig.addYear(value || viewDate, diff * YEAR_COL_COUNT), 'key');
        },
        onEnter: function onEnter() {
          onPanelChange(sourceMode === 'date' ? 'date' : 'month', value || viewDate);
        }
      });
    }
  }; // ==================== View Operation ====================

  var onDecadeChange = function onDecadeChange(diff) {
    var newDate = generateConfig.addYear(viewDate, diff * 10);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: panelPrefixCls
  }, /*#__PURE__*/React.createElement(YearHeader, _extends({}, props, {
    prefixCls: prefixCls,
    onPrevDecade: function onPrevDecade() {
      onDecadeChange(-1);
    },
    onNextDecade: function onNextDecade() {
      onDecadeChange(1);
    },
    onDecadeClick: function onDecadeClick() {
      onPanelChange('decade', viewDate);
    }
  })), /*#__PURE__*/React.createElement(YearBody, _extends({}, props, {
    prefixCls: prefixCls,
    onSelect: function onSelect(date) {
      onPanelChange(sourceMode === 'date' ? 'date' : 'month', date);

      _onSelect(date, 'mouse');
    }
  })));
}

export default YearPanel;