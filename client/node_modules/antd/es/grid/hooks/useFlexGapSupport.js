import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { detectFlexGapSupported } from '../../_util/styleChecker';
export default (function () {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      flexible = _React$useState2[0],
      setFlexible = _React$useState2[1];

  React.useEffect(function () {
    setFlexible(detectFlexGapSupported());
  }, []);
  return flexible;
});