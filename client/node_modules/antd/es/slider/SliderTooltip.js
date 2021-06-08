import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useRef } from 'react';
import { composeRef } from "rc-util/es/ref";
import raf from "rc-util/es/raf";
import Tooltip from '../tooltip';
var SliderTooltip = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var visible = props.visible;
  var innerRef = useRef(null);
  var rafRef = useRef(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current);
    rafRef.current = null;
  }

  function keepAlign() {
    rafRef.current = raf(function () {
      var _a;

      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.forcePopupAlign();
      rafRef.current = null;
    });
  }

  React.useEffect(function () {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [visible, props.title]);
  return /*#__PURE__*/React.createElement(Tooltip, _extends({
    ref: composeRef(innerRef, ref)
  }, props));
});
export default SliderTooltip;