import * as React from 'react';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
/** Always debounce error to avoid [error -> null -> error] blink */

export default function useCacheErrors(errors, changeTrigger, directly) {
  var cacheRef = React.useRef({
    errors: errors,
    visible: !!errors.length
  });
  var forceUpdate = useForceUpdate();

  var update = function update() {
    var prevVisible = cacheRef.current.visible;
    var newVisible = !!errors.length;
    var prevErrors = cacheRef.current.errors;
    cacheRef.current.errors = errors;
    cacheRef.current.visible = newVisible;

    if (prevVisible !== newVisible) {
      changeTrigger(newVisible);
    } else if (prevErrors.length !== errors.length || prevErrors.some(function (prevErr, index) {
      return prevErr !== errors[index];
    })) {
      forceUpdate();
    }
  };

  React.useEffect(function () {
    if (!directly) {
      var timeout = setTimeout(update, 10);
      return function () {
        return clearTimeout(timeout);
      };
    }
  }, [errors]);

  if (directly) {
    update();
  }

  return [cacheRef.current.visible, cacheRef.current.errors];
}