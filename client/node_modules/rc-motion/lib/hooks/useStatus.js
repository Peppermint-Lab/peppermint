"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStatus;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _interface = require("../interface");

var _useState7 = _interopRequireDefault(require("./useState"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

var _useStepQueue3 = _interopRequireWildcard(require("./useStepQueue"));

var _useDomMotionEvents3 = _interopRequireDefault(require("./useDomMotionEvents"));

function useStatus(supportMotion, visible, getElement, _ref) {
  var _ref$motionEnter = _ref.motionEnter,
      motionEnter = _ref$motionEnter === void 0 ? true : _ref$motionEnter,
      _ref$motionAppear = _ref.motionAppear,
      motionAppear = _ref$motionAppear === void 0 ? true : _ref$motionAppear,
      _ref$motionLeave = _ref.motionLeave,
      motionLeave = _ref$motionLeave === void 0 ? true : _ref$motionLeave,
      motionDeadline = _ref.motionDeadline,
      motionLeaveImmediately = _ref.motionLeaveImmediately,
      onAppearPrepare = _ref.onAppearPrepare,
      onEnterPrepare = _ref.onEnterPrepare,
      onLeavePrepare = _ref.onLeavePrepare,
      onAppearStart = _ref.onAppearStart,
      onEnterStart = _ref.onEnterStart,
      onLeaveStart = _ref.onLeaveStart,
      onAppearActive = _ref.onAppearActive,
      onEnterActive = _ref.onEnterActive,
      onLeaveActive = _ref.onLeaveActive,
      onAppearEnd = _ref.onAppearEnd,
      onEnterEnd = _ref.onEnterEnd,
      onLeaveEnd = _ref.onLeaveEnd,
      onVisibleChanged = _ref.onVisibleChanged;

  // Used for outer render usage to avoid `visible: false & status: none` to render nothing
  var _useState = (0, _useState7.default)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      asyncVisible = _useState2[0],
      setAsyncVisible = _useState2[1];

  var _useState3 = (0, _useState7.default)(_interface.STATUS_NONE),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = (0, _useState7.default)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      style = _useState6[0],
      setStyle = _useState6[1];

  var mountedRef = (0, React.useRef)(false);
  var deadlineRef = (0, React.useRef)(null);
  var destroyedRef = (0, React.useRef)(false); // =========================== Dom Node ===========================

  var cacheElementRef = (0, React.useRef)(null);

  function getDomElement() {
    var element = getElement();
    return element || cacheElementRef.current;
  } // ========================== Motion End ==========================


  var activeRef = (0, React.useRef)(false);

  function onInternalMotionEnd(event) {
    var element = getDomElement();

    if (event && !event.deadline && event.target !== element) {
      // event exists
      // not initiated by deadline
      // transitionEnd not fired by inner elements
      return;
    }

    var canEnd;

    if (status === _interface.STATUS_APPEAR && activeRef.current) {
      canEnd = onAppearEnd === null || onAppearEnd === void 0 ? void 0 : onAppearEnd(element, event);
    } else if (status === _interface.STATUS_ENTER && activeRef.current) {
      canEnd = onEnterEnd === null || onEnterEnd === void 0 ? void 0 : onEnterEnd(element, event);
    } else if (status === _interface.STATUS_LEAVE && activeRef.current) {
      canEnd = onLeaveEnd === null || onLeaveEnd === void 0 ? void 0 : onLeaveEnd(element, event);
    } // Only update status when `canEnd` and not destroyed


    if (canEnd !== false && !destroyedRef.current) {
      setStatus(_interface.STATUS_NONE);
      setStyle(null);
    }
  }

  var _useDomMotionEvents = (0, _useDomMotionEvents3.default)(onInternalMotionEnd),
      _useDomMotionEvents2 = (0, _slicedToArray2.default)(_useDomMotionEvents, 1),
      patchMotionEvents = _useDomMotionEvents2[0]; // ============================= Step =============================


  var eventHandlers = React.useMemo(function () {
    var _ref2, _ref3, _ref4;

    switch (status) {
      case 'appear':
        return _ref2 = {}, (0, _defineProperty2.default)(_ref2, _interface.STEP_PREPARE, onAppearPrepare), (0, _defineProperty2.default)(_ref2, _interface.STEP_START, onAppearStart), (0, _defineProperty2.default)(_ref2, _interface.STEP_ACTIVE, onAppearActive), _ref2;

      case 'enter':
        return _ref3 = {}, (0, _defineProperty2.default)(_ref3, _interface.STEP_PREPARE, onEnterPrepare), (0, _defineProperty2.default)(_ref3, _interface.STEP_START, onEnterStart), (0, _defineProperty2.default)(_ref3, _interface.STEP_ACTIVE, onEnterActive), _ref3;

      case 'leave':
        return _ref4 = {}, (0, _defineProperty2.default)(_ref4, _interface.STEP_PREPARE, onLeavePrepare), (0, _defineProperty2.default)(_ref4, _interface.STEP_START, onLeaveStart), (0, _defineProperty2.default)(_ref4, _interface.STEP_ACTIVE, onLeaveActive), _ref4;

      default:
        return {};
    }
  }, [status]);

  var _useStepQueue = (0, _useStepQueue3.default)(status, function (newStep) {
    // Only prepare step can be skip
    if (newStep === _interface.STEP_PREPARE) {
      var onPrepare = eventHandlers[_interface.STEP_PREPARE];

      if (!onPrepare) {
        return _useStepQueue3.SkipStep;
      }

      return onPrepare(getDomElement());
    } // Rest step is sync update


    // Rest step is sync update
    if (step in eventHandlers) {
      var _eventHandlers$step;

      setStyle(((_eventHandlers$step = eventHandlers[step]) === null || _eventHandlers$step === void 0 ? void 0 : _eventHandlers$step.call(eventHandlers, getDomElement(), null)) || null);
    }

    if (step === _interface.STEP_ACTIVE) {
      // Patch events when motion needed
      patchMotionEvents(getDomElement());

      if (motionDeadline > 0) {
        clearTimeout(deadlineRef.current);
        deadlineRef.current = setTimeout(function () {
          onInternalMotionEnd({
            deadline: true
          });
        }, motionDeadline);
      }
    }

    return _useStepQueue3.DoStep;
  }),
      _useStepQueue2 = (0, _slicedToArray2.default)(_useStepQueue, 2),
      startStep = _useStepQueue2[0],
      step = _useStepQueue2[1];

  var active = (0, _useStepQueue3.isActive)(step);
  activeRef.current = active; // ============================ Status ============================
  // Update with new status

  (0, _useIsomorphicLayoutEffect.default)(function () {
    setAsyncVisible(visible);
    var isMounted = mountedRef.current;
    mountedRef.current = true;

    if (!supportMotion) {
      return;
    }

    var nextStatus; // Appear

    if (!isMounted && visible && motionAppear) {
      nextStatus = _interface.STATUS_APPEAR;
    } // Enter


    if (isMounted && visible && motionEnter) {
      nextStatus = _interface.STATUS_ENTER;
    } // Leave


    if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) {
      nextStatus = _interface.STATUS_LEAVE;
    } // Update to next status


    if (nextStatus) {
      setStatus(nextStatus);
      startStep();
    }
  }, [visible]); // ============================ Effect ============================
  // Reset when motion changed

  (0, React.useEffect)(function () {
    if ( // Cancel appear
    status === _interface.STATUS_APPEAR && !motionAppear || // Cancel enter
    status === _interface.STATUS_ENTER && !motionEnter || // Cancel leave
    status === _interface.STATUS_LEAVE && !motionLeave) {
      setStatus(_interface.STATUS_NONE);
    }
  }, [motionAppear, motionEnter, motionLeave]);
  (0, React.useEffect)(function () {
    return function () {
      clearTimeout(deadlineRef.current);
      destroyedRef.current = true;
    };
  }, []); // Trigger `onVisibleChanged`

  (0, React.useEffect)(function () {
    if (asyncVisible !== undefined && status === _interface.STATUS_NONE) {
      onVisibleChanged === null || onVisibleChanged === void 0 ? void 0 : onVisibleChanged(asyncVisible);
    }
  }, [asyncVisible, status]); // ============================ Styles ============================

  var mergedStyle = style;

  if (eventHandlers[_interface.STEP_PREPARE] && step === _interface.STEP_START) {
    mergedStyle = (0, _objectSpread2.default)({
      transition: 'none'
    }, mergedStyle);
  }

  return [status, step, mergedStyle, asyncVisible !== null && asyncVisible !== void 0 ? asyncVisible : visible];
}