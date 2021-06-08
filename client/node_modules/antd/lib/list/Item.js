"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Meta = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = require("./index");

var _grid = require("../grid");

var _configProvider = require("../config-provider");

var _reactNode = require("../_util/reactNode");

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

var Meta = function Meta(_a) {
  var customizePrefixCls = _a.prefixCls,
      className = _a.className,
      avatar = _a.avatar,
      title = _a.title,
      description = _a.description,
      others = __rest(_a, ["prefixCls", "className", "avatar", "title", "description"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('list', customizePrefixCls);
  var classString = (0, _classnames["default"])("".concat(prefixCls, "-item-meta"), className);
  var content = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-meta-content")
  }, title && /*#__PURE__*/React.createElement("h4", {
    className: "".concat(prefixCls, "-item-meta-title")
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-meta-description")
  }, description));
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, others, {
    className: classString
  }), avatar && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-meta-avatar")
  }, avatar), (title || description) && content);
};

exports.Meta = Meta;

var Item = function Item(_a) {
  var customizePrefixCls = _a.prefixCls,
      children = _a.children,
      actions = _a.actions,
      extra = _a.extra,
      className = _a.className,
      colStyle = _a.colStyle,
      others = __rest(_a, ["prefixCls", "children", "actions", "extra", "className", "colStyle"]);

  var _React$useContext2 = React.useContext(_index.ListContext),
      grid = _React$useContext2.grid,
      itemLayout = _React$useContext2.itemLayout;

  var _React$useContext3 = React.useContext(_configProvider.ConfigContext),
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
  var itemChildren = /*#__PURE__*/React.createElement(Element, (0, _extends2["default"])({}, others, {
    // `li` element `onCopy` prop args is not same as `div`
    className: (0, _classnames["default"])("".concat(prefixCls, "-item"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-item-no-flex"), !isFlexMode()), className)
  }), itemLayout === 'vertical' && extra ? [/*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-main"),
    key: "content"
  }, children, actionsContent), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-extra"),
    key: "extra"
  }, extra)] : [children, actionsContent, (0, _reactNode.cloneElement)(extra, {
    key: 'extra'
  })]);
  return grid ? /*#__PURE__*/React.createElement(_grid.Col, {
    flex: 1,
    style: colStyle
  }, itemChildren) : itemChildren;
};

Item.Meta = Meta;
var _default = Item;
exports["default"] = _default;