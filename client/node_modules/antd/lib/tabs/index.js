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

var _rcTabs = _interopRequireWildcard(require("rc-tabs"));

var _classnames = _interopRequireDefault(require("classnames"));

var _EllipsisOutlined = _interopRequireDefault(require("@ant-design/icons/EllipsisOutlined"));

var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons/PlusOutlined"));

var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _configProvider = require("../config-provider");

var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));

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

function Tabs(_a) {
  var type = _a.type,
      className = _a.className,
      propSize = _a.size,
      _onEdit = _a.onEdit,
      hideAdd = _a.hideAdd,
      centered = _a.centered,
      addIcon = _a.addIcon,
      props = __rest(_a, ["type", "className", "size", "onEdit", "hideAdd", "centered", "addIcon"]);

  var customizePrefixCls = props.prefixCls,
      _props$moreIcon = props.moreIcon,
      moreIcon = _props$moreIcon === void 0 ? /*#__PURE__*/React.createElement(_EllipsisOutlined["default"], null) : _props$moreIcon;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('tabs', customizePrefixCls);
  var editable;

  if (type === 'editable-card') {
    editable = {
      onEdit: function onEdit(editType, _ref) {
        var key = _ref.key,
            event = _ref.event;
        _onEdit === null || _onEdit === void 0 ? void 0 : _onEdit(editType === 'add' ? event : key, editType);
      },
      removeIcon: /*#__PURE__*/React.createElement(_CloseOutlined["default"], null),
      addIcon: addIcon || /*#__PURE__*/React.createElement(_PlusOutlined["default"], null),
      showAdd: hideAdd !== true
    };
  }

  var rootPrefixCls = getPrefixCls();
  (0, _devWarning["default"])(!('onPrevClick' in props) && !('onNextClick' in props), 'Tabs', '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.');
  return /*#__PURE__*/React.createElement(_SizeContext["default"].Consumer, null, function (contextSize) {
    var _classNames;

    var size = propSize !== undefined ? propSize : contextSize;
    return /*#__PURE__*/React.createElement(_rcTabs["default"], (0, _extends2["default"])({
      direction: direction,
      moreTransitionName: "".concat(rootPrefixCls, "-slide-up")
    }, props, {
      className: (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-").concat(size), size), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-card"), ['card', 'editable-card'].includes(type)), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-editable-card"), type === 'editable-card'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-centered"), centered), _classNames), className),
      editable: editable,
      moreIcon: moreIcon,
      prefixCls: prefixCls
    }));
  });
}

Tabs.TabPane = _rcTabs.TabPane;
var _default = Tabs;
exports["default"] = _default;