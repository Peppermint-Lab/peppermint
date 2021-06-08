import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import raf from "rc-util/es/raf";
export default function useFrameSetState(initial) {
  var frame = React.useRef(null);

  var _React$useState = React.useState(initial),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var queue = React.useRef([]);

  var setFrameState = function setFrameState(newState) {
    if (frame.current === null) {
      queue.current = [];
      frame.current = raf(function () {
        setState(function (preState) {
          var memoState = preState;
          queue.current.forEach(function (queueState) {
            memoState = _objectSpread(_objectSpread({}, memoState), queueState);
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
      return frame.current && raf.cancel(frame.current);
    };
  }, []);
  return [state, setFrameState];
}