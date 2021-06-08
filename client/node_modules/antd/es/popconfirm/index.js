import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

var _this = this;

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
import useMergedState from "rc-util/es/hooks/useMergedState";
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import KeyCode from "rc-util/es/KeyCode";
import Tooltip from '../tooltip';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigContext } from '../config-provider';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { cloneElement } from '../_util/reactNode';
import { getTransitionName } from '../_util/motion';
var Popconfirm = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useMergedState = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible
  }),
      _useMergedState2 = _slicedToArray(_useMergedState, 2),
      visible = _useMergedState2[0],
      setVisible = _useMergedState2[1];

  var settingVisible = function settingVisible(value, e) {
    var _a;

    setVisible(value);
    (_a = props.onVisibleChange) === null || _a === void 0 ? void 0 : _a.call(props, value, e);
  };

  var onConfirm = function onConfirm(e) {
    var _a;

    settingVisible(false, e);
    (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(_this, e);
  };

  var onCancel = function onCancel(e) {
    var _a;

    settingVisible(false, e);
    (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(_this, e);
  };

  var _onKeyDown = function onKeyDown(e) {
    if (e.keyCode === KeyCode.ESC && visible) {
      settingVisible(false, e);
    }
  };

  var onVisibleChange = function onVisibleChange(value) {
    var disabled = props.disabled;

    if (disabled) {
      return;
    }

    settingVisible(value);
  };

  var renderOverlay = function renderOverlay(prefixCls, popconfirmLocale) {
    var okButtonProps = props.okButtonProps,
        cancelButtonProps = props.cancelButtonProps,
        title = props.title,
        cancelText = props.cancelText,
        okText = props.okText,
        okType = props.okType,
        icon = props.icon;
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-inner-content")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-message")
    }, icon, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-message-title")
    }, getRenderPropValue(title))), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-buttons")
    }, /*#__PURE__*/React.createElement(Button, _extends({
      onClick: onCancel,
      size: "small"
    }, cancelButtonProps), cancelText || popconfirmLocale.cancelText), /*#__PURE__*/React.createElement(Button, _extends({
      onClick: onConfirm
    }, convertLegacyProps(okType), {
      size: "small"
    }, okButtonProps), okText || popconfirmLocale.okText)));
  };

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var customizePrefixCls = props.prefixCls,
      placement = props.placement,
      children = props.children,
      overlayClassName = props.overlayClassName,
      restProps = __rest(props, ["prefixCls", "placement", "children", "overlayClassName"]);

  var prefixCls = getPrefixCls('popover', customizePrefixCls);
  var prefixClsConfirm = getPrefixCls('popconfirm', customizePrefixCls);
  var overlayClassNames = classNames(prefixClsConfirm, overlayClassName);
  var overlay = /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Popconfirm",
    defaultLocale: defaultLocale.Popconfirm
  }, function (popconfirmLocale) {
    return renderOverlay(prefixCls, popconfirmLocale);
  });
  var rootPrefixCls = getPrefixCls();
  return /*#__PURE__*/React.createElement(Tooltip, _extends({}, restProps, {
    prefixCls: prefixCls,
    placement: placement,
    onVisibleChange: onVisibleChange,
    visible: visible,
    overlay: overlay,
    overlayClassName: overlayClassNames,
    ref: ref,
    transitionName: getTransitionName(rootPrefixCls, 'zoom-big', props.transitionName)
  }), cloneElement(children, {
    onKeyDown: function onKeyDown(e) {
      var _a, _b;

      if ( /*#__PURE__*/React.isValidElement(children)) {
        (_b = children === null || children === void 0 ? void 0 : (_a = children.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      }

      _onKeyDown(e);
    }
  }));
});
Popconfirm.defaultProps = {
  placement: 'top',
  trigger: 'click',
  okType: 'primary',
  icon: /*#__PURE__*/React.createElement(ExclamationCircleFilled, null),
  disabled: false
};
export default Popconfirm;