import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import Menu, { MenuItem } from 'rc-menu';
import * as React from 'react';
import { MentionsContextConsumer } from './MentionsContext';
/**
 * We only use Menu to display the candidate.
 * The focus is controlled by textarea to make accessibility easy.
 */

var DropdownMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  var _super = _createSuper(DropdownMenu);

  function DropdownMenu() {
    var _this;

    _classCallCheck(this, DropdownMenu);

    _this = _super.apply(this, arguments);

    _this.renderDropdown = function (_ref) {
      var notFoundContent = _ref.notFoundContent,
          activeIndex = _ref.activeIndex,
          setActiveIndex = _ref.setActiveIndex,
          selectOption = _ref.selectOption,
          onFocus = _ref.onFocus,
          onBlur = _ref.onBlur;
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          options = _this$props.options;
      var activeOption = options[activeIndex] || {};
      return /*#__PURE__*/React.createElement(Menu, {
        prefixCls: "".concat(prefixCls, "-menu"),
        activeKey: activeOption.key,
        onSelect: function onSelect(_ref2) {
          var key = _ref2.key;
          var option = options.find(function (_ref3) {
            var optionKey = _ref3.key;
            return optionKey === key;
          });
          selectOption(option);
        },
        onFocus: onFocus,
        onBlur: onBlur
      }, options.map(function (option, index) {
        var key = option.key,
            disabled = option.disabled,
            children = option.children,
            className = option.className,
            style = option.style;
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: key,
          disabled: disabled,
          className: className,
          style: style,
          onMouseEnter: function onMouseEnter() {
            setActiveIndex(index);
          }
        }, children);
      }), !options.length && /*#__PURE__*/React.createElement(MenuItem, {
        disabled: true
      }, notFoundContent));
    };

    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(MentionsContextConsumer, null, this.renderDropdown);
    }
  }]);

  return DropdownMenu;
}(React.Component);

export default DropdownMenu;