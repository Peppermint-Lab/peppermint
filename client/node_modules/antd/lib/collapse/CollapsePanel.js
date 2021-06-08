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

var _rcCollapse = _interopRequireDefault(require("rc-collapse"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var CollapsePanel = function CollapsePanel(props) {
  (0, _devWarning["default"])(!('disabled' in props), 'Collapse.Panel', '`disabled` is deprecated. Please use `collapsible="disabled"` instead.');

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var customizePrefixCls = props.prefixCls,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      _props$showArrow = props.showArrow,
      showArrow = _props$showArrow === void 0 ? true : _props$showArrow;
  var prefixCls = getPrefixCls('collapse', customizePrefixCls);
  var collapsePanelClassName = (0, _classnames["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-no-arrow"), !showArrow), className);
  return /*#__PURE__*/React.createElement(_rcCollapse["default"].Panel, (0, _extends2["default"])({}, props, {
    prefixCls: prefixCls,
    className: collapsePanelClassName
  }));
};

var _default = CollapsePanel;
exports["default"] = _default;