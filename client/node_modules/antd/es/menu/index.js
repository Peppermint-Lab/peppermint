import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import * as React from 'react';
import RcMenu, { Divider, ItemGroup } from 'rc-menu';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import { ConfigConsumer } from '../config-provider';
import devWarning from '../_util/devWarning';
import { SiderContext } from '../layout/Sider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import MenuContext from './MenuContext';

var InternalMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(InternalMenu, _React$Component);

  var _super = _createSuper(InternalMenu);

  function InternalMenu(props) {
    var _this;

    _classCallCheck(this, InternalMenu);

    _this = _super.call(this, props);

    _this.renderMenu = function (_ref) {
      var getPopupContainer = _ref.getPopupContainer,
          getPrefixCls = _ref.getPrefixCls,
          direction = _ref.direction;
      var rootPrefixCls = getPrefixCls();
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          className = _this$props.className,
          theme = _this$props.theme,
          expandIcon = _this$props.expandIcon;
      var defaultMotions = {
        horizontal: {
          motionName: "".concat(rootPrefixCls, "-slide-up")
        },
        inline: collapseMotion,
        other: {
          motionName: "".concat(rootPrefixCls, "-zoom-big")
        }
      };
      var prefixCls = getPrefixCls('menu', customizePrefixCls);
      var menuClassName = classNames("".concat(prefixCls, "-").concat(theme), _defineProperty({}, "".concat(prefixCls, "-inline-collapsed"), _this.getInlineCollapsed()), className);
      return /*#__PURE__*/React.createElement(MenuContext.Provider, {
        value: {
          inlineCollapsed: _this.getInlineCollapsed() || false,
          antdMenuTheme: theme,
          direction: direction
        }
      }, /*#__PURE__*/React.createElement(RcMenu, _extends({
        getPopupContainer: getPopupContainer
      }, _this.props, {
        className: menuClassName,
        prefixCls: prefixCls,
        direction: direction,
        defaultMotions: defaultMotions,
        expandIcon: cloneElement(expandIcon, {
          className: "".concat(prefixCls, "-submenu-expand-icon")
        })
      })));
    };

    devWarning(!('inlineCollapsed' in props && props.mode !== 'inline'), 'Menu', '`inlineCollapsed` should only be used when `mode` is inline.');
    devWarning(!(props.siderCollapsed !== undefined && 'inlineCollapsed' in props), 'Menu', '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.');
    return _this;
  }

  _createClass(InternalMenu, [{
    key: "getInlineCollapsed",
    value: function getInlineCollapsed() {
      var _this$props2 = this.props,
          inlineCollapsed = _this$props2.inlineCollapsed,
          siderCollapsed = _this$props2.siderCollapsed;

      if (siderCollapsed !== undefined) {
        return siderCollapsed;
      }

      return inlineCollapsed;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConfigConsumer, null, this.renderMenu);
    }
  }]);

  return InternalMenu;
}(React.Component);

InternalMenu.defaultProps = {
  className: '',
  theme: 'light',
  focusable: false
}; // We should keep this as ref-able

var Menu = /*#__PURE__*/function (_React$Component2) {
  _inherits(Menu, _React$Component2);

  var _super2 = _createSuper(Menu);

  function Menu() {
    _classCallCheck(this, Menu);

    return _super2.apply(this, arguments);
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(SiderContext.Consumer, null, function (context) {
        return /*#__PURE__*/React.createElement(InternalMenu, _extends({}, _this2.props, context));
      });
    }
  }]);

  return Menu;
}(React.Component);

Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
export default Menu;