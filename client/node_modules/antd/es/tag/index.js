import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
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
import omit from "rc-util/es/omit";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import CheckableTag from './CheckableTag';
import { ConfigContext } from '../config-provider';
import { PresetColorTypes, PresetStatusColorTypes } from '../_util/colors';
import Wave from '../_util/wave';
var PresetColorRegex = new RegExp("^(".concat(PresetColorTypes.join('|'), ")(-inverse)?$"));
var PresetStatusColorRegex = new RegExp("^(".concat(PresetStatusColorTypes.join('|'), ")$"));

var InternalTag = function InternalTag(_a, ref) {
  var _classNames;

  var customizePrefixCls = _a.prefixCls,
      className = _a.className,
      style = _a.style,
      children = _a.children,
      icon = _a.icon,
      color = _a.color,
      onClose = _a.onClose,
      closeIcon = _a.closeIcon,
      _a$closable = _a.closable,
      closable = _a$closable === void 0 ? false : _a$closable,
      props = __rest(_a, ["prefixCls", "className", "style", "children", "icon", "color", "onClose", "closeIcon", "closable"]);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var _React$useState = React.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  React.useEffect(function () {
    if ('visible' in props) {
      setVisible(props.visible);
    }
  }, [props.visible]);

  var isPresetColor = function isPresetColor() {
    if (!color) {
      return false;
    }

    return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color);
  };

  var tagStyle = _extends({
    backgroundColor: color && !isPresetColor() ? color : undefined
  }, style);

  var presetColor = isPresetColor();
  var prefixCls = getPrefixCls('tag', customizePrefixCls);
  var tagClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(color), presetColor), _defineProperty(_classNames, "".concat(prefixCls, "-has-color"), color && !presetColor), _defineProperty(_classNames, "".concat(prefixCls, "-hidden"), !visible), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);

  var handleCloseClick = function handleCloseClick(e) {
    e.stopPropagation();
    onClose === null || onClose === void 0 ? void 0 : onClose(e);

    if (e.defaultPrevented) {
      return;
    }

    if (!('visible' in props)) {
      setVisible(false);
    }
  };

  var renderCloseIcon = function renderCloseIcon() {
    if (closable) {
      return closeIcon ? /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-close-icon"),
        onClick: handleCloseClick
      }, closeIcon) : /*#__PURE__*/React.createElement(CloseOutlined, {
        className: "".concat(prefixCls, "-close-icon"),
        onClick: handleCloseClick
      });
    }

    return null;
  };

  var isNeedWave = 'onClick' in props || children && children.type === 'a';
  var tagProps = omit(props, ['visible']);
  var iconNode = icon || null;
  var kids = iconNode ? /*#__PURE__*/React.createElement(React.Fragment, null, iconNode, /*#__PURE__*/React.createElement("span", null, children)) : children;
  var tagNode = /*#__PURE__*/React.createElement("span", _extends({}, tagProps, {
    ref: ref,
    className: tagClassName,
    style: tagStyle
  }), kids, renderCloseIcon());
  return isNeedWave ? /*#__PURE__*/React.createElement(Wave, null, tagNode) : tagNode;
};

var Tag = /*#__PURE__*/React.forwardRef(InternalTag);
Tag.displayName = 'Tag';
Tag.CheckableTag = CheckableTag;
export default Tag;