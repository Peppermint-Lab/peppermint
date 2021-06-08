"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _Base = _interopRequireDefault(require("./Base"));

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var Text = function Text(_a) {
  var ellipsis = _a.ellipsis,
      restProps = __rest(_a, ["ellipsis"]);

  var mergedEllipsis = React.useMemo(function () {
    if (ellipsis && (0, _typeof2["default"])(ellipsis) === 'object') {
      return (0, _omit["default"])(ellipsis, ['expandable', 'rows']);
    }

    return ellipsis;
  }, [ellipsis]);
  (0, _devWarning["default"])((0, _typeof2["default"])(ellipsis) !== 'object' || !ellipsis || !('expandable' in ellipsis) && !('rows' in ellipsis), 'Typography.Text', '`ellipsis` do not support `expandable` or `rows` props.');
  return /*#__PURE__*/React.createElement(_Base["default"], (0, _extends2["default"])({}, restProps, {
    ellipsis: mergedEllipsis,
    component: "span"
  }));
};

var _default = Text;
exports["default"] = _default;