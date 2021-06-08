"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _rcDialog = _interopRequireDefault(require("rc-dialog"));

var _classnames5 = _interopRequireDefault(require("classnames"));

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _warning = require("rc-util/lib/warning");

var _useFrameSetState3 = _interopRequireDefault(require("./hooks/useFrameSetState"));

var _getFixScaleEleTransPosition = _interopRequireDefault(require("./getFixScaleEleTransPosition"));

var _PreviewGroup = require("./PreviewGroup");

var useState = React.useState,
    useEffect = React.useEffect;
var initialPosition = {
  x: 0,
  y: 0
};

var Preview = function Preview(props) {
  var prefixCls = props.prefixCls,
      src = props.src,
      alt = props.alt,
      onClose = props.onClose,
      afterClose = props.afterClose,
      visible = props.visible,
      _props$icons = props.icons,
      icons = _props$icons === void 0 ? {} : _props$icons,
      restProps = (0, _objectWithoutProperties2.default)(props, ["prefixCls", "src", "alt", "onClose", "afterClose", "visible", "icons"]);
  var rotateLeft = icons.rotateLeft,
      rotateRight = icons.rotateRight,
      zoomIn = icons.zoomIn,
      zoomOut = icons.zoomOut,
      close = icons.close,
      left = icons.left,
      right = icons.right;

  var _useState = useState(1),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      scale = _useState2[0],
      setScale = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      rotate = _useState4[0],
      setRotate = _useState4[1];

  var _useFrameSetState = (0, _useFrameSetState3.default)(initialPosition),
      _useFrameSetState2 = (0, _slicedToArray2.default)(_useFrameSetState, 2),
      position = _useFrameSetState2[0],
      setPosition = _useFrameSetState2[1];

  var imgRef = React.useRef();
  var originPositionRef = React.useRef({
    originX: 0,
    originY: 0,
    deltaX: 0,
    deltaY: 0
  });

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isMoving = _React$useState2[0],
      setMoving = _React$useState2[1];

  var _React$useContext = React.useContext(_PreviewGroup.context),
      previewUrls = _React$useContext.previewUrls,
      current = _React$useContext.current,
      isPreviewGroup = _React$useContext.isPreviewGroup,
      setCurrent = _React$useContext.setCurrent;

  var previewGroupCount = previewUrls.size;
  var previewUrlsKeys = Array.from(previewUrls.keys());
  var currentPreviewIndex = previewUrlsKeys.indexOf(current);
  var combinationSrc = isPreviewGroup ? previewUrls.get(current) : src;
  var showLeftOrRightSwitches = isPreviewGroup && previewGroupCount > 1;

  var _React$useState3 = React.useState({
    wheelDirection: 0
  }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      lastWheelZoomDirection = _React$useState4[0],
      setLastWheelZoomDirection = _React$useState4[1];

  var onAfterClose = function onAfterClose() {
    setScale(1);
    setRotate(0);
    setPosition(initialPosition);
  };

  var onZoomIn = function onZoomIn() {
    setScale(function (value) {
      return value + 1;
    });
    setPosition(initialPosition);
  };

  var onZoomOut = function onZoomOut() {
    if (scale > 1) {
      setScale(function (value) {
        return value - 1;
      });
    }

    setPosition(initialPosition);
  };

  var onRotateRight = function onRotateRight() {
    setRotate(function (value) {
      return value + 90;
    });
  };

  var onRotateLeft = function onRotateLeft() {
    setRotate(function (value) {
      return value - 90;
    });
  };

  var onSwitchLeft = function onSwitchLeft(event) {
    event.preventDefault(); // Without this mask close will abnormal

    event.stopPropagation();

    if (currentPreviewIndex > 0) {
      setCurrent(previewUrlsKeys[currentPreviewIndex - 1]);
    }
  };

  var onSwitchRight = function onSwitchRight(event) {
    event.preventDefault(); // Without this mask close will abnormal

    event.stopPropagation();

    if (currentPreviewIndex < previewGroupCount - 1) {
      setCurrent(previewUrlsKeys[currentPreviewIndex + 1]);
    }
  };

  var wrapClassName = (0, _classnames5.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-moving"), isMoving));
  var toolClassName = "".concat(prefixCls, "-operations-operation");
  var iconClassName = "".concat(prefixCls, "-operations-icon");
  var tools = [{
    icon: close,
    onClick: onClose,
    type: 'close'
  }, {
    icon: zoomIn,
    onClick: onZoomIn,
    type: 'zoomIn'
  }, {
    icon: zoomOut,
    onClick: onZoomOut,
    type: 'zoomOut',
    disabled: scale === 1
  }, {
    icon: rotateRight,
    onClick: onRotateRight,
    type: 'rotateRight'
  }, {
    icon: rotateLeft,
    onClick: onRotateLeft,
    type: 'rotateLeft'
  }];

  var onMouseUp = function onMouseUp() {
    if (visible && isMoving) {
      var width = imgRef.current.offsetWidth * scale;
      var height = imgRef.current.offsetHeight * scale; // eslint-disable-next-line @typescript-eslint/no-shadow

      var _imgRef$current$getBo = imgRef.current.getBoundingClientRect(),
          _left = _imgRef$current$getBo.left,
          top = _imgRef$current$getBo.top;

      var isRotate = rotate % 180 !== 0;
      setMoving(false);
      var fixState = (0, _getFixScaleEleTransPosition.default)(isRotate ? height : width, isRotate ? width : height, _left, top);

      if (fixState) {
        setPosition((0, _objectSpread2.default)({}, fixState));
      }
    }
  };

  var onMouseDown = function onMouseDown(event) {
    // Only allow main button
    if (event.button !== 0) return;
    event.preventDefault(); // Without this mask close will abnormal

    event.stopPropagation();
    originPositionRef.current.deltaX = event.pageX - position.x;
    originPositionRef.current.deltaY = event.pageY - position.y;
    originPositionRef.current.originX = position.x;
    originPositionRef.current.originY = position.y;
    setMoving(true);
  };

  var onMouseMove = function onMouseMove(event) {
    if (visible && isMoving) {
      setPosition({
        x: event.pageX - originPositionRef.current.deltaX,
        y: event.pageY - originPositionRef.current.deltaY
      });
    }
  };

  var onWheelMove = function onWheelMove(event) {
    if (!visible) return;
    event.preventDefault();
    var wheelDirection = event.deltaY;
    setLastWheelZoomDirection({
      wheelDirection: wheelDirection
    });
  };

  useEffect(function () {
    var wheelDirection = lastWheelZoomDirection.wheelDirection;

    if (wheelDirection > 0) {
      onZoomOut();
    } else if (wheelDirection < 0) {
      onZoomIn();
    }
  }, [lastWheelZoomDirection]);
  useEffect(function () {
    var onTopMouseUpListener;
    var onTopMouseMoveListener;
    var onMouseUpListener = (0, _addEventListener.default)(window, 'mouseup', onMouseUp, false);
    var onMouseMoveListener = (0, _addEventListener.default)(window, 'mousemove', onMouseMove, false);
    var onScrollWheelListener = (0, _addEventListener.default)(window, 'wheel', onWheelMove, {
      passive: false
    });

    try {
      // Resolve if in iframe lost event

      /* istanbul ignore next */
      if (window.top !== window.self) {
        onTopMouseUpListener = (0, _addEventListener.default)(window.top, 'mouseup', onMouseUp, false);
        onTopMouseMoveListener = (0, _addEventListener.default)(window.top, 'mousemove', onMouseMove, false);
      }
    } catch (error) {
      /* istanbul ignore next */
      (0, _warning.warning)(false, "[rc-image] ".concat(error));
    }

    return function () {
      onMouseUpListener.remove();
      onMouseMoveListener.remove();
      onScrollWheelListener.remove();
      /* istanbul ignore next */

      if (onTopMouseUpListener) onTopMouseUpListener.remove();
      /* istanbul ignore next */

      if (onTopMouseMoveListener) onTopMouseMoveListener.remove();
    };
  }, [visible, isMoving]);
  return /*#__PURE__*/React.createElement(_rcDialog.default, (0, _extends2.default)({
    transitionName: "zoom",
    maskTransitionName: "fade",
    closable: false,
    keyboard: true,
    prefixCls: prefixCls,
    onClose: onClose,
    afterClose: onAfterClose,
    visible: visible,
    wrapClassName: wrapClassName
  }, restProps), /*#__PURE__*/React.createElement("ul", {
    className: "".concat(prefixCls, "-operations")
  }, tools.map(function (_ref) {
    var icon = _ref.icon,
        onClick = _ref.onClick,
        type = _ref.type,
        disabled = _ref.disabled;
    return /*#__PURE__*/React.createElement("li", {
      className: (0, _classnames5.default)(toolClassName, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-operations-operation-disabled"), !!disabled)),
      onClick: onClick,
      key: type
    }, /*#__PURE__*/React.isValidElement(icon) ? /*#__PURE__*/React.cloneElement(icon, {
      className: iconClassName
    }) : icon);
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-img-wrapper"),
    style: {
      transform: "translate3d(".concat(position.x, "px, ").concat(position.y, "px, 0)")
    }
  }, /*#__PURE__*/React.createElement("img", {
    onMouseDown: onMouseDown,
    ref: imgRef,
    className: "".concat(prefixCls, "-img"),
    src: combinationSrc,
    alt: alt,
    style: {
      transform: "scale3d(".concat(scale, ", ").concat(scale, ", 1) rotate(").concat(rotate, "deg)")
    }
  })), showLeftOrRightSwitches && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames5.default)("".concat(prefixCls, "-switch-left"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-switch-left-disabled"), currentPreviewIndex === 0)),
    onClick: onSwitchLeft
  }, left), showLeftOrRightSwitches && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames5.default)("".concat(prefixCls, "-switch-right"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-switch-right-disabled"), currentPreviewIndex === previewGroupCount - 1)),
    onClick: onSwitchRight
  }, right));
};

var _default = Preview;
exports.default = _default;