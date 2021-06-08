"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _RowContext = _interopRequireDefault(require("./RowContext"));

var _type = require("../_util/type");

var _responsiveObserve = _interopRequireWildcard(require("../_util/responsiveObserve"));

var _useFlexGapSupport = _interopRequireDefault(require("./hooks/useFlexGapSupport"));

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

var RowAligns = (0, _type.tuple)('top', 'middle', 'bottom', 'stretch');
var RowJustify = (0, _type.tuple)('start', 'end', 'center', 'space-around', 'space-between');
var Row = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;

  var customizePrefixCls = props.prefixCls,
      justify = props.justify,
      align = props.align,
      className = props.className,
      style = props.style,
      children = props.children,
      _props$gutter = props.gutter,
      gutter = _props$gutter === void 0 ? 0 : _props$gutter,
      wrap = props.wrap,
      others = __rest(props, ["prefixCls", "justify", "align", "className", "style", "children", "gutter", "wrap"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var _React$useState = React.useState({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true
  }),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      screens = _React$useState2[0],
      setScreens = _React$useState2[1];

  var supportFlexGap = (0, _useFlexGapSupport["default"])();
  var gutterRef = React.useRef(gutter); // ================================== Effect ==================================

  React.useEffect(function () {
    var token = _responsiveObserve["default"].subscribe(function (screen) {
      var currentGutter = gutterRef.current || 0;

      if (!Array.isArray(currentGutter) && (0, _typeof2["default"])(currentGutter) === 'object' || Array.isArray(currentGutter) && ((0, _typeof2["default"])(currentGutter[0]) === 'object' || (0, _typeof2["default"])(currentGutter[1]) === 'object')) {
        setScreens(screen);
      }
    });

    return function () {
      return _responsiveObserve["default"].unsubscribe(token);
    };
  }, []); // ================================== Render ==================================

  var getGutter = function getGutter() {
    var results = [0, 0];
    var normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
    normalizedGutter.forEach(function (g, index) {
      if ((0, _typeof2["default"])(g) === 'object') {
        for (var i = 0; i < _responsiveObserve.responsiveArray.length; i++) {
          var breakpoint = _responsiveObserve.responsiveArray[i];

          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint];
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  };

  var prefixCls = getPrefixCls('row', customizePrefixCls);
  var gutters = getGutter();
  var classes = (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-no-wrap"), wrap === false), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-").concat(justify), justify), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-").concat(align), align), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className); // Add gutter related style

  var rowStyle = {};
  var horizontalGutter = gutters[0] > 0 ? gutters[0] / -2 : undefined;
  var verticalGutter = gutters[1] > 0 ? gutters[1] / -2 : undefined;

  if (horizontalGutter) {
    rowStyle.marginLeft = horizontalGutter;
    rowStyle.marginRight = horizontalGutter;
  }

  if (supportFlexGap) {
    // Set gap direct if flex gap support
    var _gutters = (0, _slicedToArray2["default"])(gutters, 2);

    rowStyle.rowGap = _gutters[1];
  } else if (verticalGutter) {
    rowStyle.marginTop = verticalGutter;
    rowStyle.marginBottom = verticalGutter;
  }

  var rowContext = React.useMemo(function () {
    return {
      gutter: gutters,
      wrap: wrap,
      supportFlexGap: supportFlexGap
    };
  }, [gutters, wrap, supportFlexGap]);
  return /*#__PURE__*/React.createElement(_RowContext["default"].Provider, {
    value: rowContext
  }, /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, others, {
    className: classes,
    style: (0, _extends2["default"])((0, _extends2["default"])({}, rowStyle), style),
    ref: ref
  }), children));
});
Row.displayName = 'Row';
var _default = Row;
exports["default"] = _default;