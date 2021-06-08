import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import React from 'react';
import classNames from 'classnames';

var Marks = function Marks(_ref) {
  var className = _ref.className,
      vertical = _ref.vertical,
      reverse = _ref.reverse,
      marks = _ref.marks,
      included = _ref.included,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound,
      max = _ref.max,
      min = _ref.min,
      onClickLabel = _ref.onClickLabel;
  var marksKeys = Object.keys(marks);
  var range = max - min;
  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
    return a - b;
  }).map(function (point) {
    var _classNames;

    var markPoint = marks[point];
    var markPointIsObject = _typeof(markPoint) === 'object' && ! /*#__PURE__*/React.isValidElement(markPoint);
    var markLabel = markPointIsObject ? markPoint.label : markPoint;

    if (!markLabel && markLabel !== 0) {
      return null;
    }

    var isActive = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var markClassName = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(className, "-text"), true), _defineProperty(_classNames, "".concat(className, "-text-active"), isActive), _classNames));

    var bottomStyle = _defineProperty({
      marginBottom: '-50%'
    }, reverse ? 'top' : 'bottom', "".concat((point - min) / range * 100, "%"));

    var leftStyle = _defineProperty({
      transform: "translateX(".concat(reverse ? "50%" : "-50%", ")"),
      msTransform: "translateX(".concat(reverse ? "50%" : "-50%", ")")
    }, reverse ? 'right' : 'left', "".concat((point - min) / range * 100, "%"));

    var style = vertical ? bottomStyle : leftStyle;
    var markStyle = markPointIsObject ? _objectSpread(_objectSpread({}, style), markPoint.style) : style;
    return /*#__PURE__*/React.createElement("span", {
      className: markClassName,
      style: markStyle,
      key: point,
      onMouseDown: function onMouseDown(e) {
        return onClickLabel(e, point);
      },
      onTouchStart: function onTouchStart(e) {
        return onClickLabel(e, point);
      }
    }, markLabel);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, elements);
};

export default Marks;