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

var Meta = function Meta(props) {
  return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, function (_ref) {
    var getPrefixCls = _ref.getPrefixCls;

    var customizePrefixCls = props.prefixCls,
        className = props.className,
        avatar = props.avatar,
        title = props.title,
        description = props.description,
        others = __rest(props, ["prefixCls", "className", "avatar", "title", "description"]);

    var prefixCls = getPrefixCls('card', customizePrefixCls);
    var classString = (0, _classnames["default"])("".concat(prefixCls, "-meta"), className);
    var avatarDom = avatar ? /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-meta-avatar")
    }, avatar) : null;
    var titleDom = title ? /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-meta-title")
    }, title) : null;
    var descriptionDom = description ? /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-meta-description")
    }, description) : null;
    var MetaDetail = titleDom || descriptionDom ? /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-meta-detail")
    }, titleDom, descriptionDom) : null;
    return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, others, {
      className: classString
    }), avatarDom, MetaDetail);
  });
};

var _default = Meta;
exports["default"] = _default;