"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dropIndicatorRender;
exports.offset = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var offset = 4;
exports.offset = offset;

function dropIndicatorRender(props) {
  var _style;

  var dropPosition = props.dropPosition,
      dropLevelOffset = props.dropLevelOffset,
      prefixCls = props.prefixCls,
      indent = props.indent,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'ltr' : _props$direction;
  var startPosition = direction === 'ltr' ? 'left' : 'right';
  var endPosition = direction === 'ltr' ? 'right' : 'left';
  var style = (_style = {}, (0, _defineProperty2["default"])(_style, startPosition, -dropLevelOffset * indent + offset), (0, _defineProperty2["default"])(_style, endPosition, 0), _style);

  switch (dropPosition) {
    case -1:
      style.top = -3;
      break;

    case 1:
      style.bottom = -3;
      break;

    default:
      // dropPosition === 0
      style.bottom = -3;
      style[startPosition] = indent + offset;
      break;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style,
    className: "".concat(prefixCls, "-drop-indicator")
  });
}