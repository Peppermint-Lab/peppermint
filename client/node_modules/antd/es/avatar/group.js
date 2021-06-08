import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import classNames from 'classnames';
import toArray from "rc-util/es/Children/toArray";
import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import Avatar from './avatar';
import Popover from '../popover';
import { SizeContextProvider } from './SizeContext';

var Group = function Group(props) {
  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var customizePrefixCls = props.prefixCls,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      maxCount = props.maxCount,
      maxStyle = props.maxStyle,
      size = props.size;
  var prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
  var cls = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  var children = props.children,
      _props$maxPopoverPlac = props.maxPopoverPlacement,
      maxPopoverPlacement = _props$maxPopoverPlac === void 0 ? 'top' : _props$maxPopoverPlac;
  var childrenWithProps = toArray(children).map(function (child, index) {
    return cloneElement(child, {
      key: "avatar-key-".concat(index)
    });
  });
  var numOfChildren = childrenWithProps.length;

  if (maxCount && maxCount < numOfChildren) {
    var childrenShow = childrenWithProps.slice(0, maxCount);
    var childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push( /*#__PURE__*/React.createElement(Popover, {
      key: "avatar-popover-key",
      content: childrenHidden,
      trigger: "hover",
      placement: maxPopoverPlacement,
      overlayClassName: "".concat(prefixCls, "-popover")
    }, /*#__PURE__*/React.createElement(Avatar, {
      style: maxStyle
    }, "+".concat(numOfChildren - maxCount))));
    return /*#__PURE__*/React.createElement(SizeContextProvider, {
      size: size
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      style: props.style
    }, childrenShow));
  }

  return /*#__PURE__*/React.createElement(SizeContextProvider, {
    size: size
  }, /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: props.style
  }, childrenWithProps));
};

export default Group;