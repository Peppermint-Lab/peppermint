import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import classNames from 'classnames';

var Steps = function Steps(props) {
  var size = props.size,
      steps = props.steps,
      _props$percent = props.percent,
      percent = _props$percent === void 0 ? 0 : _props$percent,
      _props$strokeWidth = props.strokeWidth,
      strokeWidth = _props$strokeWidth === void 0 ? 8 : _props$strokeWidth,
      strokeColor = props.strokeColor,
      trailColor = props.trailColor,
      prefixCls = props.prefixCls,
      children = props.children;
  var current = Math.round(steps * (percent / 100));
  var stepWidth = size === 'small' ? 2 : 14;
  var styledSteps = [];

  for (var i = 0; i < steps; i += 1) {
    styledSteps.push( /*#__PURE__*/React.createElement("div", {
      key: i,
      className: classNames("".concat(prefixCls, "-steps-item"), _defineProperty({}, "".concat(prefixCls, "-steps-item-active"), i <= current - 1)),
      style: {
        backgroundColor: i <= current - 1 ? strokeColor : trailColor,
        width: stepWidth,
        height: strokeWidth
      }
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-steps-outer")
  }, styledSteps, children);
};

export default Steps;