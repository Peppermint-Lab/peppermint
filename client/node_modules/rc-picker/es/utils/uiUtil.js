import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import KeyCode from "rc-util/es/KeyCode";
import raf from "rc-util/es/raf";
import isVisible from "rc-util/es/Dom/isVisible";
var scrollIds = new Map();
/** Trigger when element is visible in view */

export function waitElementReady(element, callback) {
  var id;

  function tryOrNextFrame() {
    if (isVisible(element)) {
      callback();
    } else {
      id = raf(function () {
        tryOrNextFrame();
      });
    }
  }

  tryOrNextFrame();
  return function () {
    raf.cancel(id);
  };
}
/* eslint-disable no-param-reassign */

export function scrollTo(element, to, duration) {
  if (scrollIds.get(element)) {
    cancelAnimationFrame(scrollIds.get(element));
  } // jump to target if duration zero


  if (duration <= 0) {
    scrollIds.set(element, requestAnimationFrame(function () {
      element.scrollTop = to;
    }));
    return;
  }

  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;
  scrollIds.set(element, requestAnimationFrame(function () {
    element.scrollTop += perTick;

    if (element.scrollTop !== to) {
      scrollTo(element, to, duration - 10);
    }
  }));
}
export function createKeyDownHandler(event, _ref) {
  var onLeftRight = _ref.onLeftRight,
      onCtrlLeftRight = _ref.onCtrlLeftRight,
      onUpDown = _ref.onUpDown,
      onPageUpDown = _ref.onPageUpDown,
      onEnter = _ref.onEnter;
  var which = event.which,
      ctrlKey = event.ctrlKey,
      metaKey = event.metaKey;

  switch (which) {
    case KeyCode.LEFT:
      if (ctrlKey || metaKey) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(-1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(-1);
        return true;
      }
      /* istanbul ignore next */


      break;

    case KeyCode.RIGHT:
      if (ctrlKey || metaKey) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(1);
        return true;
      }
      /* istanbul ignore next */


      break;

    case KeyCode.UP:
      if (onUpDown) {
        onUpDown(-1);
        return true;
      }
      /* istanbul ignore next */


      break;

    case KeyCode.DOWN:
      if (onUpDown) {
        onUpDown(1);
        return true;
      }
      /* istanbul ignore next */


      break;

    case KeyCode.PAGE_UP:
      if (onPageUpDown) {
        onPageUpDown(-1);
        return true;
      }
      /* istanbul ignore next */


      break;

    case KeyCode.PAGE_DOWN:
      if (onPageUpDown) {
        onPageUpDown(1);
        return true;
      }
      /* istanbul ignore next */


      break;

    case KeyCode.ENTER:
      if (onEnter) {
        onEnter();
        return true;
      }
      /* istanbul ignore next */


      break;
  }

  return false;
} // ===================== Format =====================

export function getDefaultFormat(format, picker, showTime, use12Hours) {
  var mergedFormat = format;

  if (!mergedFormat) {
    switch (picker) {
      case 'time':
        mergedFormat = use12Hours ? 'hh:mm:ss a' : 'HH:mm:ss';
        break;

      case 'week':
        mergedFormat = 'gggg-wo';
        break;

      case 'month':
        mergedFormat = 'YYYY-MM';
        break;

      case 'quarter':
        mergedFormat = 'YYYY-[Q]Q';
        break;

      case 'year':
        mergedFormat = 'YYYY';
        break;

      default:
        mergedFormat = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    }
  }

  return mergedFormat;
}
export function getInputSize(picker, format, generateConfig) {
  var defaultSize = picker === 'time' ? 8 : 10;
  var length = typeof format === 'function' ? format(generateConfig.getNow()).length : format.length;
  return Math.max(defaultSize, length) + 2;
}
var globalClickFunc = null;
var clickCallbacks = new Set();
export function addGlobalMouseDownEvent(callback) {
  if (!globalClickFunc && typeof window !== 'undefined' && window.addEventListener) {
    globalClickFunc = function globalClickFunc(e) {
      // Clone a new list to avoid repeat trigger events
      _toConsumableArray(clickCallbacks).forEach(function (queueFunc) {
        queueFunc(e);
      });
    };

    window.addEventListener('mousedown', globalClickFunc);
  }

  clickCallbacks.add(callback);
  return function () {
    clickCallbacks.delete(callback);

    if (clickCallbacks.size === 0) {
      window.removeEventListener('mousedown', globalClickFunc);
      globalClickFunc = null;
    }
  };
}
export function getTargetFromEvent(e) {
  var target = e.target; // get target if in shadow dom

  if (e.composed && target.shadowRoot) {
    var _e$composedPath;

    return ((_e$composedPath = e.composedPath) === null || _e$composedPath === void 0 ? void 0 : _e$composedPath.call(e)[0]) || target;
  }

  return target;
} // ====================== Mode ======================

var getYearNextMode = function getYearNextMode(next) {
  if (next === 'month' || next === 'date') {
    return 'year';
  }

  return next;
};

var getMonthNextMode = function getMonthNextMode(next) {
  if (next === 'date') {
    return 'month';
  }

  return next;
};

var getQuarterNextMode = function getQuarterNextMode(next) {
  if (next === 'month' || next === 'date') {
    return 'quarter';
  }

  return next;
};

var getWeekNextMode = function getWeekNextMode(next) {
  if (next === 'date') {
    return 'week';
  }

  return next;
};

export var PickerModeMap = {
  year: getYearNextMode,
  month: getMonthNextMode,
  quarter: getQuarterNextMode,
  week: getWeekNextMode,
  time: null,
  date: null
};
export function elementsContains(elements, target) {
  return elements.some(function (ele) {
    return ele && ele.contains(target);
  });
}