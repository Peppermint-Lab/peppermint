"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _select = _interopRequireDefault(require("../select"));

var _radio = require("../radio");

var YearSelectOffset = 10;
var YearSelectTotal = 20;

function YearSelect(props) {
  var fullscreen = props.fullscreen,
      validRange = props.validRange,
      generateConfig = props.generateConfig,
      locale = props.locale,
      prefixCls = props.prefixCls,
      value = props.value,
      _onChange = props.onChange,
      divRef = props.divRef;
  var year = generateConfig.getYear(value);
  var start = year - YearSelectOffset;
  var end = start + YearSelectTotal;

  if (validRange) {
    start = generateConfig.getYear(validRange[0]);
    end = generateConfig.getYear(validRange[1]) + 1;
  }

  var suffix = locale && locale.year === '年' ? '年' : '';
  var options = [];

  for (var index = start; index < end; index++) {
    options.push({
      label: "".concat(index).concat(suffix),
      value: index
    });
  }

  return /*#__PURE__*/React.createElement(_select["default"], {
    size: fullscreen ? undefined : 'small',
    options: options,
    value: year,
    className: "".concat(prefixCls, "-year-select"),
    onChange: function onChange(numYear) {
      var newDate = generateConfig.setYear(value, numYear);

      if (validRange) {
        var _validRange = (0, _slicedToArray2["default"])(validRange, 2),
            startDate = _validRange[0],
            endDate = _validRange[1];

        var newYear = generateConfig.getYear(newDate);
        var newMonth = generateConfig.getMonth(newDate);

        if (newYear === generateConfig.getYear(endDate) && newMonth > generateConfig.getMonth(endDate)) {
          newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(endDate));
        }

        if (newYear === generateConfig.getYear(startDate) && newMonth < generateConfig.getMonth(startDate)) {
          newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(startDate));
        }
      }

      _onChange(newDate);
    },
    getPopupContainer: function getPopupContainer() {
      return divRef.current;
    }
  });
}

function MonthSelect(props) {
  var prefixCls = props.prefixCls,
      fullscreen = props.fullscreen,
      validRange = props.validRange,
      value = props.value,
      generateConfig = props.generateConfig,
      locale = props.locale,
      _onChange2 = props.onChange,
      divRef = props.divRef;
  var month = generateConfig.getMonth(value);
  var start = 0;
  var end = 11;

  if (validRange) {
    var _validRange2 = (0, _slicedToArray2["default"])(validRange, 2),
        rangeStart = _validRange2[0],
        rangeEnd = _validRange2[1];

    var currentYear = generateConfig.getYear(value);

    if (generateConfig.getYear(rangeEnd) === currentYear) {
      end = generateConfig.getMonth(rangeEnd);
    }

    if (generateConfig.getYear(rangeStart) === currentYear) {
      start = generateConfig.getMonth(rangeStart);
    }
  }

  var months = locale.shortMonths || generateConfig.locale.getShortMonths(locale.locale);
  var options = [];

  for (var index = start; index <= end; index += 1) {
    options.push({
      label: months[index],
      value: index
    });
  }

  return /*#__PURE__*/React.createElement(_select["default"], {
    size: fullscreen ? undefined : 'small',
    className: "".concat(prefixCls, "-month-select"),
    value: month,
    options: options,
    onChange: function onChange(newMonth) {
      _onChange2(generateConfig.setMonth(value, newMonth));
    },
    getPopupContainer: function getPopupContainer() {
      return divRef.current;
    }
  });
}

function ModeSwitch(props) {
  var prefixCls = props.prefixCls,
      locale = props.locale,
      mode = props.mode,
      fullscreen = props.fullscreen,
      onModeChange = props.onModeChange;
  return /*#__PURE__*/React.createElement(_radio.Group, {
    onChange: function onChange(_ref) {
      var value = _ref.target.value;
      onModeChange(value);
    },
    value: mode,
    size: fullscreen ? undefined : 'small',
    className: "".concat(prefixCls, "-mode-switch")
  }, /*#__PURE__*/React.createElement(_radio.Button, {
    value: "month"
  }, locale.month), /*#__PURE__*/React.createElement(_radio.Button, {
    value: "year"
  }, locale.year));
}

function CalendarHeader(props) {
  var prefixCls = props.prefixCls,
      fullscreen = props.fullscreen,
      mode = props.mode,
      onChange = props.onChange,
      onModeChange = props.onModeChange;
  var divRef = React.useRef(null);
  var sharedProps = (0, _extends2["default"])((0, _extends2["default"])({}, props), {
    onChange: onChange,
    fullscreen: fullscreen,
    divRef: divRef
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-header"),
    ref: divRef
  }, /*#__PURE__*/React.createElement(YearSelect, sharedProps), mode === 'month' && /*#__PURE__*/React.createElement(MonthSelect, sharedProps), /*#__PURE__*/React.createElement(ModeSwitch, (0, _extends2["default"])({}, sharedProps, {
    onModeChange: onModeChange
  })));
}

var _default = CalendarHeader;
exports["default"] = _default;