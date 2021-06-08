"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SingleNumber;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function UnitNumber(_ref) {
  var prefixCls = _ref.prefixCls,
      value = _ref.value,
      current = _ref.current,
      _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? 0 : _ref$offset;
  var style;

  if (offset) {
    style = {
      position: 'absolute',
      top: "".concat(offset, "00%"),
      left: 0
    };
  }

  return /*#__PURE__*/React.createElement("p", {
    style: style,
    className: (0, _classnames["default"])("".concat(prefixCls, "-only-unit"), {
      current: current
    })
  }, value);
}

function getOffset(start, end, unit) {
  var index = start;
  var offset = 0;

  while ((index + 10) % 10 !== end) {
    index += unit;
    offset += unit;
  }

  return offset;
}

function SingleNumber(props) {
  var prefixCls = props.prefixCls,
      originCount = props.count,
      originValue = props.value;
  var value = Number(originValue);
  var count = Math.abs(originCount);

  var _React$useState = React.useState(value),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      prevValue = _React$useState2[0],
      setPrevValue = _React$useState2[1];

  var _React$useState3 = React.useState(count),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      prevCount = _React$useState4[0],
      setPrevCount = _React$useState4[1]; // ============================= Events =============================


  var onTransitionEnd = function onTransitionEnd() {
    setPrevValue(value);
    setPrevCount(count);
  }; // Fallback if transition event not support


  React.useEffect(function () {
    var timeout = setTimeout(function () {
      onTransitionEnd();
    }, 1000);
    return function () {
      clearTimeout(timeout);
    };
  }, [value]); // ============================= Render =============================
  // Render unit list

  var unitNodes;
  var offsetStyle;

  if (prevValue === value || Number.isNaN(value) || Number.isNaN(prevValue)) {
    // Nothing to change
    unitNodes = [/*#__PURE__*/React.createElement(UnitNumber, (0, _extends2["default"])({}, props, {
      key: value,
      current: true
    }))];
    offsetStyle = {
      transition: 'none'
    };
  } else {
    unitNodes = []; // Fill basic number units

    var end = value + 10;
    var unitNumberList = [];

    for (var index = value; index <= end; index += 1) {
      unitNumberList.push(index);
    } // Fill with number unit nodes


    var prevIndex = unitNumberList.findIndex(function (n) {
      return n % 10 === prevValue;
    });
    unitNodes = unitNumberList.map(function (n, index) {
      var singleUnit = n % 10;
      return /*#__PURE__*/React.createElement(UnitNumber, (0, _extends2["default"])({}, props, {
        key: n,
        value: singleUnit,
        offset: index - prevIndex,
        current: index === prevIndex
      }));
    }); // Calculate container offset value

    var unit = prevCount < count ? 1 : -1;
    offsetStyle = {
      transform: "translateY(".concat(-getOffset(prevValue, value, unit), "00%)")
    };
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-only"),
    style: offsetStyle,
    onTransitionEnd: onTransitionEnd
  }, unitNodes);
}