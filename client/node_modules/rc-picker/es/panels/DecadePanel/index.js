import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import DecadeHeader from './DecadeHeader';
import DecadeBody, { DECADE_COL_COUNT } from './DecadeBody';
import { createKeyDownHandler } from '../../utils/uiUtil';
export var DECADE_UNIT_DIFF = 10;
export var DECADE_DISTANCE_COUNT = DECADE_UNIT_DIFF * 10;

function DecadePanel(props) {
  var prefixCls = props.prefixCls,
      onViewDateChange = props.onViewDateChange,
      generateConfig = props.generateConfig,
      viewDate = props.viewDate,
      operationRef = props.operationRef,
      onSelect = props.onSelect,
      onPanelChange = props.onPanelChange;
  var panelPrefixCls = "".concat(prefixCls, "-decade-panel"); // ======================= Keyboard =======================

  operationRef.current = {
    onKeyDown: function onKeyDown(event) {
      return createKeyDownHandler(event, {
        onLeftRight: function onLeftRight(diff) {
          onSelect(generateConfig.addYear(viewDate, diff * DECADE_UNIT_DIFF), 'key');
        },
        onCtrlLeftRight: function onCtrlLeftRight(diff) {
          onSelect(generateConfig.addYear(viewDate, diff * DECADE_DISTANCE_COUNT), 'key');
        },
        onUpDown: function onUpDown(diff) {
          onSelect(generateConfig.addYear(viewDate, diff * DECADE_UNIT_DIFF * DECADE_COL_COUNT), 'key');
        },
        onEnter: function onEnter() {
          onPanelChange('year', viewDate);
        }
      });
    }
  }; // ==================== View Operation ====================

  var onDecadesChange = function onDecadesChange(diff) {
    var newDate = generateConfig.addYear(viewDate, diff * DECADE_DISTANCE_COUNT);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  var onInternalSelect = function onInternalSelect(date) {
    onSelect(date, 'mouse');
    onPanelChange('year', date);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: panelPrefixCls
  }, /*#__PURE__*/React.createElement(DecadeHeader, _extends({}, props, {
    prefixCls: prefixCls,
    onPrevDecades: function onPrevDecades() {
      onDecadesChange(-1);
    },
    onNextDecades: function onNextDecades() {
      onDecadesChange(1);
    }
  })), /*#__PURE__*/React.createElement(DecadeBody, _extends({}, props, {
    prefixCls: prefixCls,
    onSelect: onInternalSelect
  })));
}

export default DecadePanel;