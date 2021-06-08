import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { SpaceContext } from '.';
export default function Item(_ref) {
  var className = _ref.className,
      direction = _ref.direction,
      index = _ref.index,
      marginDirection = _ref.marginDirection,
      children = _ref.children,
      split = _ref.split,
      wrap = _ref.wrap;

  var _React$useContext = React.useContext(SpaceContext),
      horizontalSize = _React$useContext.horizontalSize,
      verticalSize = _React$useContext.verticalSize,
      latestIndex = _React$useContext.latestIndex;

  var style = {};

  if (direction === 'vertical') {
    if (index < latestIndex) {
      style = {
        marginBottom: horizontalSize / (split ? 2 : 1)
      };
    }
  } else {
    style = _extends(_extends({}, index < latestIndex && _defineProperty({}, marginDirection, horizontalSize / (split ? 2 : 1))), wrap && {
      paddingBottom: verticalSize
    });
  }

  if (children === null || children === undefined) {
    return null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, children), index < latestIndex && split && /*#__PURE__*/React.createElement("span", {
    className: "".concat(className, "-split"),
    style: style
  }, split));
}