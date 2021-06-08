import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useMergedState from "rc-util/es/hooks/useMergedState";
import classNames from 'classnames';
import padStart from 'lodash/padStart';
import { PickerPanel as RCPickerPanel } from 'rc-picker';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import enUS from './locale/en_US';
import { ConfigContext } from '../config-provider';
import CalendarHeader from './Header';

function generateCalendar(generateConfig) {
  function isSameYear(date1, date2) {
    return date1 && date2 && generateConfig.getYear(date1) === generateConfig.getYear(date2);
  }

  function isSameMonth(date1, date2) {
    return isSameYear(date1, date2) && generateConfig.getMonth(date1) === generateConfig.getMonth(date2);
  }

  function isSameDate(date1, date2) {
    return isSameMonth(date1, date2) && generateConfig.getDate(date1) === generateConfig.getDate(date2);
  }

  var Calendar = function Calendar(props) {
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        style = props.style,
        dateFullCellRender = props.dateFullCellRender,
        dateCellRender = props.dateCellRender,
        monthFullCellRender = props.monthFullCellRender,
        monthCellRender = props.monthCellRender,
        headerRender = props.headerRender,
        value = props.value,
        defaultValue = props.defaultValue,
        disabledDate = props.disabledDate,
        mode = props.mode,
        validRange = props.validRange,
        _props$fullscreen = props.fullscreen,
        fullscreen = _props$fullscreen === void 0 ? true : _props$fullscreen,
        onChange = props.onChange,
        onPanelChange = props.onPanelChange,
        onSelect = props.onSelect;

    var _React$useContext = React.useContext(ConfigContext),
        getPrefixCls = _React$useContext.getPrefixCls,
        direction = _React$useContext.direction;

    var prefixCls = getPrefixCls('picker', customizePrefixCls);
    var calendarPrefixCls = "".concat(prefixCls, "-calendar");
    var today = generateConfig.getNow(); // ====================== State =======================
    // Value

    var _useMergedState = useMergedState(function () {
      return value || generateConfig.getNow();
    }, {
      defaultValue: defaultValue,
      value: value
    }),
        _useMergedState2 = _slicedToArray(_useMergedState, 2),
        mergedValue = _useMergedState2[0],
        setMergedValue = _useMergedState2[1]; // Mode


    var _useMergedState3 = useMergedState('month', {
      value: mode
    }),
        _useMergedState4 = _slicedToArray(_useMergedState3, 2),
        mergedMode = _useMergedState4[0],
        setMergedMode = _useMergedState4[1];

    var panelMode = React.useMemo(function () {
      return mergedMode === 'year' ? 'month' : 'date';
    }, [mergedMode]); // Disabled Date

    var mergedDisabledDate = React.useCallback(function (date) {
      var notInRange = validRange ? generateConfig.isAfter(validRange[0], date) || generateConfig.isAfter(date, validRange[1]) : false;
      return notInRange || !!(disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date));
    }, [disabledDate, validRange]); // ====================== Events ======================

    var triggerPanelChange = function triggerPanelChange(date, newMode) {
      onPanelChange === null || onPanelChange === void 0 ? void 0 : onPanelChange(date, newMode);
    };

    var triggerChange = function triggerChange(date) {
      setMergedValue(date);

      if (!isSameDate(date, mergedValue)) {
        // Trigger when month panel switch month
        if (panelMode === 'date' && !isSameMonth(date, mergedValue) || panelMode === 'month' && !isSameYear(date, mergedValue)) {
          triggerPanelChange(date, mergedMode);
        }

        onChange === null || onChange === void 0 ? void 0 : onChange(date);
      }
    };

    var triggerModeChange = function triggerModeChange(newMode) {
      setMergedMode(newMode);
      triggerPanelChange(mergedValue, newMode);
    };

    var onInternalSelect = function onInternalSelect(date) {
      triggerChange(date);
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(date);
    }; // ====================== Locale ======================


    var getDefaultLocale = function getDefaultLocale() {
      var locale = props.locale;

      var result = _extends(_extends({}, enUS), locale);

      result.lang = _extends(_extends({}, result.lang), (locale || {}).lang);
      return result;
    }; // ====================== Render ======================


    var dateRender = React.useCallback(function (date) {
      if (dateFullCellRender) {
        return dateFullCellRender(date);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: classNames("".concat(prefixCls, "-cell-inner"), "".concat(calendarPrefixCls, "-date"), _defineProperty({}, "".concat(calendarPrefixCls, "-date-today"), isSameDate(today, date)))
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(calendarPrefixCls, "-date-value")
      }, padStart(String(generateConfig.getDate(date)), 2, '0')), /*#__PURE__*/React.createElement("div", {
        className: "".concat(calendarPrefixCls, "-date-content")
      }, dateCellRender && dateCellRender(date)));
    }, [dateFullCellRender, dateCellRender]);
    var monthRender = React.useCallback(function (date, locale) {
      if (monthFullCellRender) {
        return monthFullCellRender(date);
      }

      var months = locale.shortMonths || generateConfig.locale.getShortMonths(locale.locale);
      return /*#__PURE__*/React.createElement("div", {
        className: classNames("".concat(prefixCls, "-cell-inner"), "".concat(calendarPrefixCls, "-date"), _defineProperty({}, "".concat(calendarPrefixCls, "-date-today"), isSameMonth(today, date)))
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(calendarPrefixCls, "-date-value")
      }, months[generateConfig.getMonth(date)]), /*#__PURE__*/React.createElement("div", {
        className: "".concat(calendarPrefixCls, "-date-content")
      }, monthCellRender && monthCellRender(date)));
    }, [monthFullCellRender, monthCellRender]);
    return /*#__PURE__*/React.createElement(LocaleReceiver, {
      componentName: "Calendar",
      defaultLocale: getDefaultLocale
    }, function (mergedLocale) {
      var _classNames3;

      return /*#__PURE__*/React.createElement("div", {
        className: classNames(calendarPrefixCls, (_classNames3 = {}, _defineProperty(_classNames3, "".concat(calendarPrefixCls, "-full"), fullscreen), _defineProperty(_classNames3, "".concat(calendarPrefixCls, "-mini"), !fullscreen), _defineProperty(_classNames3, "".concat(calendarPrefixCls, "-rtl"), direction === 'rtl'), _classNames3), className),
        style: style
      }, headerRender ? headerRender({
        value: mergedValue,
        type: mergedMode,
        onChange: onInternalSelect,
        onTypeChange: triggerModeChange
      }) : /*#__PURE__*/React.createElement(CalendarHeader, {
        prefixCls: calendarPrefixCls,
        value: mergedValue,
        generateConfig: generateConfig,
        mode: mergedMode,
        fullscreen: fullscreen,
        locale: mergedLocale.lang,
        validRange: validRange,
        onChange: onInternalSelect,
        onModeChange: triggerModeChange
      }), /*#__PURE__*/React.createElement(RCPickerPanel, {
        value: mergedValue,
        prefixCls: prefixCls,
        locale: mergedLocale.lang,
        generateConfig: generateConfig,
        dateRender: dateRender,
        monthCellRender: function monthCellRender(date) {
          return monthRender(date, mergedLocale.lang);
        },
        onSelect: onInternalSelect,
        mode: panelMode,
        picker: panelMode,
        disabledDate: mergedDisabledDate,
        hideHeader: true
      }));
    });
  };

  return Calendar;
}

export default generateCalendar;