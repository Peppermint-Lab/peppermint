import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { isPresetColor } from './utils';

var Ribbon = function Ribbon(_ref) {
  var _classNames;

  var className = _ref.className,
      customizePrefixCls = _ref.prefixCls,
      style = _ref.style,
      color = _ref.color,
      children = _ref.children,
      text = _ref.text,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'end' : _ref$placement;

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('ribbon', customizePrefixCls);
  var colorInPreset = isPresetColor(color);
  var ribbonCls = classNames(prefixCls, "".concat(prefixCls, "-placement-").concat(placement), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-color-").concat(color), colorInPreset), _classNames), className);
  var colorStyle = {};
  var cornerColorStyle = {};

  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-wrapper")
  }, children, /*#__PURE__*/React.createElement("div", {
    className: ribbonCls,
    style: _extends(_extends({}, colorStyle), style)
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-text")
  }, text), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-corner"),
    style: cornerColorStyle
  })));
};

export default Ribbon;