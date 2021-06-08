"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rcCheckbox = _interopRequireDefault(require("rc-checkbox"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ref = require("rc-util/lib/ref");

var _configProvider = require("../config-provider");

var _context = _interopRequireDefault(require("./context"));

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

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

var InternalRadio = function InternalRadio(props, ref) {
  var _classNames;

  var context = React.useContext(_context["default"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var innerRef = React.useRef();
  var mergedRef = (0, _ref.composeRef)(ref, innerRef);
  React.useEffect(function () {
    (0, _devWarning["default"])(!('optionType' in props), 'Radio', '`optionType` is only support in Radio.Group.');
  }, []);

  var onChange = function onChange(e) {
    var _a, _b;

    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e);
    (_b = context === null || context === void 0 ? void 0 : context.onChange) === null || _b === void 0 ? void 0 : _b.call(context, e);
  };

  var customizePrefixCls = props.prefixCls,
      className = props.className,
      children = props.children,
      style = props.style,
      restProps = __rest(props, ["prefixCls", "className", "children", "style"]);

  var prefixCls = getPrefixCls('radio', customizePrefixCls);
  var radioProps = (0, _extends2["default"])({}, restProps);

  if (context) {
    radioProps.name = context.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === context.value;
    radioProps.disabled = props.disabled || context.disabled;
  }

  var wrapperClassString = (0, _classnames["default"])("".concat(prefixCls, "-wrapper"), (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-wrapper-checked"), radioProps.checked), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-wrapper-disabled"), radioProps.disabled), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-wrapper-rtl"), direction === 'rtl'), _classNames), className);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    React.createElement("label", {
      className: wrapperClassString,
      style: style,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave
    }, /*#__PURE__*/React.createElement(_rcCheckbox["default"], (0, _extends2["default"])({}, radioProps, {
      prefixCls: prefixCls,
      ref: mergedRef
    })), children !== undefined ? /*#__PURE__*/React.createElement("span", null, children) : null)
  );
};

var Radio = /*#__PURE__*/React.forwardRef(InternalRadio);
Radio.displayName = 'Radio';
Radio.defaultProps = {
  type: 'radio'
};
var _default = Radio;
exports["default"] = _default;