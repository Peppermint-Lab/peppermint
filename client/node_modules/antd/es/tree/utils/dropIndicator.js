import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
export var offset = 4;
export default function dropIndicatorRender(props) {
  var _style;

  var dropPosition = props.dropPosition,
      dropLevelOffset = props.dropLevelOffset,
      prefixCls = props.prefixCls,
      indent = props.indent,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'ltr' : _props$direction;
  var startPosition = direction === 'ltr' ? 'left' : 'right';
  var endPosition = direction === 'ltr' ? 'right' : 'left';
  var style = (_style = {}, _defineProperty(_style, startPosition, -dropLevelOffset * indent + offset), _defineProperty(_style, endPosition, 0), _style);

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

  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: "".concat(prefixCls, "-drop-indicator")
  });
}