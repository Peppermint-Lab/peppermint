"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterComponents = exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _Row = _interopRequireDefault(require("./Row"));

function Footer(_ref) {
  var children = _ref.children;

  var _React$useContext = React.useContext(_TableContext.default),
      prefixCls = _React$useContext.prefixCls;

  return /*#__PURE__*/React.createElement("tfoot", {
    className: "".concat(prefixCls, "-summary")
  }, children);
}

var _default = Footer;
exports.default = _default;
var FooterComponents = {
  Cell: _Cell.default,
  Row: _Row.default
};
exports.FooterComponents = FooterComponents;