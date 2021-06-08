"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _rcSwitch = _interopRequireDefault(require("rc-switch"));

var _classnames = _interopRequireDefault(require("classnames"));

var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));

var _wave = _interopRequireDefault(require("../_util/wave"));

var _configProvider = require("../config-provider");

var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

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

var Switch = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var _classNames;

  var customizePrefixCls = _a.prefixCls,
      customizeSize = _a.size,
      loading = _a.loading,
      _a$className = _a.className,
      className = _a$className === void 0 ? '' : _a$className,
      disabled = _a.disabled,
      props = __rest(_a, ["prefixCls", "size", "loading", "className", "disabled"]);

  (0, _devWarning["default"])('checked' in props || !('value' in props), 'Switch', '`value` is not a valid prop, do you mean `checked`?');

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var size = React.useContext(_SizeContext["default"]);
  var prefixCls = getPrefixCls('switch', customizePrefixCls);
  var loadingIcon = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-handle")
  }, loading && /*#__PURE__*/React.createElement(_LoadingOutlined["default"], {
    className: "".concat(prefixCls, "-loading-icon")
  }));
  var classes = (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-small"), (customizeSize || size) === 'small'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-loading"), loading), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);
  return /*#__PURE__*/React.createElement(_wave["default"], {
    insertExtraNode: true
  }, /*#__PURE__*/React.createElement(_rcSwitch["default"], (0, _extends2["default"])({}, props, {
    prefixCls: prefixCls,
    className: classes,
    disabled: disabled || loading,
    ref: ref,
    loadingIcon: loadingIcon
  })));
});
Switch.__ANT_SWITCH = true;
Switch.displayName = 'Switch';
var _default = Switch;
exports["default"] = _default;