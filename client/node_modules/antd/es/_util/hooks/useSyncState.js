import * as React from 'react';
import useForceUpdate from './useForceUpdate';
export default function useSyncState(initialValue) {
  var ref = React.useRef(initialValue);
  var forceUpdate = useForceUpdate();
  return [function () {
    return ref.current;
  }, function (newValue) {
    ref.current = newValue; // re-render

    forceUpdate();
  }];
}