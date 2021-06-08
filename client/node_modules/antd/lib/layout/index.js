"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layout = _interopRequireWildcard(require("./layout"));

var _Sider = _interopRequireDefault(require("./Sider"));

var Layout = _layout["default"];
Layout.Header = _layout.Header;
Layout.Footer = _layout.Footer;
Layout.Content = _layout.Content;
Layout.Sider = _Sider["default"];
var _default = Layout;
exports["default"] = _default;