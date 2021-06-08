import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';

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

  var positonStyle = vertical ? (_ref = {}, _defineProperty(_ref, reverse ? 'top' : 'bottom', "".concat(offset, "%")), _defineProperty(_ref, reverse ? 'bottom' : 'top', 'auto'), _defineProperty(_ref, "height", "".concat(length, "%")), _ref) : (_ref2 = {}, _defineProperty(_ref2, reverse ? 'right' : 'left', "".concat(offset, "%")), _defineProperty(_ref2, reverse ? 'left' : 'right', 'auto'), _defineProperty(_ref2, "width", "".concat(length, "%")), _ref2);

  var elStyle = _objectSpread(_objectSpread({}, style), positonStyle);

  return included ? /*#__PURE__*/React.createElement("div", {
    className: className,
    style: elStyle
  }) : null;
};

export default Track;