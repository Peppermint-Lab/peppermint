import _typeof from "@babel/runtime/helpers/esm/typeof";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import RcSlider, { Range as RcRange, Handle as RcHandle } from 'rc-slider';
import classNames from 'classnames';
import SliderTooltip from './SliderTooltip';
import { ConfigContext } from '../config-provider';
var Slider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction,
      getPopupContainer = _React$useContext.getPopupContainer;

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibles = _React$useState2[0],
      setVisibles = _React$useState2[1];

  var toggleTooltipVisible = function toggleTooltipVisible(index, visible) {
    setVisibles(function (prev) {
      return _extends(_extends({}, prev), _defineProperty({}, index, visible));
    });
  };

  var getTooltipPlacement = function getTooltipPlacement(tooltipPlacement, vertical) {
    if (tooltipPlacement) {
      return tooltipPlacement;
    }

    if (!vertical) {
      return 'top';
    }

    return direction === 'rtl' ? 'left' : 'right';
  };

  var handleWithTooltip = function handleWithTooltip(_a) {
    var tooltipPrefixCls = _a.tooltipPrefixCls,
        prefixCls = _a.prefixCls,
        _b = _a.info,
        value = _b.value,
        dragging = _b.dragging,
        index = _b.index,
        restProps = __rest(_b, ["value", "dragging", "index"]);

    var tipFormatter = props.tipFormatter,
        tooltipVisible = props.tooltipVisible,
        tooltipPlacement = props.tooltipPlacement,
        getTooltipPopupContainer = props.getTooltipPopupContainer,
        vertical = props.vertical;
    var isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
    var visible = tooltipVisible || tooltipVisible === undefined && isTipFormatter;
    var rootPrefixCls = getPrefixCls();
    return /*#__PURE__*/React.createElement(SliderTooltip, {
      prefixCls: tooltipPrefixCls,
      title: tipFormatter ? tipFormatter(value) : '',
      visible: visible,
      placement: getTooltipPlacement(tooltipPlacement, vertical),
      transitionName: "".concat(rootPrefixCls, "-zoom-down"),
      key: index,
      overlayClassName: "".concat(prefixCls, "-tooltip"),
      getPopupContainer: getTooltipPopupContainer || getPopupContainer
    }, /*#__PURE__*/React.createElement(RcHandle, _extends({}, restProps, {
      value: value,
      onMouseEnter: function onMouseEnter() {
        return toggleTooltipVisible(index, true);
      },
      onMouseLeave: function onMouseLeave() {
        return toggleTooltipVisible(index, false);
      }
    })));
  };

  var customizePrefixCls = props.prefixCls,
      customizeTooltipPrefixCls = props.tooltipPrefixCls,
      range = props.range,
      className = props.className,
      restProps = __rest(props, ["prefixCls", "tooltipPrefixCls", "range", "className"]);

  var prefixCls = getPrefixCls('slider', customizePrefixCls);
  var tooltipPrefixCls = getPrefixCls('tooltip', customizeTooltipPrefixCls);
  var cls = classNames(className, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl')); // make reverse default on rtl direction

  if (direction === 'rtl' && !restProps.vertical) {
    restProps.reverse = !restProps.reverse;
  } // extrack draggableTrack from range={{ ... }}


  var draggableTrack;

  if (_typeof(range) === 'object') {
    draggableTrack = range.draggableTrack;
  }

  if (range) {
    return /*#__PURE__*/React.createElement(RcRange, _extends({}, restProps, {
      step: restProps.step,
      draggableTrack: draggableTrack,
      className: cls,
      ref: ref,
      handle: function handle(info) {
        return handleWithTooltip({
          tooltipPrefixCls: tooltipPrefixCls,
          prefixCls: prefixCls,
          info: info
        });
      },
      prefixCls: prefixCls
    }));
  }

  return /*#__PURE__*/React.createElement(RcSlider, _extends({}, restProps, {
    step: restProps.step,
    className: cls,
    ref: ref,
    handle: function handle(info) {
      return handleWithTooltip({
        tooltipPrefixCls: tooltipPrefixCls,
        prefixCls: prefixCls,
        info: info
      });
    },
    prefixCls: prefixCls
  }));
});
Slider.displayName = 'Slider';
Slider.defaultProps = {
  tipFormatter: function tipFormatter(value) {
    return typeof value === 'number' ? value.toString() : '';
  }
};
export default Slider;