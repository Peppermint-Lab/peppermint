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

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

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

var CheckableTag = function CheckableTag(_a) {
  var _classNames;

  var customizePrefixCls = _a.prefixCls,
      className = _a.className,
      checked = _a.checked,
      onChange = _a.onChange,
      onClick = _a.onClick,
      restProps = __rest(_a, ["prefixCls", "className", "checked", "onChange", "onClick"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var handleClick = function handleClick(e) {
    onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };

  var prefixCls = getPrefixCls('tag', customizePrefixCls);
  var cls = (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-checkable"), true), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-checkable-checked"), checked), _classNames), className);
  return /*#__PURE__*/React.createElement("span", (0, _extends2["default"])({}, restProps, {
    className: cls,
    onClick: handleClick
  }));
};

var _default = CheckableTag;
exports["default"] = _default;