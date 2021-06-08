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

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

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

var Comment = function Comment(_a) {
  var actions = _a.actions,
      author = _a.author,
      avatar = _a.avatar,
      children = _a.children,
      className = _a.className,
      content = _a.content,
      customizePrefixCls = _a.prefixCls,
      datetime = _a.datetime,
      otherProps = __rest(_a, ["actions", "author", "avatar", "children", "className", "content", "prefixCls", "datetime"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var renderNested = function renderNested(prefixCls, nestedChildren) {
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])("".concat(prefixCls, "-nested"))
    }, nestedChildren);
  };

  var prefixCls = getPrefixCls('comment', customizePrefixCls);
  var avatarDom = avatar ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-avatar")
  }, typeof avatar === 'string' ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "comment-avatar"
  }) : avatar) : null;
  var actionDom = actions && actions.length ? /*#__PURE__*/React.createElement("ul", {
    className: "".concat(prefixCls, "-actions")
  }, actions.map(function (action, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: "action-".concat(index)
    }, action) // eslint-disable-line react/no-array-index-key
    ;
  })) : null;
  var authorContent = (author || datetime) && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content-author")
  }, author && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-author-name")
  }, author), datetime && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-author-time")
  }, datetime));
  var contentDom = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, authorContent, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content-detail")
  }, content), actionDom);
  var cls = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, otherProps, {
    className: cls
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-inner")
  }, avatarDom, contentDom), children ? renderNested(prefixCls, children) : null);
};

var _default = Comment;
exports["default"] = _default;