"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var calcPoints = function calcPoints(vertical, marks, dots, step, min, max) {
  (0, _warning.default)(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
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
    var style = vertical ? (0, _objectSpread4.default)((0, _objectSpread4.default)({}, dotStyle), {}, (0, _defineProperty2.default)({}, reverse ? 'top' : 'bottom', offset)) : (0, _objectSpread4.default)((0, _objectSpread4.default)({}, dotStyle), {}, (0, _defineProperty2.default)({}, reverse ? 'right' : 'left', offset));

    if (isActived) {
      style = (0, _objectSpread4.default)((0, _objectSpread4.default)({}, style), activeDotStyle);
    }

    var pointClassName = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-dot"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-dot-active"), isActived), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-dot-reverse"), reverse), _classNames));
    return /*#__PURE__*/_react.default.createElement("span", {
      className: pointClassName,
      style: style,
      key: point
    });
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-step")
  }, elements);
};

var _default = Steps;
exports.default = _default;