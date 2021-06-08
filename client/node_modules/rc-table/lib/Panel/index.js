"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function Panel(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

var _default = Panel;
exports.default = _default;