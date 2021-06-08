import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import React from 'react';
import classNames from 'classnames';
import warning from "rc-util/es/warning";

var calcPoints = function calcPoints(vertical, marks, dots, step, min, max) {
  warning(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
  var points = Object.keys(marks).map(parseFloat).sort(function (a, b) {
    return a - b;
  });

  if (dots && step) {
    for (var i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i);
      }
    }
  }

  return points;
};

var Steps = function Steps(_ref) {
  var prefixCls = _ref.prefixCls,
      vertical = _ref.vertical,
      reverse = _ref.reverse,
      marks = _ref.marks,
      dots = _ref.dots,
      step = _ref.step,
      included = _ref.included,
      lowerBound = _ref.lowerBound,
      upperBound = _ref.upperBound,
      max = _ref.max,
      min = _ref.min,
      dotStyle = _ref.dotStyle,
      activeDotStyle = _ref.activeDotStyle;
  var range = max - min;
  var elements = calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
    var _classNames;

    var offset = "".concat(Math.abs(point - min) / range * 100, "%");
    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var style = vertical ? _objectSpread(_objectSpread({}, dotStyle), {}, _defineProperty({}, reverse ? 'top' : 'bottom', offset)) : _objectSpread(_objectSpread({}, dotStyle), {}, _defineProperty({}, reverse ? 'right' : 'left', offset));

    if (isActived) {
      style = _objectSpread(_objectSpread({}, style), activeDotStyle);
    }

    var pointClassName = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-dot"), true), _defineProperty(_classNames, "".concat(prefixCls, "-dot-active"), isActived), _defineProperty(_classNames, "".concat(prefixCls, "-dot-reverse"), reverse), _classNames));
    return /*#__PURE__*/React.createElement("span", {
      className: pointClassName,
      style: style,
      key: point
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-step")
  }, elements);
};

export default Steps;