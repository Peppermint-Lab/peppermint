import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

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
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import getIcons from '../select/utils/iconUtil';
import renderSwitcherIcon from '../tree/utils/iconUtil';
import SizeContext from '../config-provider/SizeContext';
import { getTransitionName } from '../_util/motion';

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

  var _React$useContext = React.useContext(ConfigContext),
      getContextPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      renderEmpty = _React$useContext.renderEmpty,
      direction = _React$useContext.direction,
      virtual = _React$useContext.virtual,
      dropdownMatchSelectWidth = _React$useContext.dropdownMatchSelectWidth;

  var size = React.useContext(SizeContext);
  devWarning(multiple !== false || !treeCheckable, 'TreeSelect', '`multiple` will alway be `true` when `treeCheckable` is true');
  var prefixCls = getPrefixCls('select', customizePrefixCls);
  var treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
  var treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);
  var mergedDropdownClassName = classNames(dropdownClassName, "".concat(treeSelectPrefixCls, "-dropdown"), _defineProperty({}, "".concat(treeSelectPrefixCls, "-dropdown-rtl"), direction === 'rtl'));
  var isMultiple = !!(treeCheckable || multiple); // ===================== Icons =====================

  var _getIcons = getIcons(_extends(_extends({}, props), {
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


  var selectProps = omit(props, ['suffixIcon', 'itemIcon', 'removeIcon', 'clearIcon', 'switcherIcon']);
  var mergedSize = customizeSize || size;
  var mergedClassName = classNames(!customizePrefixCls && treeSelectPrefixCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-lg"), mergedSize === 'large'), _defineProperty(_classNames2, "".concat(prefixCls, "-sm"), mergedSize === 'small'), _defineProperty(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _defineProperty(_classNames2, "".concat(prefixCls, "-borderless"), !bordered), _classNames2), className);
  var rootPrefixCls = getPrefixCls();
  return /*#__PURE__*/React.createElement(RcTreeSelect, _extends({
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
      return renderSwitcherIcon(treePrefixCls, _switcherIcon, treeLine, nodeProps);
    },
    showTreeIcon: treeIcon,
    notFoundContent: mergedNotFound,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    treeMotion: null,
    dropdownClassName: mergedDropdownClassName,
    choiceTransitionName: getTransitionName(rootPrefixCls, '', choiceTransitionName),
    transitionName: getTransitionName(rootPrefixCls, 'slide-up', transitionName)
  }));
};

var TreeSelectRef = /*#__PURE__*/React.forwardRef(InternalTreeSelect);
var TreeSelect = TreeSelectRef;
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
export { TreeNode };
export default TreeSelect;