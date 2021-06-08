"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _motion = require("../util/motion");

var _default = function _default(callback) {
  var cacheElementRef = (0, React.useRef)(); // Cache callback

  var callbackRef = (0, React.useRef)(callback);
  callbackRef.current = callback; // Internal motion event handler

  var onInternalMotionEnd = React.useCallback(function (event) {
    callbackRef.current(event);
  }, []); // Remove events

  function removeMotionEvents(element) {
    if (element) {
      element.removeEventListener(_motion.transitionEndName, onInternalMotionEnd);
      element.removeEventListener(_motion.animationEndName, onInternalMotionEnd);
    }
  } // Patch events


  function patchMotionEvents(element) {
    if (cacheElementRef.current && cacheElementRef.current !== element) {
      removeMotionEvents(cacheElementRef.current);
    }

    if (element && element !== cacheElementRef.current) {
      element.addEventListener(_motion.transitionEndName, onInternalMotionEnd);
      element.addEventListener(_motion.animationEndName, onInternalMotionEnd); // Save as cache in case dom removed trigger by `motionDeadline`

      cacheElementRef.current = element;
    }
  } // Clean up when removed


  React.useEffect(function () {
    return function () {
      removeMotionEvents(cacheElementRef.current);
    };
  }, []);
  return [patchMotionEvents, removeMotionEvents];
};

exports.default = _default;