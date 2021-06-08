"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usePatchElement;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

function usePatchElement() {
  var _React$useState = React.useState([]),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      elements = _React$useState2[0],
      setElements = _React$useState2[1];

  var patchElement = React.useCallback(function (element) {
    // append a new element to elements (and create a new ref)
    setElements(function (originElements) {
      return [].concat((0, _toConsumableArray2["default"])(originElements), [element]);
    }); // return a function that removes the new element out of elements (and create a new ref)
    // it works a little like useEffect

    return function () {
      setElements(function (originElements) {
        return originElements.filter(function (ele) {
          return ele !== element;
        });
      });
    };
  }, []);
  return [elements, patchElement];
}