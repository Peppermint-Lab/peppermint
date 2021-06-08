import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
export default function useForceUpdate() {
  var _React$useReducer = React.useReducer(function (x) {
    return x + 1;
  }, 0),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      forceUpdate = _React$useReducer2[1];

  return forceUpdate;
}