"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _reactNode = require("../_util/reactNode");

var _configProvider = require("../config-provider");

var _avatar = _interopRequireDefault(require("./avatar"));

var _popover = _interopRequireDefault(require("../popover"));

var _SizeContext = require("./SizeContext");

var Group = function Group(props) {
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var customizePrefixCls = props.prefixCls,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      maxCount = props.maxCount,
      maxStyle = props.maxStyle,
      size = props.size;
  var prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
  var cls = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  var children = props.children,
      _props$maxPopoverPlac = props.maxPopoverPlacement,
      maxPopoverPlacement = _props$maxPopoverPlac === void 0 ? 'top' : _props$maxPopoverPlac;
  var childrenWithProps = (0, _toArray["default"])(children).map(function (child, index) {
    return (0, _reactNode.cloneElement)(child, {
      key: "avatar-key-".concat(index)
    });
  });
  var numOfChildren = childrenWithProps.length;

  if (maxCount && maxCount < numOfChildren) {
    var childrenShow = childrenWithProps.slice(0, maxCount);
    var childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push( /*#__PURE__*/React.createElement(_popover["default"], {
      key: "avatar-popover-key",
      content: childrenHidden,
      trigger: "hover",
      placement: maxPopoverPlacement,
      overlayClassName: "".concat(prefixCls, "-popover")
    }, /*#__PURE__*/React.createElement(_avatar["default"], {
      style: maxStyle
    }, "+".concat(numOfChildren - maxCount))));
    return /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
      size: size
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      style: props.style
    }, childrenShow));
  }

  return /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
    size: size
  }, /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: props.style
  }, childrenWithProps));
};

var _default = Group;
exports["default"] = _default;