"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSticky;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _canUseDom = _interopRequireDefault(require("rc-util/lib/Dom/canUseDom"));

// fix ssr render
var defaultContainer = (0, _canUseDom.default)() ? window : null;
/** Sticky header hooks */

function useSticky(sticky, prefixCls) {
  var _ref = (0, _typeof2.default)(sticky) === 'object' ? sticky : {},
      _ref$offsetHeader = _ref.offsetHeader,
      offsetHeader = _ref$offsetHeader === void 0 ? 0 : _ref$offsetHeader,
      _ref$offsetScroll = _ref.offsetScroll,
      offsetScroll = _ref$offsetScroll === void 0 ? 0 : _ref$offsetScroll,
      _ref$getContainer = _ref.getContainer,
      getContainer = _ref$getContainer === void 0 ? function () {
    return defaultContainer;
  } : _ref$getContainer;

  var container = getContainer() || defaultContainer;
  return React.useMemo(function () {
    var isSticky = !!sticky;
    return {
      isSticky: isSticky,
      stickyClassName: isSticky ? "".concat(prefixCls, "-sticky-header") : '',
      offsetHeader: offsetHeader,
      offsetScroll: offsetScroll,
      container: container
    };
  }, [offsetScroll, offsetHeader, prefixCls, container]);
}