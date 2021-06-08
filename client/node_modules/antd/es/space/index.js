import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';
import toArray from "rc-util/es/Children/toArray";
import { ConfigContext } from '../config-provider';
import Item from './Item';
export var SpaceContext = /*#__PURE__*/React.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0
});
var spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};

function getNumberSize(size) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

var Space = function Space(props) {
  var _classNames;

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      space = _React$useContext.space,
      directionConfig = _React$useContext.direction;

  var _props$size = props.size,
      size = _props$size === void 0 ? (space === null || space === void 0 ? void 0 : space.size) || 'small' : _props$size,
      align = props.align,
      className = props.className,
      children = props.children,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'horizontal' : _props$direction,
      customizePrefixCls = props.prefixCls,
      split = props.split,
      style = props.style,
      _props$wrap = props.wrap,
      wrap = _props$wrap === void 0 ? false : _props$wrap,
      otherProps = __rest(props, ["size", "align", "className", "children", "direction", "prefixCls", "split", "style", "wrap"]);

  var _React$useMemo = React.useMemo(function () {
    return (Array.isArray(size) ? size : [size, size]).map(function (item) {
      return getNumberSize(item);
    });
  }, [size]),
      _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
      horizontalSize = _React$useMemo2[0],
      verticalSize = _React$useMemo2[1];

  var childNodes = toArray(children, {
    keepEmpty: true
  });

  if (childNodes.length === 0) {
    return null;
  }

  var mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  var prefixCls = getPrefixCls('space', customizePrefixCls);
  var cn = classNames(prefixCls, "".concat(prefixCls, "-").concat(direction), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), directionConfig === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-align-").concat(mergedAlign), mergedAlign), _classNames), className);
  var itemClassName = "".concat(prefixCls, "-item");
  var marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight'; // Calculate latest one

  var latestIndex = 0;
  var nodes = childNodes.map(function (child, i) {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }
    /* eslint-disable react/no-array-index-key */


    return /*#__PURE__*/React.createElement(Item, {
      className: itemClassName,
      key: "".concat(itemClassName, "-").concat(i),
      direction: direction,
      index: i,
      marginDirection: marginDirection,
      split: split,
      wrap: wrap
    }, child);
    /* eslint-enable */
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cn,
    style: _extends(_extends({}, wrap && {
      flexWrap: 'wrap',
      marginBottom: -verticalSize
    }), style)
  }, otherProps), /*#__PURE__*/React.createElement(SpaceContext.Provider, {
    value: {
      horizontalSize: horizontalSize,
      verticalSize: verticalSize,
      latestIndex: latestIndex
    }
  }, nodes));
};

export default Space;