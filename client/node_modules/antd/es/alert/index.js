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
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import CheckCircleOutlined from "@ant-design/icons/es/icons/CheckCircleOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/es/icons/ExclamationCircleOutlined";
import InfoCircleOutlined from "@ant-design/icons/es/icons/InfoCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/es/icons/CloseCircleOutlined";
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import InfoCircleFilled from "@ant-design/icons/es/icons/InfoCircleFilled";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';
import ErrorBoundary from './ErrorBoundary';
import { replaceElement } from '../_util/reactNode';
var iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled
};
var iconMapOutlined = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined
};

var Alert = function Alert(_a) {
  var _classNames2;

  var description = _a.description,
      customizePrefixCls = _a.prefixCls,
      message = _a.message,
      banner = _a.banner,
      _a$className = _a.className,
      className = _a$className === void 0 ? '' : _a$className,
      style = _a.style,
      onMouseEnter = _a.onMouseEnter,
      onMouseLeave = _a.onMouseLeave,
      onClick = _a.onClick,
      afterClose = _a.afterClose,
      showIcon = _a.showIcon,
      closable = _a.closable,
      closeText = _a.closeText,
      action = _a.action,
      props = __rest(_a, ["description", "prefixCls", "message", "banner", "className", "style", "onMouseEnter", "onMouseLeave", "onClick", "afterClose", "showIcon", "closable", "closeText", "action"]);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      closed = _React$useState2[0],
      setClosed = _React$useState2[1];

  var ref = React.useRef();

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('alert', customizePrefixCls);

  var handleClose = function handleClose(e) {
    var _a;

    setClosed(true);
    (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };

  var getType = function getType() {
    var type = props.type;

    if (type !== undefined) {
      return type;
    } // banner 模式默认为警告


    return banner ? 'warning' : 'info';
  }; // closeable when closeText is assigned


  var isClosable = closeText ? true : closable;
  var type = getType();

  var renderIconNode = function renderIconNode() {
    var icon = props.icon; // use outline icon in alert with description

    var iconType = (description ? iconMapOutlined : iconMapFilled)[type] || null;

    if (icon) {
      return replaceElement(icon, /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icon), function () {
        return {
          className: classNames("".concat(prefixCls, "-icon"), _defineProperty({}, icon.props.className, icon.props.className))
        };
      });
    }

    return /*#__PURE__*/React.createElement(iconType, {
      className: "".concat(prefixCls, "-icon")
    });
  };

  var renderCloseIcon = function renderCloseIcon() {
    return isClosable ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: handleClose,
      className: "".concat(prefixCls, "-close-icon"),
      tabIndex: 0
    }, closeText ? /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-close-text")
    }, closeText) : /*#__PURE__*/React.createElement(CloseOutlined, null)) : null;
  }; // banner 模式默认有 Icon


  var isShowIcon = banner && showIcon === undefined ? true : showIcon;
  var alertCls = classNames(prefixCls, "".concat(prefixCls, "-").concat(type), (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-with-description"), !!description), _defineProperty(_classNames2, "".concat(prefixCls, "-no-icon"), !isShowIcon), _defineProperty(_classNames2, "".concat(prefixCls, "-banner"), !!banner), _defineProperty(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames2), className);
  var dataOrAriaProps = getDataOrAriaProps(props);
  return /*#__PURE__*/React.createElement(CSSMotion, {
    visible: !closed,
    motionName: "".concat(prefixCls, "-motion"),
    motionAppear: false,
    motionEnter: false,
    onLeaveStart: function onLeaveStart(node) {
      return {
        maxHeight: node.offsetHeight
      };
    },
    onLeaveEnd: afterClose
  }, function (_ref) {
    var motionClassName = _ref.className,
        motionStyle = _ref.style;
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: ref,
      "data-show": !closed,
      className: classNames(alertCls, motionClassName),
      style: _extends(_extends({}, style), motionStyle),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: onClick,
      role: "alert"
    }, dataOrAriaProps), isShowIcon ? renderIconNode() : null, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-message")
    }, message), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-description")
    }, description)), action ? /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-action")
    }, action) : null, renderCloseIcon());
  });
};

Alert.ErrorBoundary = ErrorBoundary;
export default Alert;