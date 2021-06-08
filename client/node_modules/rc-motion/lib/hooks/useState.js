"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMountStatus;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

function useMountStatus(defaultValue) {
  var destroyRef = (0, _react.useRef)(false);

  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      val = _useState2[0],
      setVal = _useState2[1];

  function setValue(next) {
    if (!destroyRef.current) {
      setVal(next);
    }
  }

  (0, _react.useEffect)(function () {
    return function () {
      destroyRef.current = true;
    };
  }, []);
  return [val, setValue];
}