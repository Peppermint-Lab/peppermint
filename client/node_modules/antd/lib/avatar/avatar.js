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

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _ref = require("rc-util/lib/ref");

var _configProvider = require("../config-provider");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _responsiveObserve = require("../_util/responsiveObserve");

var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));

var _SizeContext = _interopRequireDefault(require("./SizeContext"));

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

var InternalAvatar = function InternalAvatar(props, ref) {
  var _classNames, _classNames2;

  var groupSize = React.useContext(_SizeContext["default"]);

  var _React$useState = React.useState(1),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      scale = _React$useState2[0],
      setScale = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      mounted = _React$useState4[0],
      setMounted = _React$useState4[1];

  var _React$useState5 = React.useState(true),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      isImgExist = _React$useState6[0],
      setIsImgExist = _React$useState6[1];

  var avatarNodeRef = React.useRef();
  var avatarChildrenRef = React.useRef();
  var avatarNodeMergeRef = (0, _ref.composeRef)(ref, avatarNodeRef);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var setScaleParam = function setScaleParam() {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return;
    }

    var childrenWidth = avatarChildrenRef.current.offsetWidth; // offsetWidth avoid affecting be transform scale

    var nodeWidth = avatarNodeRef.current.offsetWidth; // denominator is 0 is no meaning

    if (childrenWidth !== 0 && nodeWidth !== 0) {
      var _props$gap = props.gap,
          gap = _props$gap === void 0 ? 4 : _props$gap;

      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
      }
    }
  };

  React.useEffect(function () {
    setMounted(true);
  }, []);
  React.useEffect(function () {
    setIsImgExist(true);
    setScale(1);
  }, [props.src]);
  React.useEffect(function () {
    setScaleParam();
  }, [props.gap]);

  var handleImgLoadError = function handleImgLoadError() {
    var onError = props.onError;
    var errorFlag = onError ? onError() : undefined;

    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };

  var customizePrefixCls = props.prefixCls,
      shape = props.shape,
      customSize = props.size,
      src = props.src,
      srcSet = props.srcSet,
      icon = props.icon,
      className = props.className,
      alt = props.alt,
      draggable = props.draggable,
      children = props.children,
      others = __rest(props, ["prefixCls", "shape", "size", "src", "srcSet", "icon", "className", "alt", "draggable", "children"]);

  var size = customSize === 'default' ? groupSize : customSize;
  var screens = (0, _useBreakpoint["default"])();
  var responsiveSizeStyle = React.useMemo(function () {
    if ((0, _typeof2["default"])(size) !== 'object') {
      return {};
    }

    var currentBreakpoint = _responsiveObserve.responsiveArray.find(function (screen) {
      return screens[screen];
    });

    var currentSize = size[currentBreakpoint];
    return currentSize ? {
      width: currentSize,
      height: currentSize,
      lineHeight: "".concat(currentSize, "px"),
      fontSize: icon ? currentSize / 2 : 18
    } : {};
  }, [screens, size]);
  (0, _devWarning["default"])(!(typeof icon === 'string' && icon.length > 2), 'Avatar', "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(icon, "` at https://ant.design/components/icon"));
  var prefixCls = getPrefixCls('avatar', customizePrefixCls);
  var sizeCls = (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _classNames));
  var hasImageElement = /*#__PURE__*/React.isValidElement(src);
  var classString = (0, _classnames["default"])(prefixCls, sizeCls, (_classNames2 = {}, (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-").concat(shape), !!shape), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-image"), hasImageElement || src && isImgExist), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-icon"), !!icon), _classNames2), className);
  var sizeStyle = typeof size === 'number' ? {
    width: size,
    height: size,
    lineHeight: "".concat(size, "px"),
    fontSize: icon ? size / 2 : 18
  } : {};
  var childrenToRender;

  if (typeof src === 'string' && isImgExist) {
    childrenToRender = /*#__PURE__*/React.createElement("img", {
      src: src,
      draggable: draggable,
      srcSet: srcSet,
      onError: handleImgLoadError,
      alt: alt
    });
  } else if (hasImageElement) {
    childrenToRender = src;
  } else if (icon) {
    childrenToRender = icon;
  } else if (mounted || scale !== 1) {
    var transformString = "scale(".concat(scale, ") translateX(-50%)");
    var childrenStyle = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString
    };
    var sizeChildrenStyle = typeof size === 'number' ? {
      lineHeight: "".concat(size, "px")
    } : {};
    childrenToRender = /*#__PURE__*/React.createElement(_rcResizeObserver["default"], {
      onResize: setScaleParam
    }, /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-string"),
      ref: function ref(node) {
        avatarChildrenRef.current = node;
      },
      style: (0, _extends2["default"])((0, _extends2["default"])({}, sizeChildrenStyle), childrenStyle)
    }, children));
  } else {
    childrenToRender = /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-string"),
      style: {
        opacity: 0
      },
      ref: function ref(node) {
        avatarChildrenRef.current = node;
      }
    }, children);
  } // The event is triggered twice from bubbling up the DOM tree.
  // see https://codesandbox.io/s/kind-snow-9lidz


  delete others.onError;
  delete others.gap;
  return /*#__PURE__*/React.createElement("span", (0, _extends2["default"])({}, others, {
    style: (0, _extends2["default"])((0, _extends2["default"])((0, _extends2["default"])({}, sizeStyle), responsiveSizeStyle), others.style),
    className: classString,
    ref: avatarNodeMergeRef
  }), childrenToRender);
};

var Avatar = /*#__PURE__*/React.forwardRef(InternalAvatar);
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  shape: 'circle',
  size: 'default'
};
var _default = Avatar;
exports["default"] = _default;