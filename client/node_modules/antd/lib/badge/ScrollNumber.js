"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _reactNode = require("../_util/reactNode");

var _SingleNumber = _interopRequireDefault(require("./SingleNumber"));

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

var ScrollNumber = function ScrollNumber(_a) {
  var customizePrefixCls = _a.prefixCls,
      count = _a.count,
      className = _a.className,
      motionClassName = _a.motionClassName,
      style = _a.style,
      title = _a.title,
      show = _a.show,
      _a$component = _a.component,
      component = _a$component === void 0 ? 'sup' : _a$component,
      children = _a.children,
      restProps = __rest(_a, ["prefixCls", "count", "className", "motionClassName", "style", "title", "show", "component", "children"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('scroll-number', customizePrefixCls); // ============================ Render ============================

  var newProps = (0, _extends2["default"])((0, _extends2["default"])({}, restProps), {
    'data-show': show,
    style: style,
    className: (0, _classnames["default"])(prefixCls, className, motionClassName),
    title: title
  }); // Only integer need motion

  var numberNodes = count;

  if (count && Number(count) % 1 === 0) {
    var numberList = String(count).split('');
    numberNodes = numberList.map(function (num, i) {
      return /*#__PURE__*/React.createElement(_SingleNumber["default"], {
        prefixCls: prefixCls,
        count: Number(count),
        value: num // eslint-disable-next-line react/no-array-index-key
        ,
        key: numberList.length - i
      });
    });
  } // allow specify the border
  // mock border-color by box-shadow for compatible with old usage:
  // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />


  if (style && style.borderColor) {
    newProps.style = (0, _extends2["default"])((0, _extends2["default"])({}, style), {
      boxShadow: "0 0 0 1px ".concat(style.borderColor, " inset")
    });
  }

  if (children) {
    return (0, _reactNode.cloneElement)(children, function (oriProps) {
      return {
        className: (0, _classnames["default"])("".concat(prefixCls, "-custom-component"), oriProps === null || oriProps === void 0 ? void 0 : oriProps.className, motionClassName)
      };
    });
  }

  return /*#__PURE__*/React.createElement(component, newProps, numberNodes);
};

var _default = ScrollNumber;
exports["default"] = _default;