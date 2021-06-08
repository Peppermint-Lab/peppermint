"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFrameSetState;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _raf = _interopRequireDefault(require("rc-util/lib/raf"));

function useFrameSetState(initial) {
  var frame = React.useRef(null);

  var _React$useState = React.useState(initial),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var queue = React.useRef([]);

  var setFrameState = function setFrameState(newState) {
    if (frame.current === null) {
      queue.current = [];
      frame.current = (0, _raf.default)(function () {
        setState(function (preState) {
          var memoState = preState;
          queue.current.forEach(function (queueState) {
            memoState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, memoState), queueState);
          });
          frame.current = null;
          return memoState;
        });
      });
    }

    queue.current.push(newState);
  };

  React.useEffect(function () {
    return function () {
      return frame.current && _raf.default.cancel(frame.current);
    };
  }, []);
  return [state, setFrameState];
}