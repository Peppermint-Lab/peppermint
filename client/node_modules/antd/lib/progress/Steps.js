"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

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
      className: (0, _classnames["default"])("".concat(prefixCls, "-steps-item"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-steps-item-active"), i <= current - 1)),
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

var _default = Steps;
exports["default"] = _default;