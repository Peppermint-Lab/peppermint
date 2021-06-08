"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLayoutEffect = void 0;

var React = _interopRequireWildcard(require("react"));

var _canUseDom = _interopRequireDefault(require("rc-util/lib/Dom/canUseDom"));

var useLayoutEffect = (0, _canUseDom.default)() ? React.useLayoutEffect : React.useEffect;
exports.useLayoutEffect = useLayoutEffect;