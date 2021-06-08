import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Tooltip from 'rc-tooltip';
import { composeRef } from "rc-util/es/ref";
import raf from "rc-util/es/raf";
var SliderTooltip = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var visible = props.visible,
      overlay = props.overlay;
  var innerRef = React.useRef(null);
  var tooltipRef = composeRef(ref, innerRef);
  var rafRef = React.useRef(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current);
  }

  function keepAlign() {
    rafRef.current = raf(function () {
      var _innerRef$current;

      (_innerRef$current = innerRef.current) === null || _innerRef$current === void 0 ? void 0 : _innerRef$current.forcePopupAlign();
    });
  }

  React.useEffect(function () {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [visible, overlay]);
  return /*#__PURE__*/React.createElement(Tooltip, _extends({
    ref: tooltipRef
  }, props));
});
export default SliderTooltip;