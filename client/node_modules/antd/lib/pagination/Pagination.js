"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rcPagination = _interopRequireDefault(require("rc-pagination"));

var _en_US = _interopRequireDefault(require("rc-pagination/lib/locale/en_US"));

var _classnames = _interopRequireDefault(require("classnames"));

var _LeftOutlined = _interopRequireDefault(require("@ant-design/icons/LeftOutlined"));

var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));

var _DoubleLeftOutlined = _interopRequireDefault(require("@ant-design/icons/DoubleLeftOutlined"));

var _DoubleRightOutlined = _interopRequireDefault(require("@ant-design/icons/DoubleRightOutlined"));

var _MiniSelect = _interopRequireDefault(require("./MiniSelect"));

var _select = _interopRequireDefault(require("../select"));

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _configProvider = require("../config-provider");

var _useBreakpoint2 = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));

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

var Pagination = function Pagination(_a) {
  var customizePrefixCls = _a.prefixCls,
      customizeSelectPrefixCls = _a.selectPrefixCls,
      className = _a.className,
      size = _a.size,
      customLocale = _a.locale,
      restProps = __rest(_a, ["prefixCls", "selectPrefixCls", "className", "size", "locale"]);

  var _useBreakpoint = (0, _useBreakpoint2["default"])(),
      xs = _useBreakpoint.xs;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('pagination', customizePrefixCls);

  var getIconsProps = function getIconsProps() {
    var ellipsis = /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-item-ellipsis")
    }, "\u2022\u2022\u2022");
    var prevIcon = /*#__PURE__*/React.createElement("button", {
      className: "".concat(prefixCls, "-item-link"),
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(_LeftOutlined["default"], null));
    var nextIcon = /*#__PURE__*/React.createElement("button", {
      className: "".concat(prefixCls, "-item-link"),
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(_RightOutlined["default"], null));
    var jumpPrevIcon = /*#__PURE__*/React.createElement("a", {
      className: "".concat(prefixCls, "-item-link")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-item-container")
    }, /*#__PURE__*/React.createElement(_DoubleLeftOutlined["default"], {
      className: "".concat(prefixCls, "-item-link-icon")
    }), ellipsis));
    var jumpNextIcon = /*#__PURE__*/React.createElement("a", {
      className: "".concat(prefixCls, "-item-link")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-item-container")
    }, /*#__PURE__*/React.createElement(_DoubleRightOutlined["default"], {
      className: "".concat(prefixCls, "-item-link-icon")
    }), ellipsis)); // change arrows direction in right-to-left direction

    if (direction === 'rtl') {
      var _ref = [nextIcon, prevIcon];
      prevIcon = _ref[0];
      nextIcon = _ref[1];
      var _ref2 = [jumpNextIcon, jumpPrevIcon];
      jumpPrevIcon = _ref2[0];
      jumpNextIcon = _ref2[1];
    }

    return {
      prevIcon: prevIcon,
      nextIcon: nextIcon,
      jumpPrevIcon: jumpPrevIcon,
      jumpNextIcon: jumpNextIcon
    };
  };

  var renderPagination = function renderPagination(contextLocale) {
    var locale = (0, _extends2["default"])((0, _extends2["default"])({}, contextLocale), customLocale);
    var isSmall = size === 'small' || !!(xs && !size && restProps.responsive);
    var selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
    var extendedClassName = (0, _classnames["default"])((0, _defineProperty2["default"])({
      mini: isSmall
    }, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
    return /*#__PURE__*/React.createElement(_rcPagination["default"], (0, _extends2["default"])({}, restProps, {
      prefixCls: prefixCls,
      selectPrefixCls: selectPrefixCls
    }, getIconsProps(), {
      className: extendedClassName,
      selectComponentClass: isSmall ? _MiniSelect["default"] : _select["default"],
      locale: locale
    }));
  };

  return /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
    componentName: "Pagination",
    defaultLocale: _en_US["default"]
  }, renderPagination);
};

var _default = Pagination;
exports["default"] = _default;