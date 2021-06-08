import * as React from 'react';
import { useLayoutEffect } from './useLayoutEffect';
/**
 * Work as `componentDidUpdate`
 */

export default function useUpdateEffect(callback, condition) {
  var initRef = React.useRef(false);
  useLayoutEffect(function () {
    if (!initRef.current) {
      initRef.current = true;
      return undefined;
    }

    return callback();
  }, condition);
}