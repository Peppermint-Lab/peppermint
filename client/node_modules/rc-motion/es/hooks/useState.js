import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useEffect, useState, useRef } from 'react';
export default function useMountStatus(defaultValue) {
  var destroyRef = useRef(false);

  var _useState = useState(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      val = _useState2[0],
      setVal = _useState2[1];

  function setValue(next) {
    if (!destroyRef.current) {
      setVal(next);
    }
  }

  useEffect(function () {
    return function () {
      destroyRef.current = true;
    };
  }, []);
  return [val, setValue];
}