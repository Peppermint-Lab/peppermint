"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genCSSMotion = genCSSMotion;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _findDOMNode = _interopRequireDefault(require("rc-util/lib/Dom/findDOMNode"));

var _ref = require("rc-util/lib/ref");

var _classnames = _interopRequireDefault(require("classnames"));

var _motion = require("./util/motion");

var _interface = require("./interface");

var _useStatus3 = _interopRequireDefault(require("./hooks/useStatus"));

var _DomWrapper = _interopRequireDefault(require("./DomWrapper"));

var _useStepQueue = require("./hooks/useStepQueue");

/* eslint-disable react/default-props-match-prop-types, react/no-multi-comp, react/prop-types */

/**
 * `transitionSupport` is used for none transition test case.
 * Default we use browser transition event support check.
 */
function genCSSMotion(config) {
  var transitionSupport = config;

  if ((0, _typeof2.default)(config) === 'object') {
    transitionSupport = config.transitionSupport;
  }

  function isSupportTransition(props) {
    return !!(props.motionName && transitionSupport);
  }

  var CSSMotion = /*#__PURE__*/React.forwardRef(function (props, ref) {
    var _props$visible = props.visible,
        visible = _props$visible === void 0 ? true : _props$visible,
        _props$removeOnLeave = props.removeOnLeave,
        removeOnLeave = _props$removeOnLeave === void 0 ? true : _props$removeOnLeave,
        forceRender = props.forceRender,
        children = props.children,
        motionName = props.motionName,
        leavedClassName = props.leavedClassName,
        eventProps = props.eventProps;
    var supportMotion = isSupportTransition(props); // Ref to the react node, it may be a HTMLElement

    var nodeRef = (0, React.useRef)(); // Ref to the dom wrapper in case ref can not pass to HTMLElement

    var wrapperNodeRef = (0, React.useRef)();

    function getDomElement() {
      try {
        return (0, _findDOMNode.default)(nodeRef.current || wrapperNodeRef.current);
      } catch (e) {
        // Only happen when `motionDeadline` trigger but element removed.
        return null;
      }
    }

    var _useStatus = (0, _useStatus3.default)(supportMotion, visible, getDomElement, props),
        _useStatus2 = (0, _slicedToArray2.default)(_useStatus, 4),
        status = _useStatus2[0],
        statusStep = _useStatus2[1],
        statusStyle = _useStatus2[2],
        mergedVisible = _useStatus2[3]; // Record whether content has rended
    // Will return null for un-rendered even when `removeOnLeave={false}`


    var renderedRef = React.useRef(mergedVisible);

    if (mergedVisible) {
      renderedRef.current = true;
    } // ====================== Refs ======================


    var originRef = (0, React.useRef)(ref);
    originRef.current = ref;
    var setNodeRef = React.useCallback(function (node) {
      nodeRef.current = node;
      (0, _ref.fillRef)(originRef.current, node);
    }, []); // ===================== Render =====================

    var motionChildren;
    var mergedProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, eventProps), {}, {
      visible: visible
    });

    if (!children) {
      // No children
      motionChildren = null;
    } else if (status === _interface.STATUS_NONE || !isSupportTransition(props)) {
      // Stable children
      if (mergedVisible) {
        motionChildren = children((0, _objectSpread2.default)({}, mergedProps), setNodeRef);
      } else if (!removeOnLeave && renderedRef.current) {
        motionChildren = children((0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedProps), {}, {
          className: leavedClassName
        }), setNodeRef);
      } else if (forceRender) {
        motionChildren = children((0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedProps), {}, {
          style: {
            display: 'none'
          }
        }), setNodeRef);
      } else {
        motionChildren = null;
      }
    } else {
      var _classNames;

      // In motion
      var statusSuffix;

      if (statusStep === _interface.STEP_PREPARE) {
        statusSuffix = 'prepare';
      } else if ((0, _useStepQueue.isActive)(statusStep)) {
        statusSuffix = 'active';
      } else if (statusStep === _interface.STEP_START) {
        statusSuffix = 'start';
      }

      motionChildren = children((0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedProps), {}, {
        className: (0, _classnames.default)((0, _motion.getTransitionName)(motionName, status), (_classNames = {}, (0, _defineProperty2.default)(_classNames, (0, _motion.getTransitionName)(motionName, "".concat(status, "-").concat(statusSuffix)), statusSuffix), (0, _defineProperty2.default)(_classNames, motionName, typeof motionName === 'string'), _classNames)),
        style: statusStyle
      }), setNodeRef);
    }

    return /*#__PURE__*/React.createElement(_DomWrapper.default, {
      ref: wrapperNodeRef
    }, motionChildren);
  });
  CSSMotion.displayName = 'CSSMotion';
  return CSSMotion;
}

var _default = genCSSMotion(_motion.supportTransition);

exports.default = _default;