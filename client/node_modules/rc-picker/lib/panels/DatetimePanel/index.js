"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _DatePanel = _interopRequireDefault(require("../DatePanel"));

var _TimePanel = _interopRequireDefault(require("../TimePanel"));

var _miscUtil = require("../../utils/miscUtil");

var _timeUtil = require("../../utils/timeUtil");

var ACTIVE_PANEL = (0, _miscUtil.tuple)('date', 'time');

function DatetimePanel(props) {
  var prefixCls = props.prefixCls,
      operationRef = props.operationRef,
      generateConfig = props.generateConfig,
      value = props.value,
      defaultValue = props.defaultValue,
      disabledTime = props.disabledTime,
      showTime = props.showTime,
      onSelect = props.onSelect;
  var panelPrefixCls = "".concat(prefixCls, "-datetime-panel");

  var _React$useState = React.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      activePanel = _React$useState2[0],
      setActivePanel = _React$useState2[1];

  var dateOperationRef = React.useRef({});
  var timeOperationRef = React.useRef({});
  var timeProps = (0, _typeof2.default)(showTime) === 'object' ? (0, _objectSpread2.default)({}, showTime) : {}; // ======================= Keyboard =======================

  function getNextActive(offset) {
    var activeIndex = ACTIVE_PANEL.indexOf(activePanel) + offset;
    var nextActivePanel = ACTIVE_PANEL[activeIndex] || null;
    return nextActivePanel;
  }

  var onBlur = function onBlur(e) {
    if (timeOperationRef.current.onBlur) {
      timeOperationRef.current.onBlur(e);
    }

    setActivePanel(null);
  };

  operationRef.current = {
    onKeyDown: function onKeyDown(event) {
      // Switch active panel
      if (event.which === _KeyCode.default.TAB) {
        var nextActivePanel = getNextActive(event.shiftKey ? -1 : 1);
        setActivePanel(nextActivePanel);

        if (nextActivePanel) {
          event.preventDefault();
        }

        return true;
      } // Operate on current active panel


      if (activePanel) {
        var ref = activePanel === 'date' ? dateOperationRef : timeOperationRef;

        if (ref.current && ref.current.onKeyDown) {
          ref.current.onKeyDown(event);
        }

        return true;
      } // Switch first active panel if operate without panel


      if ([_KeyCode.default.LEFT, _KeyCode.default.RIGHT, _KeyCode.default.UP, _KeyCode.default.DOWN].includes(event.which)) {
        setActivePanel('date');
        return true;
      }

      return false;
    },
    onBlur: onBlur,
    onClose: onBlur
  }; // ======================== Events ========================

  var onInternalSelect = function onInternalSelect(date, source) {
    var selectedDate = date;

    if (source === 'date' && !value && timeProps.defaultValue) {
      // Date with time defaultValue
      selectedDate = generateConfig.setHour(selectedDate, generateConfig.getHour(timeProps.defaultValue));
      selectedDate = generateConfig.setMinute(selectedDate, generateConfig.getMinute(timeProps.defaultValue));
      selectedDate = generateConfig.setSecond(selectedDate, generateConfig.getSecond(timeProps.defaultValue));
    } else if (source === 'time' && !value && defaultValue) {
      selectedDate = generateConfig.setYear(selectedDate, generateConfig.getYear(defaultValue));
      selectedDate = generateConfig.setMonth(selectedDate, generateConfig.getMonth(defaultValue));
      selectedDate = generateConfig.setDate(selectedDate, generateConfig.getDate(defaultValue));
    }

    if (onSelect) {
      onSelect(selectedDate, 'mouse');
    }
  }; // ======================== Render ========================


  var disabledTimes = disabledTime ? disabledTime(value || null) : {};
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(panelPrefixCls, (0, _defineProperty2.default)({}, "".concat(panelPrefixCls, "-active"), activePanel))
  }, /*#__PURE__*/React.createElement(_DatePanel.default, (0, _extends2.default)({}, props, {
    operationRef: dateOperationRef,
    active: activePanel === 'date',
    onSelect: function onSelect(date) {
      onInternalSelect((0, _timeUtil.setDateTime)(generateConfig, date, showTime && (0, _typeof2.default)(showTime) === 'object' ? showTime.defaultValue : null), 'date');
    }
  })), /*#__PURE__*/React.createElement(_TimePanel.default, (0, _extends2.default)({}, props, {
    format: undefined
  }, timeProps, disabledTimes, {
    defaultValue: undefined,
    operationRef: timeOperationRef,
    active: activePanel === 'time',
    onSelect: function onSelect(date) {
      onInternalSelect(date, 'time');
    }
  })));
}

var _default = DatetimePanel;
exports.default = _default;