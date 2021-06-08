import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";

/* eslint-disable react/default-props-match-prop-types, react/no-multi-comp, react/prop-types */
import * as React from 'react';
import { useRef } from 'react';
import findDOMNode from "rc-util/es/Dom/findDOMNode";
import { fillRef } from "rc-util/es/ref";
import classNames from 'classnames';
import { getTransitionName, supportTransition } from './util/motion';
import { STATUS_NONE, STEP_PREPARE, STEP_START } from './interface';
import useStatus from './hooks/useStatus';
import DomWrapper from './DomWrapper';
import { isActive } from './hooks/useStepQueue';
/**
 * `transitionSupport` is used for none transition test case.
 * Default we use browser transition event support check.
 */

export function genCSSMotion(config) {
  var transitionSupport = config;

  if (_typeof(config) === 'object') {
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

    var nodeRef = useRef(); // Ref to the dom wrapper in case ref can not pass to HTMLElement

    var wrapperNodeRef = useRef();

    function getDomElement() {
      try {
        return findDOMNode(nodeRef.current || wrapperNodeRef.current);
      } catch (e) {
        // Only happen when `motionDeadline` trigger but element removed.
        return null;
      }
    }

    var _useStatus = useStatus(supportMotion, visible, getDomElement, props),
        _useStatus2 = _slicedToArray(_useStatus, 4),
        status = _useStatus2[0],
        statusStep = _useStatus2[1],
        statusStyle = _useStatus2[2],
        mergedVisible = _useStatus2[3]; // Record whether content has rended
    // Will return null for un-rendered even when `removeOnLeave={false}`


    var renderedRef = React.useRef(mergedVisible);

    if (mergedVisible) {
      renderedRef.current = true;
    } // ====================== Refs ======================


    var originRef = useRef(ref);
    originRef.current = ref;
    var setNodeRef = React.useCallback(function (node) {
      nodeRef.current = node;
      fillRef(originRef.current, node);
    }, []); // ===================== Render =====================

    var motionChildren;

    var mergedProps = _objectSpread(_objectSpread({}, eventProps), {}, {
      visible: visible
    });

    if (!children) {
      // No children
      motionChildren = null;
    } else if (status === STATUS_NONE || !isSupportTransition(props)) {
      // Stable children
      if (mergedVisible) {
        motionChildren = children(_objectSpread({}, mergedProps), setNodeRef);
      } else if (!removeOnLeave && renderedRef.current) {
        motionChildren = children(_objectSpread(_objectSpread({}, mergedProps), {}, {
          className: leavedClassName
        }), setNodeRef);
      } else if (forceRender) {
        motionChildren = children(_objectSpread(_objectSpread({}, mergedProps), {}, {
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

      if (statusStep === STEP_PREPARE) {
        statusSuffix = 'prepare';
      } else if (isActive(statusStep)) {
        statusSuffix = 'active';
      } else if (statusStep === STEP_START) {
        statusSuffix = 'start';
      }

      motionChildren = children(_objectSpread(_objectSpread({}, mergedProps), {}, {
        className: classNames(getTransitionName(motionName, status), (_classNames = {}, _defineProperty(_classNames, getTransitionName(motionName, "".concat(status, "-").concat(statusSuffix)), statusSuffix), _defineProperty(_classNames, motionName, typeof motionName === 'string'), _classNames)),
        style: statusStyle
      }), setNodeRef);
    }

    return /*#__PURE__*/React.createElement(DomWrapper, {
      ref: wrapperNodeRef
    }, motionChildren);
  });
  CSSMotion.displayName = 'CSSMotion';
  return CSSMotion;
}
export default genCSSMotion(supportTransition);