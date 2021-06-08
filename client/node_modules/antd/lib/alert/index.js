"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));

var _CheckCircleOutlined = _interopRequireDefault(require("@ant-design/icons/CheckCircleOutlined"));

var _ExclamationCircleOutlined = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleOutlined"));

var _InfoCircleOutlined = _interopRequireDefault(require("@ant-design/icons/InfoCircleOutlined"));

var _CloseCircleOutlined = _interopRequireDefault(require("@ant-design/icons/CloseCircleOutlined"));

var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));

var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));

var _InfoCircleFilled = _interopRequireDefault(require("@ant-design/icons/InfoCircleFilled"));

var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _getDataOrAriaProps = _interopRequireDefault(require("../_util/getDataOrAriaProps"));

var _ErrorBoundary = _interopRequireDefault(require("./ErrorBoundary"));

var _reactNode = require("../_util/reactNode");

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

var iconMapFilled = {
  success: _CheckCircleFilled["default"],
  info: _InfoCircleFilled["default"],
  error: _CloseCircleFilled["default"],
  warning: _ExclamationCircleFilled["default"]
};
var iconMapOutlined = {
  success: _CheckCircleOutlined["default"],
  info: _InfoCircleOutlined["default"],
  error: _CloseCircleOutlined["default"],
  warning: _ExclamationCircleOutlined["default"]
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
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      closed = _React$useState2[0],
      setClosed = _React$useState2[1];

  var ref = React.useRef();

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
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
      return (0, _reactNode.replaceElement)(icon, /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icon), function () {
        return {
          className: (0, _classnames["default"])("".concat(prefixCls, "-icon"), (0, _defineProperty2["default"])({}, icon.props.className, icon.props.className))
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
    }, closeText) : /*#__PURE__*/React.createElement(_CloseOutlined["default"], null)) : null;
  }; // banner 模式默认有 Icon


  var isShowIcon = banner && showIcon === undefined ? true : showIcon;
  var alertCls = (0, _classnames["default"])(prefixCls, "".concat(prefixCls, "-").concat(type), (_classNames2 = {}, (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-with-description"), !!description), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-no-icon"), !isShowIcon), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-banner"), !!banner), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames2), className);
  var dataOrAriaProps = (0, _getDataOrAriaProps["default"])(props);
  return /*#__PURE__*/React.createElement(_rcMotion["default"], {
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
    return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
      ref: ref,
      "data-show": !closed,
      className: (0, _classnames["default"])(alertCls, motionClassName),
      style: (0, _extends2["default"])((0, _extends2["default"])({}, style), motionStyle),
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

Alert.ErrorBoundary = _ErrorBoundary["default"];
var _default = Alert;
exports["default"] = _default;