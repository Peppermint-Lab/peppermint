"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _rcMenu = require("rc-menu");

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _MenuContext = _interopRequireDefault(require("./MenuContext"));

var _reactNode = require("../_util/reactNode");

var SubMenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SubMenu, _React$Component);

  var _super = (0, _createSuper2["default"])(SubMenu);

  function SubMenu() {
    (0, _classCallCheck2["default"])(this, SubMenu);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(SubMenu, [{
    key: "renderTitle",
    value: function renderTitle(inlineCollapsed) {
      var _this$props = this.props,
          icon = _this$props.icon,
          title = _this$props.title,
          level = _this$props.level,
          rootPrefixCls = _this$props.rootPrefixCls;

      if (!icon) {
        return inlineCollapsed && level === 1 && title && typeof title === 'string' ? /*#__PURE__*/React.createElement("div", {
          className: "".concat(rootPrefixCls, "-inline-collapsed-noicon")
        }, title.charAt(0)) : title;
      } // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
      // ref: https://github.com/ant-design/ant-design/pull/23456


      var titleIsSpan = (0, _reactNode.isValidElement)(title) && title.type === 'span';
      return /*#__PURE__*/React.createElement(React.Fragment, null, icon, titleIsSpan ? title : /*#__PURE__*/React.createElement("span", null, title));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          rootPrefixCls = _this$props2.rootPrefixCls,
          popupClassName = _this$props2.popupClassName;
      return /*#__PURE__*/React.createElement(_MenuContext["default"].Consumer, null, function (_ref) {
        var inlineCollapsed = _ref.inlineCollapsed,
            antdMenuTheme = _ref.antdMenuTheme;
        return /*#__PURE__*/React.createElement(_rcMenu.SubMenu, (0, _extends2["default"])({}, (0, _omit["default"])(_this.props, ['icon']), {
          title: _this.renderTitle(inlineCollapsed),
          popupClassName: (0, _classnames["default"])(rootPrefixCls, "".concat(rootPrefixCls, "-").concat(antdMenuTheme), popupClassName)
        }));
      });
    }
  }]);
  return SubMenu;
}(React.Component);

SubMenu.contextType = _MenuContext["default"]; // fix issue:https://github.com/ant-design/ant-design/issues/8666

SubMenu.isSubMenu = 1;
var _default = SubMenu;
exports["default"] = _default;