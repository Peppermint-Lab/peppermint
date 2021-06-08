"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSyncState;

var React = _interopRequireWildcard(require("react"));

var _useForceUpdate = _interopRequireDefault(require("./useForceUpdate"));

function useSyncState(initialValue) {
  var ref = React.useRef(initialValue);
  var forceUpdate = (0, _useForceUpdate["default"])();
  return [function () {
    return ref.current;
  }, function (newValue) {
    ref.current = newValue; // re-render

    forceUpdate();
  }];
}