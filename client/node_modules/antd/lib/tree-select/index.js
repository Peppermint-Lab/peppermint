"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TreeNode", {
  enumerable: true,
  get: function get() {
    return _rcTreeSelect.TreeNode;
  }
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _rcTreeSelect = _interopRequireWildcard(require("rc-tree-select"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _configProvider = require("../config-provider");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _iconUtil = _interopRequireDefault(require("../select/utils/iconUtil"));

var _iconUtil2 = _interopRequireDefault(require("../tree/utils/iconUtil"));

var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));

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

var InternalTreeSelect = function InternalTreeSelect(_a, ref) {
  var _classNames2;

  var customizePrefixCls = _a.prefixCls,
      customizeSize = _a.size,
      _a$bordered = _a.bordered,
      bordered = _a$bordered === void 0 ? true : _a$bordered,
      className = _a.className,
      treeCheckable = _a.treeCheckable,
      multiple = _a.multiple,
      _a$listHeight = _a.listHeight,
      listHeight = _a$listHeight === void 0 ? 256 : _a$listHeight,
      _a$listItemHeight = _a.listItemHeight,
      listItemHeight = _a$listItemHeight === void 0 ? 26 : _a$listItemHeight,
      notFoundContent = _a.notFoundContent,
      _switcherIcon = _a.switcherIcon,
      treeLine = _a.treeLine,
      getPopupContainer = _a.getPopupContainer,
      dropdownClassName = _a.dropdownClassName,
      _a$treeIcon = _a.treeIcon,
      treeIcon = _a$treeIcon === void 0 ? false : _a$treeIcon,
      transitionName = _a.transitionName,
      _a$choiceTransitionNa = _a.choiceTransitionName,
      choiceTransitionName = _a$choiceTransitionNa === void 0 ? '' : _a$choiceTransitionNa,
      props = __rest(_a, ["prefixCls", "size", "bordered", "className", "treeCheckable", "multiple", "listHeight", "listItemHeight", "notFoundContent", "switcherIcon", "treeLine", "getPopupContainer", "dropdownClassName", "treeIcon", "transitionName", "choiceTransitionName"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getContextPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      renderEmpty = _React$useContext.renderEmpty,
      direction = _React$useContext.direction,
      virtual = _React$useContext.virtual,
      dropdownMatchSelectWidth = _React$useContext.dropdownMatchSelectWidth;

  var size = React.useContext(_SizeContext["default"]);
  (0, _devWarning["default"])(multiple !== false || !treeCheckable, 'TreeSelect', '`multiple` will alway be `true` when `treeCheckable` is true');
  var prefixCls = getPrefixCls('select', customizePrefixCls);
  var treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
  var treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);
  var mergedDropdownClassName = (0, _classnames["default"])(dropdownClassName, "".concat(treeSelectPrefixCls, "-dropdown"), (0, _defineProperty2["default"])({}, "".concat(treeSelectPrefixCls, "-dropdown-rtl"), direction === 'rtl'));
  var isMultiple = !!(treeCheckable || multiple); // ===================== Icons =====================

  var _getIcons = (0, _iconUtil["default"])((0, _extends2["default"])((0, _extends2["default"])({}, props), {
    multiple: isMultiple,
    prefixCls: prefixCls
  })),
      suffixIcon = _getIcons.suffixIcon,
      removeIcon = _getIcons.removeIcon,
      clearIcon = _getIcons.clearIcon; // ===================== Empty =====================


  var mergedNotFound;

  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else {
    mergedNotFound = renderEmpty('Select');
  } // ==================== Render =====================


  var selectProps = (0, _omit["default"])(props, ['suffixIcon', 'itemIcon', 'removeIcon', 'clearIcon', 'switcherIcon']);
  var mergedSize = customizeSize || size;
  var mergedClassName = (0, _classnames["default"])(!customizePrefixCls && treeSelectPrefixCls, (_classNames2 = {}, (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-lg"), mergedSize === 'large'), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-sm"), mergedSize === 'small'), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-borderless"), !bordered), _classNames2), className);
  var rootPrefixCls = getPrefixCls();
  return /*#__PURE__*/React.createElement(_rcTreeSelect["default"], (0, _extends2["default"])({
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth
  }, selectProps, {
    ref: ref,
    prefixCls: prefixCls,
    className: mergedClassName,
    listHeight: listHeight,
    listItemHeight: listItemHeight,
    treeCheckable: treeCheckable ? /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-tree-checkbox-inner")
    }) : treeCheckable,
    inputIcon: suffixIcon,
    multiple: multiple,
    removeIcon: removeIcon,
    clearIcon: clearIcon,
    switcherIcon: function switcherIcon(nodeProps) {
      return (0, _iconUtil2["default"])(treePrefixCls, _switcherIcon, treeLine, nodeProps);
    },
    showTreeIcon: treeIcon,
    notFoundContent: mergedNotFound,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    treeMotion: null,
    dropdownClassName: mergedDropdownClassName,
    choiceTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, '', choiceTransitionName),
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'slide-up', transitionName)
  }));
};

var TreeSelectRef = /*#__PURE__*/React.forwardRef(InternalTreeSelect);
var TreeSelect = TreeSelectRef;
TreeSelect.TreeNode = _rcTreeSelect.TreeNode;
TreeSelect.SHOW_ALL = _rcTreeSelect.SHOW_ALL;
TreeSelect.SHOW_PARENT = _rcTreeSelect.SHOW_PARENT;
TreeSelect.SHOW_CHILD = _rcTreeSelect.SHOW_CHILD;
var _default = TreeSelect;
exports["default"] = _default;