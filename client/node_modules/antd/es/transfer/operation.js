import * as React from 'react';
import LeftOutlined from "@ant-design/icons/es/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import Button from '../button';

var Operation = function Operation(_ref) {
  var disabled = _ref.disabled,
      moveToLeft = _ref.moveToLeft,
      moveToRight = _ref.moveToRight,
      _ref$leftArrowText = _ref.leftArrowText,
      leftArrowText = _ref$leftArrowText === void 0 ? '' : _ref$leftArrowText,
      _ref$rightArrowText = _ref.rightArrowText,
      rightArrowText = _ref$rightArrowText === void 0 ? '' : _ref$rightArrowText,
      leftActive = _ref.leftActive,
      rightActive = _ref.rightActive,
      className = _ref.className,
      style = _ref.style,
      direction = _ref.direction,
      oneWay = _ref.oneWay;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    size: "small",
    disabled: disabled || !rightActive,
    onClick: moveToRight,
    icon: direction !== 'rtl' ? /*#__PURE__*/React.createElement(RightOutlined, null) : /*#__PURE__*/React.createElement(LeftOutlined, null)
  }, rightArrowText), !oneWay && /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    size: "small",
    disabled: disabled || !leftActive,
    onClick: moveToLeft,
    icon: direction !== 'rtl' ? /*#__PURE__*/React.createElement(LeftOutlined, null) : /*#__PURE__*/React.createElement(RightOutlined, null)
  }, leftArrowText));
};

export default Operation;