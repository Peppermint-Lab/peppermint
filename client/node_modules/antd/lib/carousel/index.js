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

var _reactSlick = _interopRequireDefault(require("@ant-design/react-slick"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

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

var Carousel = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var _classNames;

  var _a$dots = _a.dots,
      dots = _a$dots === void 0 ? true : _a$dots,
      _a$arrows = _a.arrows,
      arrows = _a$arrows === void 0 ? false : _a$arrows,
      _a$draggable = _a.draggable,
      draggable = _a$draggable === void 0 ? false : _a$draggable,
      _a$dotPosition = _a.dotPosition,
      dotPosition = _a$dotPosition === void 0 ? 'bottom' : _a$dotPosition,
      props = __rest(_a, ["dots", "arrows", "draggable", "dotPosition"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var slickRef = React.useRef();

  var goTo = function goTo(slide) {
    var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    slickRef.current.slickGoTo(slide, dontAnimate);
  };

  React.useImperativeHandle(ref, function () {
    return {
      goTo: goTo,
      autoPlay: slickRef.current.innerSlider.autoPlay,
      innerSlider: slickRef.current.innerSlider,
      prev: slickRef.current.slickPrev,
      next: slickRef.current.slickNext
    };
  }, [slickRef.current]);
  var prevCount = React.useRef(React.Children.count(props.children));
  React.useEffect(function () {
    if (prevCount.current !== React.Children.count(props.children)) {
      goTo(props.initialSlide || 0, false);
      prevCount.current = React.Children.count(props.children);
    }
  }, [props.children]);
  var newProps = (0, _extends2["default"])({}, props);

  if (newProps.effect === 'fade') {
    newProps.fade = true;
  }

  var prefixCls = getPrefixCls('carousel', newProps.prefixCls);
  var dotsClass = 'slick-dots';
  newProps.vertical = dotPosition === 'left' || dotPosition === 'right';
  var enableDots = !!dots;
  var dsClass = (0, _classnames["default"])(dotsClass, "".concat(dotsClass, "-").concat(dotPosition), typeof dots === 'boolean' ? false : dots === null || dots === void 0 ? void 0 : dots.className);
  var className = (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-vertical"), newProps.vertical), _classNames));
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(_reactSlick["default"], (0, _extends2["default"])({
    ref: slickRef
  }, newProps, {
    dots: enableDots,
    dotsClass: dsClass,
    arrows: arrows,
    draggable: draggable
  })));
});
var _default = Carousel;
exports["default"] = _default;