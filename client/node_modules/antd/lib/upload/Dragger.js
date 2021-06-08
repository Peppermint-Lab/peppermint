"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Upload = _interopRequireDefault(require("./Upload"));

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

var InternalDragger = function InternalDragger(_a, ref) {
  var style = _a.style,
      height = _a.height,
      restProps = __rest(_a, ["style", "height"]);

  return /*#__PURE__*/React.createElement(_Upload["default"], (0, _extends2["default"])({
    ref: ref
  }, restProps, {
    type: "drag",
    style: (0, _extends2["default"])((0, _extends2["default"])({}, style), {
      height: height
    })
  }));
};

var Dragger = /*#__PURE__*/React.forwardRef(InternalDragger);
Dragger.displayName = 'Dragger';
var _default = Dragger;
exports["default"] = _default;