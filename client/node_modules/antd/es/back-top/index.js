import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import CSSMotion from 'rc-motion';
import addEventListener from "rc-util/es/Dom/addEventListener";
import useMergedState from "rc-util/es/hooks/useMergedState";
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import VerticalAlignTopOutlined from "@ant-design/icons/es/icons/VerticalAlignTopOutlined";
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import { cloneElement } from '../_util/reactNode';

var BackTop = function BackTop(props) {
  var _useMergedState = useMergedState(false, {
    value: props.visible
  }),
      _useMergedState2 = _slicedToArray(_useMergedState, 2),
      visible = _useMergedState2[0],
      setVisible = _useMergedState2[1];

  var ref = /*#__PURE__*/React.createRef();
  var scrollEvent = React.useRef();

  var getDefaultTarget = function getDefaultTarget() {
    return ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;
  };

  var handleScroll = throttleByAnimationFrame(function (e) {
    var visibilityHeight = props.visibilityHeight;
    var scrollTop = getScroll(e.target, true);
    setVisible(scrollTop > visibilityHeight);
  });

  var bindScrollEvent = function bindScrollEvent() {
    var target = props.target;
    var getTarget = target || getDefaultTarget;
    var container = getTarget();
    scrollEvent.current = addEventListener(container, 'scroll', function (e) {
      handleScroll(e);
    });
    handleScroll({
      target: container
    });
  };

  React.useEffect(function () {
    bindScrollEvent();
    return function () {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }

      handleScroll.cancel();
    };
  }, [props.target]);

  var scrollToTop = function scrollToTop(e) {
    var onClick = props.onClick,
        target = props.target,
        _props$duration = props.duration,
        duration = _props$duration === void 0 ? 450 : _props$duration;
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration: duration
    });

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  var renderChildren = function renderChildren(_ref) {
    var prefixCls = _ref.prefixCls,
        rootPrefixCls = _ref.rootPrefixCls;
    var children = props.children;
    var defaultElement = /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-icon")
    }, /*#__PURE__*/React.createElement(VerticalAlignTopOutlined, null)));
    return /*#__PURE__*/React.createElement(CSSMotion, {
      visible: visible,
      motionName: "".concat(rootPrefixCls, "-fade"),
      removeOnLeave: true
    }, function (_ref2) {
      var motionClassName = _ref2.className;
      var childNode = children || defaultElement;
      return /*#__PURE__*/React.createElement("div", null, cloneElement(childNode, function (_ref3) {
        var className = _ref3.className;
        return {
          className: classNames(motionClassName, className)
        };
      }));
    });
  };

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var customizePrefixCls = props.prefixCls,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className;
  var prefixCls = getPrefixCls('back-top', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var classString = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className); // fix https://fb.me/react-unknown-prop

  var divProps = omit(props, ['prefixCls', 'className', 'children', 'visibilityHeight', 'target', 'visible']);
  return /*#__PURE__*/React.createElement("div", _extends({}, divProps, {
    className: classString,
    onClick: scrollToTop,
    ref: ref
  }), renderChildren({
    prefixCls: prefixCls,
    rootPrefixCls: rootPrefixCls
  }));
};

BackTop.defaultProps = {
  visibilityHeight: 400
};
export default /*#__PURE__*/React.memo(BackTop);