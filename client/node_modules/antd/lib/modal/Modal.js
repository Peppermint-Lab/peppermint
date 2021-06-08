"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.destroyFns = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rcDialog = _interopRequireDefault(require("rc-dialog"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));

var _useModal = _interopRequireDefault(require("./useModal"));

var _locale = require("./locale");

var _button = _interopRequireDefault(require("../button"));

var _button2 = require("../button/button");

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _configProvider = require("../config-provider");

var _styleChecker = require("../_util/styleChecker");

var _motion = require("../_util/motion");

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var mousePosition;
var destroyFns = []; // ref: https://github.com/ant-design/ant-design/issues/15795

exports.destroyFns = destroyFns;

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


if ((0, _styleChecker.canUseDocElement)()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

var Modal = function Modal(props) {
  var _classNames;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({
      onClick: handleCancel
    }, props.cancelButtonProps), cancelText || locale.cancelText), /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({}, (0, _button2.convertLegacyProps)(okType), {
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
  var defaultFooter = /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
    componentName: "Modal",
    defaultLocale: (0, _locale.getConfirmLocale)()
  }, renderFooter);
  var closeIconToRender = /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-close-x")
  }, closeIcon || /*#__PURE__*/React.createElement(_CloseOutlined["default"], {
    className: "".concat(prefixCls, "-close-icon")
  }));
  var wrapClassNameExtended = (0, _classnames["default"])(wrapClassName, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-centered"), !!centered), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-wrap-rtl"), direction === 'rtl'), _classNames));
  return /*#__PURE__*/React.createElement(_rcDialog["default"], (0, _extends2["default"])({}, restProps, {
    getContainer: getContainer === undefined ? getContextPopupContainer : getContainer,
    prefixCls: prefixCls,
    wrapClassName: wrapClassNameExtended,
    footer: footer === undefined ? defaultFooter : footer,
    visible: visible,
    mousePosition: mousePosition,
    onClose: handleCancel,
    closeIcon: closeIconToRender,
    focusTriggerAfterClose: focusTriggerAfterClose,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', props.maskTransitionName)
  }));
};

Modal.useModal = _useModal["default"];
Modal.defaultProps = {
  width: 520,
  confirmLoading: false,
  visible: false,
  okType: 'primary'
};
var _default = Modal;
exports["default"] = _default;