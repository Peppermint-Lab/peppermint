import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import Dialog from 'rc-dialog';
import classNames from 'classnames';
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import useModal from './useModal';
import { getConfirmLocale } from './locale';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigContext } from '../config-provider';
import { canUseDocElement } from '../_util/styleChecker';
import { getTransitionName } from '../_util/motion';
var mousePosition;
export var destroyFns = []; // ref: https://github.com/ant-design/ant-design/issues/15795

var getClickPosition = function getClickPosition(e) {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  }; // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开

  setTimeout(function () {
    mousePosition = null;
  }, 100);
}; // 只有点击事件支持从鼠标位置动画展开


if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

var Modal = function Modal(props) {
  var _classNames;

  var _React$useContext = React.useContext(ConfigContext),
      getContextPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var handleCancel = function handleCancel(e) {
    var onCancel = props.onCancel;
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
  };

  var handleOk = function handleOk(e) {
    var onOk = props.onOk;
    onOk === null || onOk === void 0 ? void 0 : onOk(e);
  };

  var renderFooter = function renderFooter(locale) {
    var okText = props.okText,
        okType = props.okType,
        cancelText = props.cancelText,
        confirmLoading = props.confirmLoading;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, _extends({
      onClick: handleCancel
    }, props.cancelButtonProps), cancelText || locale.cancelText), /*#__PURE__*/React.createElement(Button, _extends({}, convertLegacyProps(okType), {
      loading: confirmLoading,
      onClick: handleOk
    }, props.okButtonProps), okText || locale.okText));
  };

  var customizePrefixCls = props.prefixCls,
      footer = props.footer,
      visible = props.visible,
      wrapClassName = props.wrapClassName,
      centered = props.centered,
      getContainer = props.getContainer,
      closeIcon = props.closeIcon,
      _props$focusTriggerAf = props.focusTriggerAfterClose,
      focusTriggerAfterClose = _props$focusTriggerAf === void 0 ? true : _props$focusTriggerAf,
      restProps = __rest(props, ["prefixCls", "footer", "visible", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose"]);

  var prefixCls = getPrefixCls('modal', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var defaultFooter = /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Modal",
    defaultLocale: getConfirmLocale()
  }, renderFooter);
  var closeIconToRender = /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-close-x")
  }, closeIcon || /*#__PURE__*/React.createElement(CloseOutlined, {
    className: "".concat(prefixCls, "-close-icon")
  }));
  var wrapClassNameExtended = classNames(wrapClassName, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-centered"), !!centered), _defineProperty(_classNames, "".concat(prefixCls, "-wrap-rtl"), direction === 'rtl'), _classNames));
  return /*#__PURE__*/React.createElement(Dialog, _extends({}, restProps, {
    getContainer: getContainer === undefined ? getContextPopupContainer : getContainer,
    prefixCls: prefixCls,
    wrapClassName: wrapClassNameExtended,
    footer: footer === undefined ? defaultFooter : footer,
    visible: visible,
    mousePosition: mousePosition,
    onClose: handleCancel,
    closeIcon: closeIconToRender,
    focusTriggerAfterClose: focusTriggerAfterClose,
    transitionName: getTransitionName(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)
  }));
};

Modal.useModal = useModal;
Modal.defaultProps = {
  width: 520,
  confirmLoading: false,
  visible: false,
  okType: 'primary'
};
export default Modal;