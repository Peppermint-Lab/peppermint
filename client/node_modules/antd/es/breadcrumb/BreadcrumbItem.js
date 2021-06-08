import _extends from "@babel/runtime/helpers/esm/extends";

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
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import DropDown from '../dropdown/dropdown';
import { ConfigContext } from '../config-provider';

var BreadcrumbItem = function BreadcrumbItem(_a) {
  var customizePrefixCls = _a.prefixCls,
      _a$separator = _a.separator,
      separator = _a$separator === void 0 ? '/' : _a$separator,
      children = _a.children,
      overlay = _a.overlay,
      dropdownProps = _a.dropdownProps,
      restProps = __rest(_a, ["prefixCls", "separator", "children", "overlay", "dropdownProps"]);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  /** If overlay is have Wrap a DropDown */

  var renderBreadcrumbNode = function renderBreadcrumbNode(breadcrumbItem) {
    if (overlay) {
      return /*#__PURE__*/React.createElement(DropDown, _extends({
        overlay: overlay,
        placement: "bottomCenter"
      }, dropdownProps), /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-overlay-link")
      }, breadcrumbItem, /*#__PURE__*/React.createElement(DownOutlined, null)));
    }

    return breadcrumbItem;
  };

  var link;

  if ('href' in restProps) {
    link = /*#__PURE__*/React.createElement("a", _extends({
      className: "".concat(prefixCls, "-link")
    }, restProps), children);
  } else {
    link = /*#__PURE__*/React.createElement("span", _extends({
      className: "".concat(prefixCls, "-link")
    }, restProps), children);
  } // wrap to dropDown


  link = renderBreadcrumbNode(link);

  if (children) {
    return /*#__PURE__*/React.createElement("span", null, link, separator && /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-separator")
    }, separator));
  }

  return null;
};

BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
export default BreadcrumbItem;