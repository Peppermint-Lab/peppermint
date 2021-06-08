"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Indent = function Indent(_ref) {
  var prefixCls = _ref.prefixCls,
      level = _ref.level,
      isStart = _ref.isStart,
      isEnd = _ref.isEnd;
  var baseClassName = "".concat(prefixCls, "-indent-unit");
  var list = [];

  for (var i = 0; i < level; i += 1) {
    var _classNames;

    list.push( /*#__PURE__*/React.createElement("span", {
      key: i,
      className: (0, _classnames.default)(baseClassName, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(baseClassName, "-start"), isStart[i]), (0, _defineProperty2.default)(_classNames, "".concat(baseClassName, "-end"), isEnd[i]), _classNames))
    }));
  }

  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-indent")
  }, list);
};

var _default = Indent;
exports.default = _default;