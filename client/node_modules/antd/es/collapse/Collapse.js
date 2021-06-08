import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import toArray from "rc-util/es/Children/toArray";
import omit from "rc-util/es/omit";
import CollapsePanel from './CollapsePanel';
import { ConfigContext } from '../config-provider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';

var Collapse = function Collapse(props) {
  var _classNames;

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var customizePrefixCls = props.prefixCls,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      _props$bordered = props.bordered,
      bordered = _props$bordered === void 0 ? true : _props$bordered,
      ghost = props.ghost;
  var prefixCls = getPrefixCls('collapse', customizePrefixCls);

  var getIconPosition = function getIconPosition() {
    var expandIconPosition = props.expandIconPosition;

    if (expandIconPosition !== undefined) {
      return expandIconPosition;
    }

    return direction === 'rtl' ? 'right' : 'left';
  };

  var renderExpandIcon = function renderExpandIcon() {
    var panelProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var expandIcon = props.expandIcon;
    var icon = expandIcon ? expandIcon(panelProps) : /*#__PURE__*/React.createElement(RightOutlined, {
      rotate: panelProps.isActive ? 90 : undefined
    });
    return cloneElement(icon, function () {
      return {
        className: classNames(icon.props.className, "".concat(prefixCls, "-arrow"))
      };
    });
  };

  var iconPosition = getIconPosition();
  var collapseClassName = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _defineProperty(_classNames, "".concat(prefixCls, "-icon-position-").concat(iconPosition), true), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-ghost"), !!ghost), _classNames), className);

  var openMotion = _extends(_extends({}, collapseMotion), {
    motionAppear: false,
    leavedClassName: "".concat(prefixCls, "-content-hidden")
  });

  var getItems = function getItems() {
    var children = props.children;
    return toArray(children).map(function (child, index) {
      var _a;

      if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.disabled) {
        var key = child.key || String(index);
        var _child$props = child.props,
            disabled = _child$props.disabled,
            collapsible = _child$props.collapsible;

        var childProps = _extends(_extends({}, omit(child.props, ['disabled'])), {
          key: key,
          collapsible: collapsible !== null && collapsible !== void 0 ? collapsible : disabled ? 'disabled' : undefined
        });

        return cloneElement(child, childProps);
      }

      return child;
    });
  };

  return /*#__PURE__*/React.createElement(RcCollapse, _extends({
    openMotion: openMotion
  }, props, {
    bordered: bordered,
    expandIcon: renderExpandIcon,
    prefixCls: prefixCls,
    className: collapseClassName
  }), getItems());
};

Collapse.Panel = CollapsePanel;
export default Collapse;