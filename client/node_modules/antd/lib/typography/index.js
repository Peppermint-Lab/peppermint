"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Typography = _interopRequireDefault(require("./Typography"));

var _Text = _interopRequireDefault(require("./Text"));

var _Link = _interopRequireDefault(require("./Link"));

var _Title = _interopRequireDefault(require("./Title"));

var _Paragraph = _interopRequireDefault(require("./Paragraph"));

var Typography = _Typography["default"];
Typography.Text = _Text["default"];
Typography.Link = _Link["default"];
Typography.Title = _Title["default"];
Typography.Paragraph = _Paragraph["default"];
var _default = Typography;
exports["default"] = _default;