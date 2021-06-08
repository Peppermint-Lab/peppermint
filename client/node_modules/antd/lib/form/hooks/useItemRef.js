"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useItemRef;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _ref = require("rc-util/lib/ref");

var _context = require("../context");

function useItemRef() {
  var _React$useContext = React.useContext(_context.FormContext),
      itemRef = _React$useContext.itemRef;

  var cacheRef = React.useRef({});

  function getRef(name, children) {
    var childrenRef = children && (0, _typeof2["default"])(children) === 'object' && children.ref;
    var nameStr = name.join('_');

    if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
      cacheRef.current.name = nameStr;
      cacheRef.current.originRef = childrenRef;
      cacheRef.current.ref = (0, _ref.composeRef)(itemRef(name), childrenRef);
    }

    return cacheRef.current.ref;
  }

  return getRef;
}