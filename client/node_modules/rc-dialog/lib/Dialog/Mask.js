"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mask;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

function Mask(props) {
  var prefixCls = props.prefixCls,
      style = props.style,
      visible = props.visible,
      maskProps = props.maskProps,
      motionName = props.motionName;
  return /*#__PURE__*/React.createElement(_rcMotion.default, {
    key: "mask",
    visible: visible,
    motionName: motionName,
    leavedClassName: "".concat(prefixCls, "-mask-hidden")
  }, function (_ref) {
    var motionClassName = _ref.className,
        motionStyle = _ref.style;
    return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
      style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, motionStyle), style),
      className: (0, _classnames.default)("".concat(prefixCls, "-mask"), motionClassName)
    }, maskProps));
  });
}