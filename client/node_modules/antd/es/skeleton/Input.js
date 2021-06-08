import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import omit from "rc-util/es/omit";
import classNames from 'classnames';
import Element from './Element';
import { ConfigConsumer } from '../config-provider';

var SkeletonInput = function SkeletonInput(props) {
  var renderSkeletonInput = function renderSkeletonInput(_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var customizePrefixCls = props.prefixCls,
        className = props.className,
        active = props.active;
    var prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    var otherProps = omit(props, ['prefixCls']);
    var cls = classNames(prefixCls, "".concat(prefixCls, "-element"), _defineProperty({}, "".concat(prefixCls, "-active"), active), className);
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, /*#__PURE__*/React.createElement(Element, _extends({
      prefixCls: "".concat(prefixCls, "-input")
    }, otherProps)));
  };

  return /*#__PURE__*/React.createElement(ConfigConsumer, null, renderSkeletonInput);
};

SkeletonInput.defaultProps = {
  size: 'default'
};
export default SkeletonInput;