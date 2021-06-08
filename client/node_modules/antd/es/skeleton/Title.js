import _extends from "@babel/runtime/helpers/esm/extends";

/* eslint-disable jsx-a11y/heading-has-content */
import * as React from 'react';
import classNames from 'classnames';

var Title = function Title(_ref) {
  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      width = _ref.width,
      style = _ref.style;
  return /*#__PURE__*/React.createElement("h3", {
    className: classNames(prefixCls, className),
    style: _extends({
      width: width
    }, style)
  });
};

export default Title;