import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";

/**
 * Removed props:
 *  - childrenProps
 */
import React from 'react';
import { composeRef } from "rc-util/es/ref";
import isVisible from "rc-util/es/Dom/isVisible";
import { alignElement, alignPoint } from 'dom-align';
import addEventListener from "rc-util/es/Dom/addEventListener";
import { isSamePoint, restoreFocus, monitorResize } from './util';
import useBuffer from './hooks/useBuffer';

function getElement(func) {
  if (typeof func !== 'function') return null;
  return func();
}

function getPoint(point) {
  if (_typeof(point) !== 'object' || !point) return null;
  return point;
}

var Align = function Align(_ref, ref) {
  var children = _ref.children,
      disabled = _ref.disabled,
      target = _ref.target,
      align = _ref.align,
      onAlign = _ref.onAlign,
      monitorWindowResize = _ref.monitorWindowResize,
      _ref$monitorBufferTim = _ref.monitorBufferTime,
      monitorBufferTime = _ref$monitorBufferTim === void 0 ? 0 : _ref$monitorBufferTim;
  var cacheRef = React.useRef({});
  var nodeRef = React.useRef();
  var childNode = React.Children.only(children); // ===================== Align ======================
  // We save the props here to avoid closure makes props ood

  var forceAlignPropsRef = React.useRef({});
  forceAlignPropsRef.current.disabled = disabled;
  forceAlignPropsRef.current.target = target;
  forceAlignPropsRef.current.onAlign = onAlign;

  var _useBuffer = useBuffer(function () {
    var _forceAlignPropsRef$c = forceAlignPropsRef.current,
        latestDisabled = _forceAlignPropsRef$c.disabled,
        latestTarget = _forceAlignPropsRef$c.target,
        latestOnAlign = _forceAlignPropsRef$c.onAlign;

    if (!latestDisabled && latestTarget) {
      var source = nodeRef.current;
      var result;
      var element = getElement(latestTarget);
      var point = getPoint(latestTarget);
      cacheRef.current.element = element;
      cacheRef.current.point = point; // IE lose focus after element realign
      // We should record activeElement and restore later

      var _document = document,
          activeElement = _document.activeElement; // We only align when element is visible

      if (element && isVisible(element)) {
        result = alignElement(source, element, align);
      } else if (point) {
        result = alignPoint(source, point, align);
      }

      restoreFocus(activeElement, source);

      if (latestOnAlign && result) {
        latestOnAlign(source, result);
      }

      return true;
    }

    return false;
  }, monitorBufferTime),
      _useBuffer2 = _slicedToArray(_useBuffer, 2),
      _forceAlign = _useBuffer2[0],
      cancelForceAlign = _useBuffer2[1]; // ===================== Effect =====================
  // Listen for target updated


  var resizeMonitor = React.useRef({
    cancel: function cancel() {}
  }); // Listen for source updated

  var sourceResizeMonitor = React.useRef({
    cancel: function cancel() {}
  });
  React.useEffect(function () {
    var element = getElement(target);
    var point = getPoint(target);

    if (nodeRef.current !== sourceResizeMonitor.current.element) {
      sourceResizeMonitor.current.cancel();
      sourceResizeMonitor.current.element = nodeRef.current;
      sourceResizeMonitor.current.cancel = monitorResize(nodeRef.current, _forceAlign);
    }

    if (cacheRef.current.element !== element || !isSamePoint(cacheRef.current.point, point)) {
      _forceAlign(); // Add resize observer


      if (resizeMonitor.current.element !== element) {
        resizeMonitor.current.cancel();
        resizeMonitor.current.element = element;
        resizeMonitor.current.cancel = monitorResize(element, _forceAlign);
      }
    }
  }); // Listen for disabled change

  React.useEffect(function () {
    if (!disabled) {
      _forceAlign();
    } else {
      cancelForceAlign();
    }
  }, [disabled]); // Listen for window resize

  var winResizeRef = React.useRef(null);
  React.useEffect(function () {
    if (monitorWindowResize) {
      if (!winResizeRef.current) {
        winResizeRef.current = addEventListener(window, 'resize', _forceAlign);
      }
    } else if (winResizeRef.current) {
      winResizeRef.current.remove();
      winResizeRef.current = null;
    }
  }, [monitorWindowResize]); // Clear all if unmount

  React.useEffect(function () {
    return function () {
      resizeMonitor.current.cancel();
      sourceResizeMonitor.current.cancel();
      if (winResizeRef.current) winResizeRef.current.remove();
      cancelForceAlign();
    };
  }, []); // ====================== Ref =======================

  React.useImperativeHandle(ref, function () {
    return {
      forceAlign: function forceAlign() {
        return _forceAlign(true);
      }
    };
  }); // ===================== Render =====================

  if (React.isValidElement(childNode)) {
    childNode = React.cloneElement(childNode, {
      ref: composeRef(childNode.ref, nodeRef)
    });
  }

  return childNode;
};

var RefAlign = React.forwardRef(Align);
RefAlign.displayName = 'Align';
export default RefAlign;