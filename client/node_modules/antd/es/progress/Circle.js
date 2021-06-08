import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { Circle as RCCircle } from 'rc-progress';
import { presetPrimaryColors } from '@ant-design/colors';
import classNames from 'classnames';
import { validProgress, getSuccessPercent } from './utils';

function getPercentage(_ref) {
  var percent = _ref.percent,
      success = _ref.success,
      successPercent = _ref.successPercent;
  var ptg = validProgress(percent);
  var realSuccessPercent = getSuccessPercent({
    success: success,
    successPercent: successPercent
  });

  if (!realSuccessPercent) {
    return ptg;
  }

  return [validProgress(realSuccessPercent), validProgress(ptg - validProgress(realSuccessPercent))];
}

function getStrokeColor(_ref2) {
  var success = _ref2.success,
      strokeColor = _ref2.strokeColor,
      successPercent = _ref2.successPercent;
  var color = strokeColor || null;
  var realSuccessPercent = getSuccessPercent({
    success: success,
    successPercent: successPercent
  });

  if (!realSuccessPercent) {
    return color;
  }

  return [presetPrimaryColors.green, color];
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
  var wrapperClassName = classNames("".concat(prefixCls, "-inner"), _defineProperty({}, "".concat(prefixCls, "-circle-gradient"), isGradient));
  return /*#__PURE__*/React.createElement("div", {
    className: wrapperClassName,
    style: circleStyle
  }, /*#__PURE__*/React.createElement(RCCircle, {
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

export default Circle;