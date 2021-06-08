import _extends from "@babel/runtime/helpers/esm/extends";

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
import RcRate from 'rc-rate';
import StarFilled from "@ant-design/icons/es/icons/StarFilled";
import Tooltip from '../tooltip';
import { ConfigContext } from '../config-provider';
var Rate = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var prefixCls = _a.prefixCls,
      tooltips = _a.tooltips,
      props = __rest(_a, ["prefixCls", "tooltips"]);

  var characterRender = function characterRender(node, _ref) {
    var index = _ref.index;
    if (!tooltips) return node;
    return /*#__PURE__*/React.createElement(Tooltip, {
      title: tooltips[index]
    }, node);
  };

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var ratePrefixCls = getPrefixCls('rate', prefixCls);
  return /*#__PURE__*/React.createElement(RcRate, _extends({
    ref: ref,
    characterRender: characterRender
  }, props, {
    prefixCls: ratePrefixCls,
    direction: direction
  }));
});
Rate.displayName = 'Rate';
Rate.defaultProps = {
  character: /*#__PURE__*/React.createElement(StarFilled, null)
};
export default Rate;