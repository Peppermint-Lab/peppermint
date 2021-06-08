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
import EllipsisOutlined from "@ant-design/icons/es/icons/EllipsisOutlined";
import Button from '../button';
import { ConfigContext } from '../config-provider';
import Dropdown from './dropdown';
var ButtonGroup = Button.Group;

var DropdownButton = function DropdownButton(props) {
  var _React$useContext = React.useContext(ConfigContext),
      getContextPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var customizePrefixCls = props.prefixCls,
      type = props.type,
      disabled = props.disabled,
      onClick = props.onClick,
      htmlType = props.htmlType,
      children = props.children,
      className = props.className,
      overlay = props.overlay,
      trigger = props.trigger,
      align = props.align,
      visible = props.visible,
      onVisibleChange = props.onVisibleChange,
      placement = props.placement,
      getPopupContainer = props.getPopupContainer,
      href = props.href,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? /*#__PURE__*/React.createElement(EllipsisOutlined, null) : _props$icon,
      title = props.title,
      buttonsRender = props.buttonsRender,
      restProps = __rest(props, ["prefixCls", "type", "disabled", "onClick", "htmlType", "children", "className", "overlay", "trigger", "align", "visible", "onVisibleChange", "placement", "getPopupContainer", "href", "icon", "title", "buttonsRender"]);

  var prefixCls = getPrefixCls('dropdown-button', customizePrefixCls);
  var dropdownProps = {
    align: align,
    overlay: overlay,
    disabled: disabled,
    trigger: disabled ? [] : trigger,
    onVisibleChange: onVisibleChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer
  };

  if ('visible' in props) {
    dropdownProps.visible = visible;
  }

  if ('placement' in props) {
    dropdownProps.placement = placement;
  } else {
    dropdownProps.placement = direction === 'rtl' ? 'bottomLeft' : 'bottomRight';
  }

  var leftButton = /*#__PURE__*/React.createElement(Button, {
    type: type,
    disabled: disabled,
    onClick: onClick,
    htmlType: htmlType,
    href: href,
    title: title
  }, children);
  var rightButton = /*#__PURE__*/React.createElement(Button, {
    type: type,
    icon: icon
  });

  var _buttonsRender = buttonsRender([leftButton, rightButton]),
      _buttonsRender2 = _slicedToArray(_buttonsRender, 2),
      leftButtonToRender = _buttonsRender2[0],
      rightButtonToRender = _buttonsRender2[1];

  return /*#__PURE__*/React.createElement(ButtonGroup, _extends({}, restProps, {
    className: classNames(prefixCls, className)
  }), leftButtonToRender, /*#__PURE__*/React.createElement(Dropdown, dropdownProps, rightButtonToRender));
};

DropdownButton.__ANT_BUTTON = true;
DropdownButton.defaultProps = {
  type: 'default',
  buttonsRender: function buttonsRender(buttons) {
    return buttons;
  }
};
export default DropdownButton;