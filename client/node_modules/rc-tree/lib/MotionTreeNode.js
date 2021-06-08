"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _treeUtil = require("./utils/treeUtil");

var _contextTypes = require("./contextTypes");

var MotionTreeNode = function MotionTreeNode(_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      motion = _ref.motion,
      motionNodes = _ref.motionNodes,
      motionType = _ref.motionType,
      onOriginMotionStart = _ref.onMotionStart,
      onOriginMotionEnd = _ref.onMotionEnd,
      active = _ref.active,
      treeNodeRequiredProps = _ref.treeNodeRequiredProps,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "style", "motion", "motionNodes", "motionType", "onMotionStart", "onMotionEnd", "active", "treeNodeRequiredProps"]);

  var _React$useState = React.useState(true),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var _React$useContext = React.useContext(_contextTypes.TreeContext),
      prefixCls = _React$useContext.prefixCls;

  var motionedRef = React.useRef(false);

  var onMotionEnd = function onMotionEnd() {
    if (!motionedRef.current) {
      onOriginMotionEnd();
    }

    motionedRef.current = true;
  };

  (0, React.useEffect)(function () {
    if (motionNodes && motionType === 'hide' && visible) {
      setVisible(false);
    }
  }, [motionNodes]);
  (0, React.useEffect)(function () {
    // Trigger motion only when patched
    if (motionNodes) {
      onOriginMotionStart();
    }

    return function () {
      if (motionNodes) {
        onMotionEnd();
      }
    };
  }, []);

  if (motionNodes) {
    return /*#__PURE__*/React.createElement(_rcMotion.default, (0, _extends2.default)({
      ref: ref,
      visible: visible
    }, motion, {
      motionAppear: motionType === 'show',
      onAppearEnd: onMotionEnd,
      onLeaveEnd: onMotionEnd
    }), function (_ref2, motionRef) {
      var motionClassName = _ref2.className,
          motionStyle = _ref2.style;
      return /*#__PURE__*/React.createElement("div", {
        ref: motionRef,
        className: (0, _classnames.default)("".concat(prefixCls, "-treenode-motion"), motionClassName),
        style: motionStyle
      }, motionNodes.map(function (treeNode) {
        var _treeNode$data = treeNode.data,
            key = _treeNode$data.key,
            restProps = (0, _objectWithoutProperties2.default)(_treeNode$data, ["key"]),
            isStart = treeNode.isStart,
            isEnd = treeNode.isEnd;
        delete restProps.children;
        var treeNodeProps = (0, _treeUtil.getTreeNodeProps)(key, treeNodeRequiredProps);
        return /*#__PURE__*/React.createElement(_TreeNode.default, (0, _extends2.default)({}, restProps, treeNodeProps, {
          active: active,
          data: treeNode.data,
          key: key,
          isStart: isStart,
          isEnd: isEnd
        }));
      }));
    });
  }

  return /*#__PURE__*/React.createElement(_TreeNode.default, (0, _extends2.default)({
    domRef: ref,
    className: className,
    style: style
  }, props, {
    active: active
  }));
};

MotionTreeNode.displayName = 'MotionTreeNode';
var RefMotionTreeNode = /*#__PURE__*/React.forwardRef(MotionTreeNode);
var _default = RefMotionTreeNode;
exports.default = _default;