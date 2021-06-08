"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useForceUpdate;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

function useForceUpdate() {
  var _React$useReducer = React.useReducer(function (x) {
    return x + 1;
  }, 0),
      _React$useReducer2 = (0, _slicedToArray2["default"])(_React$useReducer, 2),
      forceUpdate = _React$useReducer2[1];

  return forceUpdate;
}