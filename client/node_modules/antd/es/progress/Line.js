import _extends from "@babel/runtime/helpers/esm/extends";

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
import { presetPrimaryColors } from '@ant-design/colors';
import { validProgress, getSuccessPercent } from './utils';
/**
 * @example
 *   {
 *     "0%": "#afc163",
 *     "75%": "#009900",
 *     "50%": "green", // ====> '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *     "25%": "#66FF00",
 *     "100%": "#ffffff"
 *   }
 */

export var sortGradient = function sortGradient(gradients) {
  var tempArr = [];
  Object.keys(gradients).forEach(function (key) {
    var formattedKey = parseFloat(key.replace(/%/g, ''));

    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key]
      });
    }
  });
  tempArr = tempArr.sort(function (a, b) {
    return a.key - b.key;
  });
  return tempArr.map(function (_ref) {
    var key = _ref.key,
        value = _ref.value;
    return "".concat(value, " ").concat(key, "%");
  }).join(', ');
};
/**
 * Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
 * butter, there is the bug. And... Besides women, there is the code.
 *
 * @example
 *   {
 *     "0%": "#afc163",
 *     "25%": "#66FF00",
 *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
 *     "100%": "#ffffff"
 *   }
 */

export var handleGradient = function handleGradient(strokeColor, directionConfig) {
  var _strokeColor$from = strokeColor.from,
      from = _strokeColor$from === void 0 ? presetPrimaryColors.blue : _strokeColor$from,
      _strokeColor$to = strokeColor.to,
      to = _strokeColor$to === void 0 ? presetPrimaryColors.blue : _strokeColor$to,
      _strokeColor$directio = strokeColor.direction,
      direction = _strokeColor$directio === void 0 ? directionConfig === 'rtl' ? 'to left' : 'to right' : _strokeColor$directio,
      rest = __rest(strokeColor, ["from", "to", "direction"]);

  if (Object.keys(rest).length !== 0) {
    var sortedGradients = sortGradient(rest);
    return {
      backgroundImage: "linear-gradient(".concat(direction, ", ").concat(sortedGradients, ")")
    };
  }

  return {
    backgroundImage: "linear-gradient(".concat(direction, ", ").concat(from, ", ").concat(to, ")")
  };
};

var Line = function Line(props) {
  var prefixCls = props.prefixCls,
      directionConfig = props.direction,
      percent = props.percent,
      strokeWidth = props.strokeWidth,
      size = props.size,
      strokeColor = props.strokeColor,
      strokeLinecap = props.strokeLinecap,
      children = props.children,
      trailColor = props.trailColor,
      success = props.success;
  var backgroundProps = strokeColor && typeof strokeColor !== 'string' ? handleGradient(strokeColor, directionConfig) : {
    background: strokeColor
  };
  var trailStyle = trailColor ? {
    backgroundColor: trailColor
  } : undefined;

  var percentStyle = _extends({
    width: "".concat(validProgress(percent), "%"),
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : ''
  }, backgroundProps);

  var successPercent = getSuccessPercent(props);
  var successPercentStyle = {
    width: "".concat(validProgress(successPercent), "%"),
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : '',
    backgroundColor: success === null || success === void 0 ? void 0 : success.strokeColor
  };
  var successSegment = successPercent !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-success-bg"),
    style: successPercentStyle
  }) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-outer")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-inner"),
    style: trailStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-bg"),
    style: percentStyle
  }), successSegment)), children);
};

export default Line;