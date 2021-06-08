"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRefs;

var React = _interopRequireWildcard(require("react"));

function useRefs() {
  var cacheRefs = (0, React.useRef)(new Map());

  function getRef(key) {
    if (!cacheRefs.current.has(key)) {
      cacheRefs.current.set(key, /*#__PURE__*/React.createRef());
    }

    return cacheRefs.current.get(key);
  }

  function removeRef(key) {
    cacheRefs.current.delete(key);
  }

  return [getRef, removeRef];
}