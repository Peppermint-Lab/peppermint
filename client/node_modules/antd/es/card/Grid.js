import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

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
import { ConfigConsumer } from '../config-provider';

var Grid = function Grid(_a) {
  var prefixCls = _a.prefixCls,
      className = _a.className,
      _a$hoverable = _a.hoverable,
      hoverable = _a$hoverable === void 0 ? true : _a$hoverable,
      props = __rest(_a, ["prefixCls", "className", "hoverable"]);

  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var prefix = getPrefixCls('card', prefixCls);
    var classString = classNames("".concat(prefix, "-grid"), className, _defineProperty({}, "".concat(prefix, "-grid-hoverable"), hoverable));
    return /*#__PURE__*/React.createElement("div", _extends({}, props, {
      className: classString
    }));
  });
};

export default Grid;