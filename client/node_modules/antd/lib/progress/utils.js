"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validProgress = validProgress;
exports.getSuccessPercent = getSuccessPercent;

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }

  if (progress > 100) {
    return 100;
  }

  return progress;
}

function getSuccessPercent(_ref) {
  var success = _ref.success,
      successPercent = _ref.successPercent;
  var percent = successPercent;
  /** @deprecated Use `percent` instead */

  if (success && 'progress' in success) {
    (0, _devWarning["default"])(false, 'Progress', '`success.progress` is deprecated. Please use `success.percent` instead.');
    percent = success.progress;
  }

  if (success && 'percent' in success) {
    percent = success.percent;
  }

  return percent;
}