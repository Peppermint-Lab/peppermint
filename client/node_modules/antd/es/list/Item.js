import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import classNames from 'classnames';
import { ListContext } from './index';
import { Col } from '../grid';
import { ConfigContext } from '../config-provider';
import { cloneElement } from '../_util/reactNode';
export var Meta = function Meta(_a) {
  var customizePrefixCls = _a.prefixCls,
      className = _a.className,
      avatar = _a.avatar,
      title = _a.title,
      description = _a.description,
      others = __rest(_a, ["prefixCls", "className", "avatar", "title", "description"]);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('list', customizePrefixCls);
  var classString = classNames("".concat(prefixCls, "-item-meta"), className);
  var content = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-meta-content")
  }, title && /*#__PURE__*/React.createElement("h4", {
    className: "".concat(prefixCls, "-item-meta-title")
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-meta-description")
  }, description));
  return /*#__PURE__*/React.createElement("div", _extends({}, others, {
    className: classString
  }), avatar && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-meta-avatar")
  }, avatar), (title || description) && content);
};

var Item = function Item(_a) {
  var customizePrefixCls = _a.prefixCls,
      children = _a.children,
      actions = _a.actions,
      extra = _a.extra,
      className = _a.className,
      colStyle = _a.colStyle,
      others = __rest(_a, ["prefixCls", "children", "actions", "extra", "className", "colStyle"]);

  var _React$useContext2 = React.useContext(ListContext),
      grid = _React$useContext2.grid,
      itemLayout = _React$useContext2.itemLayout;

  var _React$useContext3 = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext3.getPrefixCls;

  var isItemContainsTextNodeAndNotSingular = function isItemContainsTextNodeAndNotSingular() {
    var result;
    React.Children.forEach(children, function (element) {
      if (typeof element === 'string') {
        result = true;
      }
    });
    return result && React.Children.count(children) > 1;
  };

  var isFlexMode = function isFlexMode() {
    if (itemLayout === 'vertical') {
      return !!extra;
    }

    return !isItemContainsTextNodeAndNotSingular();
  };

  var prefixCls = getPrefixCls('list', customizePrefixCls);
  var actionsContent = actions && actions.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: "".concat(prefixCls, "-item-action"),
    key: "actions"
  }, actions.map(function (action, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("li", {
        key: "".concat(prefixCls, "-item-action-").concat(i)
      }, action, i !== actions.length - 1 && /*#__PURE__*/React.createElement("em", {
        className: "".concat(prefixCls, "-item-action-split")
      }))
    );
  }));
  var Element = grid ? 'div' : 'li';
  var itemChildren = /*#__PURE__*/React.createElement(Element, _extends({}, others, {
    // `li` element `onCopy` prop args is not same as `div`
    className: classNames("".concat(prefixCls, "-item"), _defineProperty({}, "".concat(prefixCls, "-item-no-flex"), !isFlexMode()), className)
  }), itemLayout === 'vertical' && extra ? [/*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-main"),
    key: "content"
  }, children, actionsContent), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-extra"),
    key: "extra"
  }, extra)] : [children, actionsContent, cloneElement(extra, {
    key: 'extra'
  })]);
  return grid ? /*#__PURE__*/React.createElement(Col, {
    flex: 1,
    style: colStyle
  }, itemChildren) : itemChildren;
};

Item.Meta = Meta;
export default Item;