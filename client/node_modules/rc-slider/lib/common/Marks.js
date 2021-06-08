"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

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
    var markPointIsObject = (0, _typeof2.default)(markPoint) === 'object' && ! /*#__PURE__*/_react.default.isValidElement(markPoint);
    var markLabel = markPointIsObject ? markPoint.label : markPoint;

    if (!markLabel && markLabel !== 0) {
      return null;
    }

    var isActive = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var markClassName = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(className, "-text"), true), (0, _defineProperty2.default)(_classNames, "".concat(className, "-text-active"), isActive), _classNames));
    var bottomStyle = (0, _defineProperty2.default)({
      marginBottom: '-50%'
    }, reverse ? 'top' : 'bottom', "".concat((point - min) / range * 100, "%"));
    var leftStyle = (0, _defineProperty2.default)({
      transform: "translateX(".concat(reverse ? "50%" : "-50%", ")"),
      msTransform: "translateX(".concat(reverse ? "50%" : "-50%", ")")
    }, reverse ? 'right' : 'left', "".concat((point - min) / range * 100, "%"));
    var style = vertical ? bottomStyle : leftStyle;
    var markStyle = markPointIsObject ? (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), markPoint.style) : style;
    return /*#__PURE__*/_react.default.createElement("span", {
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, elements);
};

var _default = Marks;
exports.default = _default;