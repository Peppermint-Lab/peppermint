import devWarning from '../_util/devWarning';
export function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }

  if (progress > 100) {
    return 100;
  }

  return progress;
}
export function getSuccessPercent(_ref) {
  var success = _ref.success,
      successPercent = _ref.successPercent;
  var percent = successPercent;
  /** @deprecated Use `percent` instead */

  if (success && 'progress' in success) {
    devWarning(false, 'Progress', '`success.progress` is deprecated. Please use `success.percent` instead.');
    percent = success.progress;
  }

  if (success && 'percent' in success) {
    percent = success.percent;
  }

  return percent;
}