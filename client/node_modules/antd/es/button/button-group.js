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
import UnreachableException from '../_util/unreachableException';

var ButtonGroup = function ButtonGroup(props) {
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref) {
    var _classNames;

    var getPrefixCls = _ref.getPrefixCls,
        direction = _ref.direction;

    var customizePrefixCls = props.prefixCls,
        size = props.size,
        className = props.className,
        others = __rest(props, ["prefixCls", "size", "className"]);

    var prefixCls = getPrefixCls('btn-group', customizePrefixCls); // large => lg
    // small => sm

    var sizeCls = '';

    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;

      case 'small':
        sizeCls = 'sm';
        break;

      case 'middle':
      case undefined:
        break;

      default:
        // eslint-disable-next-line no-console
        console.warn(new UnreachableException(size));
    }

    var classes = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(sizeCls), sizeCls), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);
    return /*#__PURE__*/React.createElement("div", _extends({}, others, {
      className: classes
    }));
  });
};

export default ButtonGroup;