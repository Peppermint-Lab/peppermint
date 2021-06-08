"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _rcProgress = require("rc-progress");

var _colors = require("@ant-design/colors");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function getPercentage(_ref) {
  var percent = _ref.percent,
      success = _ref.success,
      successPercent = _ref.successPercent;
  var ptg = (0, _utils.validProgress)(percent);
  var realSuccessPercent = (0, _utils.getSuccessPercent)({
    success: success,
    successPercent: successPercent
  });

  if (!realSuccessPercent) {
    return ptg;
  }

  return [(0, _utils.validProgress)(realSuccessPercent), (0, _utils.validProgress)(ptg - (0, _utils.validProgress)(realSuccessPercent))];
}

function getStrokeColor(_ref2) {
  var success = _ref2.success,
      strokeColor = _ref2.strokeColor,
      successPercent = _ref2.successPercent;
  var color = strokeColor || null;
  var realSuccessPercent = (0, _utils.getSuccessPercent)({
    success: success,
    successPercent: successPercent
  });

  if (!realSuccessPercent) {
    return color;
  }

  return [_colors.presetPrimaryColors.green, color];
}

var Circle = function Circle(props) {
  var prefixCls = props.prefixCls,
      width = props.width,
      strokeWidth = props.strokeWidth,
      trailColor = props.trailColor,
      strokeLinecap = props.strokeLinecap,
      gapPosition = props.gapPosition,
      gapDegree = props.gapDegree,
      type = props.type,
      children = props.children;
  var circleSize = width || 120;
  var circleStyle = {
    width: circleSize,
    height: circleSize,
    fontSize: circleSize * 0.15 + 6
  };
  var circleWidth = strokeWidth || 6;
  var gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';

  var getGapDegree = function getGapDegree() {
    // Support gapDeg = 0 when type = 'dashboard'
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }

    if (type === 'dashboard') {
      return 75;
    }

    return undefined;
  }; // using className to style stroke color


  var strokeColor = getStrokeColor(props);
  var isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]';
  var wrapperClassName = (0, _classnames["default"])("".concat(prefixCls, "-inner"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-circle-gradient"), isGradient));
  return /*#__PURE__*/React.createElement("div", {
    className: wrapperClassName,
    style: circleStyle
  }, /*#__PURE__*/React.createElement(_rcProgress.Circle, {
    percent: getPercentage(props),
    strokeWidth: circleWidth,
    trailWidth: circleWidth,
    strokeColor: strokeColor,
    strokeLinecap: strokeLinecap,
    trailColor: trailColor,
    prefixCls: prefixCls,
    gapDegree: getGapDegree(),
    gapPosition: gapPos
  }), children);
};

var _default = Circle;
exports["default"] = _default;