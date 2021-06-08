"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useUpdateEffect;

var React = _interopRequireWildcard(require("react"));

var _useLayoutEffect = require("./useLayoutEffect");

/**
 * Work as `componentDidUpdate`
 */
function useUpdateEffect(callback, condition) {
  var initRef = React.useRef(false);
  (0, _useLayoutEffect.useLayoutEffect)(function () {
    if (!initRef.current) {
      initRef.current = true;
      return undefined;
    }

    return callback();
  }, condition);
}