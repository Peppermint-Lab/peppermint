import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useRef } from 'react';
import raf from "rc-util/es/raf";
export default function useFrameState(defaultValue) {
  var _React$useState = React.useState(defaultValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var frameRef = useRef(null);
  var batchRef = useRef([]);
  var destroyRef = useRef(false);
  React.useEffect(function () {
    return function () {
      destroyRef.current = true;
      raf.cancel(frameRef.current);
    };
  }, []);

  function setFrameValue(updater) {
    if (destroyRef.current) {
      return;
    }

    if (frameRef.current === null) {
      batchRef.current = [];
      frameRef.current = raf(function () {
        frameRef.current = null;
        setValue(function (prevValue) {
          var current = prevValue;
          batchRef.current.forEach(function (func) {
            current = func(current);
          });
          return current;
        });
      });
    }

    batchRef.current.push(updater);
  }

  return [value, setFrameValue];
}