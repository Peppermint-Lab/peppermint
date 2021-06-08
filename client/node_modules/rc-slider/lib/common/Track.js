"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var Track = function Track(props) {
  var _ref, _ref2;

  var className = props.className,
      included = props.included,
      vertical = props.vertical,
      style = props.style;
  var length = props.length,
      offset = props.offset,
      reverse = props.reverse;

  if (length < 0) {
    reverse = !reverse;
    length = Math.abs(length);
    offset = 100 - offset;
  }

  var positonStyle = vertical ? (_ref = {}, (0, _defineProperty2.default)(_ref, reverse ? 'top' : 'bottom', "".concat(offset, "%")), (0, _defineProperty2.default)(_ref, reverse ? 'bottom' : 'top', 'auto'), (0, _defineProperty2.default)(_ref, "height", "".concat(length, "%")), _ref) : (_ref2 = {}, (0, _defineProperty2.default)(_ref2, reverse ? 'right' : 'left', "".concat(offset, "%")), (0, _defineProperty2.default)(_ref2, reverse ? 'left' : 'right', 'auto'), (0, _defineProperty2.default)(_ref2, "width", "".concat(length, "%")), _ref2);
  var elStyle = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), positonStyle);
  return included ? /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    style: elStyle
  }) : null;
};

var _default = Track;
exports.default = _default;