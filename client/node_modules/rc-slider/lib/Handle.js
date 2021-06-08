"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var Handle = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Handle, _React$Component);

  var _super = (0, _createSuper2.default)(Handle);

  function Handle() {
    var _this;

    (0, _classCallCheck2.default)(this, Handle);
    _this = _super.apply(this, arguments);
    _this.state = {
      clickFocused: false
    };

    _this.setHandleRef = function (node) {
      _this.handle = node;
    };

    _this.handleMouseUp = function () {
      if (document.activeElement === _this.handle) {
        _this.setClickFocus(true);
      }
    };

    _this.handleMouseDown = function (e) {
      // avoid selecting text during drag
      // https://github.com/ant-design/ant-design/issues/25010
      e.preventDefault(); // fix https://github.com/ant-design/ant-design/issues/15324

      _this.focus();
    };

    _this.handleBlur = function () {
      _this.setClickFocus(false);
    };

    _this.handleKeyDown = function () {
      _this.setClickFocus(false);
    };

    return _this;
  }

  (0, _createClass2.default)(Handle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // mouseup won't trigger if mouse moved out of handle,
      // so we listen on document here.
      this.onMouseUpListener = (0, _addEventListener.default)(document, 'mouseup', this.handleMouseUp);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.onMouseUpListener) {
        this.onMouseUpListener.remove();
      }
    }
  }, {
    key: "setClickFocus",
    value: function setClickFocus(focused) {
      this.setState({
        clickFocused: focused
      });
    }
  }, {
    key: "clickFocus",
    value: function clickFocus() {
      this.setClickFocus(true);
      this.focus();
    }
  }, {
    key: "focus",
    value: function focus() {
      this.handle.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.handle.blur();
    }
  }, {
    key: "render",
    value: function render() {
      var _ref, _ref2;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          vertical = _this$props.vertical,
          reverse = _this$props.reverse,
          offset = _this$props.offset,
          style = _this$props.style,
          disabled = _this$props.disabled,
          min = _this$props.min,
          max = _this$props.max,
          value = _this$props.value,
          tabIndex = _this$props.tabIndex,
          ariaLabel = _this$props.ariaLabel,
          ariaLabelledBy = _this$props.ariaLabelledBy,
          ariaValueTextFormatter = _this$props.ariaValueTextFormatter,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, ["prefixCls", "vertical", "reverse", "offset", "style", "disabled", "min", "max", "value", "tabIndex", "ariaLabel", "ariaLabelledBy", "ariaValueTextFormatter"]);
      var className = (0, _classnames.default)(this.props.className, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-handle-click-focused"), this.state.clickFocused));
      var positionStyle = vertical ? (_ref = {}, (0, _defineProperty2.default)(_ref, reverse ? 'top' : 'bottom', "".concat(offset, "%")), (0, _defineProperty2.default)(_ref, reverse ? 'bottom' : 'top', 'auto'), (0, _defineProperty2.default)(_ref, "transform", reverse ? null : "translateY(+50%)"), _ref) : (_ref2 = {}, (0, _defineProperty2.default)(_ref2, reverse ? 'right' : 'left', "".concat(offset, "%")), (0, _defineProperty2.default)(_ref2, reverse ? 'left' : 'right', 'auto'), (0, _defineProperty2.default)(_ref2, "transform", "translateX(".concat(reverse ? '+' : '-', "50%)")), _ref2);
      var elStyle = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), positionStyle);
      var mergedTabIndex = tabIndex || 0;

      if (disabled || tabIndex === null) {
        mergedTabIndex = null;
      }

      var ariaValueText;

      if (ariaValueTextFormatter) {
        ariaValueText = ariaValueTextFormatter(value);
      }

      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        ref: this.setHandleRef,
        tabIndex: mergedTabIndex
      }, restProps, {
        className: className,
        style: elStyle,
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown,
        onMouseDown: this.handleMouseDown // aria attribute
        ,
        role: "slider",
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": value,
        "aria-disabled": !!disabled,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-valuetext": ariaValueText
      }));
    }
  }]);
  return Handle;
}(_react.default.Component);

exports.default = Handle;