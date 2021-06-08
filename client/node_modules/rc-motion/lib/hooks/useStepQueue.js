"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isActive = isActive;
exports.default = exports.DoStep = exports.SkipStep = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _interface = require("../interface");

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

var _useNextFrame3 = _interopRequireDefault(require("./useNextFrame"));

var STEP_QUEUE = [_interface.STEP_PREPARE, _interface.STEP_START, _interface.STEP_ACTIVE, _interface.STEP_ACTIVATED];
/** Skip current step */

var SkipStep = false;
/** Current step should be update in */

exports.SkipStep = SkipStep;
var DoStep = true;
exports.DoStep = DoStep;

function isActive(step) {
  return step === _interface.STEP_ACTIVE || step === _interface.STEP_ACTIVATED;
}

var _default = function _default(status, callback) {
  var _React$useState = React.useState(_interface.STEP_NONE),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      step = _React$useState2[0],
      setStep = _React$useState2[1];

  var _useNextFrame = (0, _useNextFrame3.default)(),
      _useNextFrame2 = (0, _slicedToArray2.default)(_useNextFrame, 2),
      nextFrame = _useNextFrame2[0],
      cancelNextFrame = _useNextFrame2[1];

  function startQueue() {
    setStep(_interface.STEP_PREPARE);
  }

  (0, _useIsomorphicLayoutEffect.default)(function () {
    if (step !== _interface.STEP_NONE && step !== _interface.STEP_ACTIVATED) {
      var index = STEP_QUEUE.indexOf(step);
      var nextStep = STEP_QUEUE[index + 1];
      var result = callback(step);

      if (result === SkipStep) {
        // Skip when no needed
        setStep(nextStep);
      } else {
        // Do as frame for step update
        nextFrame(function (info) {
          function doNext() {
            // Skip since current queue is ood
            if (info.isCanceled()) return;
            setStep(nextStep);
          }

          if (result === true) {
            doNext();
          } else {
            // Only promise should be async
            Promise.resolve(result).then(doNext);
          }
        });
      }
    }
  }, [status, step]);
  React.useEffect(function () {
    return function () {
      cancelNextFrame();
    };
  }, []);
  return [startQueue, step];
};

exports.default = _default;