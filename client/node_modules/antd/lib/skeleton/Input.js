"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Element = _interopRequireDefault(require("./Element"));

var _configProvider = require("../config-provider");

var SkeletonInput = function SkeletonInput(props) {
  var renderSkeletonInput = function renderSkeletonInput(_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        active = props.active;
    var prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    var otherProps = (0, _omit["default"])(props, ['prefixCls']);
    var cls = (0, _classnames["default"])(prefixCls, "".concat(prefixCls, "-element"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-active"), active), className);
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement(_Element["default"], (0, _extends2["default"])({
      prefixCls: "".concat(prefixCls, "-input")
    }, otherProps)));
  };

  return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, renderSkeletonInput);
};

SkeletonInput.defaultProps = {
  size: 'default'
};
var _default = SkeletonInput;
exports["default"] = _default;