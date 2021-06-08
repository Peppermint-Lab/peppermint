"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _ref2 = require("rc-util/lib/ref");

var _isVisible = _interopRequireDefault(require("rc-util/lib/Dom/isVisible"));

var _domAlign = require("dom-align");

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _util = require("./util");

var _useBuffer3 = _interopRequireDefault(require("./hooks/useBuffer"));

/**
 * Removed props:
 *  - childrenProps
 */
function getElement(func) {
  if (typeof func !== 'function') return null;
  return func();
}

function getPoint(point) {
  if ((0, _typeof2.default)(point) !== 'object' || !point) return null;
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

  var cacheRef = _react.default.useRef({});

  var nodeRef = _react.default.useRef();

  var childNode = _react.default.Children.only(children); // ===================== Align ======================
  // We save the props here to avoid closure makes props ood


  var forceAlignPropsRef = _react.default.useRef({});

  forceAlignPropsRef.current.disabled = disabled;
  forceAlignPropsRef.current.target = target;
  forceAlignPropsRef.current.onAlign = onAlign;

  var _useBuffer = (0, _useBuffer3.default)(function () {
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

      if (element && (0, _isVisible.default)(element)) {
        result = (0, _domAlign.alignElement)(source, element, align);
      } else if (point) {
        result = (0, _domAlign.alignPoint)(source, point, align);
      }

      (0, _util.restoreFocus)(activeElement, source);

      if (latestOnAlign && result) {
        latestOnAlign(source, result);
      }

      return true;
    }

    return false;
  }, monitorBufferTime),
      _useBuffer2 = (0, _slicedToArray2.default)(_useBuffer, 2),
      _forceAlign = _useBuffer2[0],
      cancelForceAlign = _useBuffer2[1]; // ===================== Effect =====================
  // Listen for target updated


  var resizeMonitor = _react.default.useRef({
    cancel: function cancel() {}
  }); // Listen for source updated


  var sourceResizeMonitor = _react.default.useRef({
    cancel: function cancel() {}
  });

  _react.default.useEffect(function () {
    var element = getElement(target);
    var point = getPoint(target);

    if (nodeRef.current !== sourceResizeMonitor.current.element) {
      sourceResizeMonitor.current.cancel();
      sourceResizeMonitor.current.element = nodeRef.current;
      sourceResizeMonitor.current.cancel = (0, _util.monitorResize)(nodeRef.current, _forceAlign);
    }

    if (cacheRef.current.element !== element || !(0, _util.isSamePoint)(cacheRef.current.point, point)) {
      _forceAlign(); // Add resize observer


      if (resizeMonitor.current.element !== element) {
        resizeMonitor.current.cancel();
        resizeMonitor.current.element = element;
        resizeMonitor.current.cancel = (0, _util.monitorResize)(element, _forceAlign);
      }
    }
  }); // Listen for disabled change


  _react.default.useEffect(function () {
    if (!disabled) {
      _forceAlign();
    } else {
      cancelForceAlign();
    }
  }, [disabled]); // Listen for window resize


  var winResizeRef = _react.default.useRef(null);

  _react.default.useEffect(function () {
    if (monitorWindowResize) {
      if (!winResizeRef.current) {
        winResizeRef.current = (0, _addEventListener.default)(window, 'resize', _forceAlign);
      }
    } else if (winResizeRef.current) {
      winResizeRef.current.remove();
      winResizeRef.current = null;
    }
  }, [monitorWindowResize]); // Clear all if unmount


  _react.default.useEffect(function () {
    return function () {
      resizeMonitor.current.cancel();
      sourceResizeMonitor.current.cancel();
      if (winResizeRef.current) winResizeRef.current.remove();
      cancelForceAlign();
    };
  }, []); // ====================== Ref =======================


  _react.default.useImperativeHandle(ref, function () {
    return {
      forceAlign: function forceAlign() {
        return _forceAlign(true);
      }
    };
  }); // ===================== Render =====================


  if (_react.default.isValidElement(childNode)) {
    childNode = _react.default.cloneElement(childNode, {
      ref: (0, _ref2.composeRef)(childNode.ref, nodeRef)
    });
  }

  return childNode;
};

var RefAlign = _react.default.forwardRef(Align);

RefAlign.displayName = 'Align';
var _default = RefAlign;
exports.default = _default;