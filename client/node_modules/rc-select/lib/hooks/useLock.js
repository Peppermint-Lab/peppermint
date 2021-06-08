"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLock;

var React = _interopRequireWildcard(require("react"));

/**
 * Locker return cached mark.
 * If set to `true`, will return `true` in a short time even if set `false`.
 * If set to `false` and then set to `true`, will change to `true`.
 * And after time duration, it will back to `null` automatically.
 */
function useLock() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
  var lockRef = React.useRef(null);
  var timeoutRef = React.useRef(null); // Clean up

  React.useEffect(function () {
    return function () {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function doLock(locked) {
    if (locked || lockRef.current === null) {
      lockRef.current = locked;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(function () {
      lockRef.current = null;
    }, duration);
  }

  return [function () {
    return lockRef.current;
  }, doLock];
}