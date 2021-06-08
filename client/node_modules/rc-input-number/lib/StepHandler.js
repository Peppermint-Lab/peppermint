"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StepHandler;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isMobile = _interopRequireDefault(require("rc-util/lib/isMobile"));

/**
 * When click and hold on a button - the speed of auto changing the value.
 */
var STEP_INTERVAL = 200;
/**
 * When click and hold on a button - the delay before auto changing the value.
 */

var STEP_DELAY = 600;

function StepHandler(_ref) {
  var prefixCls = _ref.prefixCls,
      upNode = _ref.upNode,
      downNode = _ref.downNode,
      upDisabled = _ref.upDisabled,
      downDisabled = _ref.downDisabled,
      onStep = _ref.onStep;
  // ======================== Step ========================
  var stepTimeoutRef = React.useRef();
  var onStepRef = React.useRef();
  onStepRef.current = onStep; // We will interval update step when hold mouse down

  var onStepMouseDown = function onStepMouseDown(e, up) {
    e.preventDefault();
    onStepRef.current(up); // Loop step for interval

    function loopStep() {
      onStepRef.current(up);
      stepTimeoutRef.current = setTimeout(loopStep, STEP_INTERVAL);
    } // First time press will wait some time to trigger loop step update


    stepTimeoutRef.current = setTimeout(loopStep, STEP_DELAY);
  };

  var onStopStep = function onStopStep() {
    clearTimeout(stepTimeoutRef.current);
  };

  React.useEffect(function () {
    return onStopStep;
  }, []); // ======================= Render =======================

  if ((0, _isMobile.default)()) {
    return null;
  }

  var handlerClassName = "".concat(prefixCls, "-handler");
  var upClassName = (0, _classnames.default)(handlerClassName, "".concat(handlerClassName, "-up"), (0, _defineProperty2.default)({}, "".concat(handlerClassName, "-up-disabled"), upDisabled));
  var downClassName = (0, _classnames.default)(handlerClassName, "".concat(handlerClassName, "-down"), (0, _defineProperty2.default)({}, "".concat(handlerClassName, "-down-disabled"), downDisabled));
  var sharedHandlerProps = {
    unselectable: 'on',
    role: 'button',
    onMouseUp: onStopStep,
    onMouseLeave: onStopStep
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(handlerClassName, "-wrap")
  }, /*#__PURE__*/React.createElement("span", (0, _extends2.default)({}, sharedHandlerProps, {
    onMouseDown: function onMouseDown(e) {
      onStepMouseDown(e, true);
    },
    "aria-label": "Increase Value",
    "aria-disabled": upDisabled,
    className: upClassName
  }), upNode || /*#__PURE__*/React.createElement("span", {
    unselectable: "on",
    className: "".concat(prefixCls, "-handler-up-inner")
  })), /*#__PURE__*/React.createElement("span", (0, _extends2.default)({}, sharedHandlerProps, {
    onMouseDown: function onMouseDown(e) {
      onStepMouseDown(e, false);
    },
    "aria-label": "Decrease Value",
    "aria-disabled": downDisabled,
    className: downClassName
  }), downNode || /*#__PURE__*/React.createElement("span", {
    unselectable: "on",
    className: "".concat(prefixCls, "-handler-down-inner")
  })));
}