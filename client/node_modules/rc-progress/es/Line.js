import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import classNames from 'classnames';
import { useTransitionDuration, defaultProps } from './common';

var Line = function Line(_ref) {
  var className = _ref.className,
      percent = _ref.percent,
      prefixCls = _ref.prefixCls,
      strokeColor = _ref.strokeColor,
      strokeLinecap = _ref.strokeLinecap,
      strokeWidth = _ref.strokeWidth,
      style = _ref.style,
      trailColor = _ref.trailColor,
      trailWidth = _ref.trailWidth,
      transition = _ref.transition,
      restProps = _objectWithoutProperties(_ref, ["className", "percent", "prefixCls", "strokeColor", "strokeLinecap", "strokeWidth", "style", "trailColor", "trailWidth", "transition"]);

  // eslint-disable-next-line no-param-reassign
  delete restProps.gapPosition;
  var percentList = Array.isArray(percent) ? percent : [percent];
  var strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

  var _useTransitionDuratio = useTransitionDuration(percentList),
      _useTransitionDuratio2 = _slicedToArray(_useTransitionDuratio, 1),
      paths = _useTransitionDuratio2[0];

  var center = strokeWidth / 2;
  var right = 100 - strokeWidth / 2;
  var pathString = "M ".concat(strokeLinecap === 'round' ? center : 0, ",").concat(center, "\n         L ").concat(strokeLinecap === 'round' ? right : 100, ",").concat(center);
  var viewBoxString = "0 0 100 ".concat(strokeWidth);
  var stackPtg = 0;
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: classNames("".concat(prefixCls, "-line"), className),
    viewBox: viewBoxString,
    preserveAspectRatio: "none",
    style: style
  }, restProps), /*#__PURE__*/React.createElement("path", {
    className: "".concat(prefixCls, "-line-trail"),
    d: pathString,
    strokeLinecap: strokeLinecap,
    stroke: trailColor,
    strokeWidth: trailWidth || strokeWidth,
    fillOpacity: "0"
  }), percentList.map(function (ptg, index) {
    var dashPercent = 1;

    switch (strokeLinecap) {
      case 'round':
        dashPercent = 1 - strokeWidth / 100;
        break;

      case 'square':
        dashPercent = 1 - strokeWidth / 2 / 100;
        break;

      default:
        dashPercent = 1;
        break;
    }

    var pathStyle = {
      strokeDasharray: "".concat(ptg * dashPercent, "px, 100px"),
      strokeDashoffset: "-".concat(stackPtg, "px"),
      transition: transition || 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear'
    };
    var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
    stackPtg += ptg;
    return /*#__PURE__*/React.createElement("path", {
      key: index,
      className: "".concat(prefixCls, "-line-path"),
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: color,
      strokeWidth: strokeWidth,
      fillOpacity: "0",
      ref: paths[index],
      style: pathStyle
    });
  }));
};

Line.defaultProps = defaultProps;
Line.displayName = 'Line';
export default Line;