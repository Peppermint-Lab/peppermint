"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _configProvider = require("../config-provider");

var _getRenderPropValue = require("../_util/getRenderPropValue");

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

var Popover = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var customizePrefixCls = _a.prefixCls,
      title = _a.title,
      content = _a.content,
      otherProps = __rest(_a, ["prefixCls", "title", "content"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var getOverlay = function getOverlay(prefixCls) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-title")
    }, (0, _getRenderPropValue.getRenderPropValue)(title)), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-inner-content")
    }, (0, _getRenderPropValue.getRenderPropValue)(content)));
  };

  var prefixCls = getPrefixCls('popover', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  return /*#__PURE__*/React.createElement(_tooltip["default"], (0, _extends2["default"])({}, otherProps, {
    prefixCls: prefixCls,
    ref: ref,
    overlay: getOverlay(prefixCls),
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom-big', otherProps.transitionName)
  }));
});
Popover.displayName = 'Popover';
Popover.defaultProps = {
  placement: 'top',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {}
};
var _default = Popover;
exports["default"] = _default;