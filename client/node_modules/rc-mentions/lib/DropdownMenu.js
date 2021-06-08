"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _rcMenu = _interopRequireWildcard(require("rc-menu"));

var React = _interopRequireWildcard(require("react"));

var _MentionsContext = require("./MentionsContext");

/**
 * We only use Menu to display the candidate.
 * The focus is controlled by textarea to make accessibility easy.
 */
var DropdownMenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DropdownMenu, _React$Component);

  var _super = (0, _createSuper2.default)(DropdownMenu);

  function DropdownMenu() {
    var _this;

    (0, _classCallCheck2.default)(this, DropdownMenu);
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
      return /*#__PURE__*/React.createElement(_rcMenu.default, {
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
        return /*#__PURE__*/React.createElement(_rcMenu.MenuItem, {
          key: key,
          disabled: disabled,
          className: className,
          style: style,
          onMouseEnter: function onMouseEnter() {
            setActiveIndex(index);
          }
        }, children);
      }), !options.length && /*#__PURE__*/React.createElement(_rcMenu.MenuItem, {
        disabled: true
      }, notFoundContent));
    };

    return _this;
  }

  (0, _createClass2.default)(DropdownMenu, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_MentionsContext.MentionsContextConsumer, null, this.renderDropdown);
    }
  }]);
  return DropdownMenu;
}(React.Component);

var _default = DropdownMenu;
exports.default = _default;