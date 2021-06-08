import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";

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
import RowContext from './RowContext';
import { ConfigContext } from '../config-provider';

function parseFlex(flex) {
  if (typeof flex === 'number') {
    return "".concat(flex, " ").concat(flex, " auto");
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return "0 0 ".concat(flex);
  }

  return flex;
}

var sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
var Col = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var _React$useContext2 = React.useContext(RowContext),
      gutter = _React$useContext2.gutter,
      wrap = _React$useContext2.wrap,
      supportFlexGap = _React$useContext2.supportFlexGap;

  var customizePrefixCls = props.prefixCls,
      span = props.span,
      order = props.order,
      offset = props.offset,
      push = props.push,
      pull = props.pull,
      className = props.className,
      children = props.children,
      flex = props.flex,
      style = props.style,
      others = __rest(props, ["prefixCls", "span", "order", "offset", "push", "pull", "className", "children", "flex", "style"]);

  var prefixCls = getPrefixCls('col', customizePrefixCls);
  var sizeClassObj = {};
  sizes.forEach(function (size) {
    var _extends2;

    var sizeProps = {};
    var propSize = props[size];

    if (typeof propSize === 'number') {
      sizeProps.span = propSize;
    } else if (_typeof(propSize) === 'object') {
      sizeProps = propSize || {};
    }

    delete others[size];
    sizeClassObj = _extends(_extends({}, sizeClassObj), (_extends2 = {}, _defineProperty(_extends2, "".concat(prefixCls, "-").concat(size, "-").concat(sizeProps.span), sizeProps.span !== undefined), _defineProperty(_extends2, "".concat(prefixCls, "-").concat(size, "-order-").concat(sizeProps.order), sizeProps.order || sizeProps.order === 0), _defineProperty(_extends2, "".concat(prefixCls, "-").concat(size, "-offset-").concat(sizeProps.offset), sizeProps.offset || sizeProps.offset === 0), _defineProperty(_extends2, "".concat(prefixCls, "-").concat(size, "-push-").concat(sizeProps.push), sizeProps.push || sizeProps.push === 0), _defineProperty(_extends2, "".concat(prefixCls, "-").concat(size, "-pull-").concat(sizeProps.pull), sizeProps.pull || sizeProps.pull === 0), _defineProperty(_extends2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _extends2));
  });
  var classes = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(span), span !== undefined), _defineProperty(_classNames, "".concat(prefixCls, "-order-").concat(order), order), _defineProperty(_classNames, "".concat(prefixCls, "-offset-").concat(offset), offset), _defineProperty(_classNames, "".concat(prefixCls, "-push-").concat(push), push), _defineProperty(_classNames, "".concat(prefixCls, "-pull-").concat(pull), pull), _classNames), className, sizeClassObj);
  var mergedStyle = {}; // Horizontal gutter use padding

  if (gutter && gutter[0] > 0) {
    var horizontalGutter = gutter[0] / 2;
    mergedStyle.paddingLeft = horizontalGutter;
    mergedStyle.paddingRight = horizontalGutter;
  } // Vertical gutter use padding when gap not support


  if (gutter && gutter[1] > 0 && !supportFlexGap) {
    var verticalGutter = gutter[1] / 2;
    mergedStyle.paddingTop = verticalGutter;
    mergedStyle.paddingBottom = verticalGutter;
  }

  if (flex) {
    mergedStyle.flex = parseFlex(flex); // Hack for Firefox to avoid size issue
    // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553

    if (flex === 'auto' && wrap === false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = 0;
    }
  }

  return /*#__PURE__*/React.createElement("div", _extends({}, others, {
    style: _extends(_extends({}, mergedStyle), style),
    className: classes,
    ref: ref
  }), children);
});
Col.displayName = 'Col';
export default Col;