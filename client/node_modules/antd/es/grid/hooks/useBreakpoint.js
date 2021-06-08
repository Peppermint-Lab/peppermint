import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useEffect, useState } from 'react';
import ResponsiveObserve from '../../_util/responsiveObserve';

function useBreakpoint() {
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      screens = _useState2[0],
      setScreens = _useState2[1];

  useEffect(function () {
    var token = ResponsiveObserve.subscribe(function (supportScreens) {
      setScreens(supportScreens);
    });
    return function () {
      return ResponsiveObserve.unsubscribe(token);
    };
  }, []);
  return screens;
}

export default useBreakpoint;