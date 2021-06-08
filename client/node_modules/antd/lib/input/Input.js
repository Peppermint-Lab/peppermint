"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixControlledValue = fixControlledValue;
exports.resolveOnChange = resolveOnChange;
exports.getInputClassName = getInputClassName;
exports.triggerFocus = triggerFocus;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _ClearableLabeledInput = _interopRequireWildcard(require("./ClearableLabeledInput"));

var _configProvider = require("../config-provider");

var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
}

function resolveOnChange(target, e, onChange, targetValue) {
  if (!onChange) {
    return;
  }

  var event = e;
  var originalInputValue = target.value;

  if (e.type === 'click') {
    // click clear icon
    event = Object.create(e);
    event.target = target;
    event.currentTarget = target; // change target ref value cause e.target.value should be '' when clear input

    target.value = '';
    onChange(event); // reset target ref value

    target.value = originalInputValue;
    return;
  } // Trigger by composition event, this means we need force change the input value


  if (targetValue !== undefined) {
    event = Object.create(e);
    event.target = target;
    event.currentTarget = target;
    target.value = targetValue;
    onChange(event);
    return;
  }

  onChange(event);
}

function getInputClassName(prefixCls, bordered, size, disabled, direction) {
  var _classNames;

  return (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-disabled"), disabled), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _classNames));
}

function triggerFocus(element, option) {
  if (!element) return;
  element.focus(option); // Selection content

  var _ref = option || {},
      cursor = _ref.cursor;

  if (cursor) {
    var len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;

      case 'end':
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}

var Input = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Input, _React$Component);

  var _super = (0, _createSuper2["default"])(Input);

  function Input(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Input);
    _this = _super.call(this, props);
    _this.direction = 'ltr';

    _this.focus = function (option) {
      triggerFocus(_this.input, option);
    };

    _this.saveClearableInput = function (input) {
      _this.clearableInput = input;
    };

    _this.saveInput = function (input) {
      _this.input = input;
    };

    _this.onFocus = function (e) {
      var onFocus = _this.props.onFocus;

      _this.setState({
        focused: true
      }, _this.clearPasswordValueAttribute);

      onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    };

    _this.onBlur = function (e) {
      var onBlur = _this.props.onBlur;

      _this.setState({
        focused: false
      }, _this.clearPasswordValueAttribute);

      onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    };

    _this.handleReset = function (e) {
      _this.setValue('', function () {
        _this.focus();
      });

      resolveOnChange(_this.input, e, _this.props.onChange);
    };

    _this.renderInput = function (prefixCls, size, bordered) {
      var input = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var _this$props = _this.props,
          className = _this$props.className,
          addonBefore = _this$props.addonBefore,
          addonAfter = _this$props.addonAfter,
          customizeSize = _this$props.size,
          disabled = _this$props.disabled; // Fix https://fb.me/react-unknown-prop

      var otherProps = (0, _omit["default"])(_this.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'allowClear', // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      'defaultValue', 'size', 'inputType', 'bordered']);
      return /*#__PURE__*/React.createElement("input", (0, _extends2["default"])({
        autoComplete: input.autoComplete
      }, otherProps, {
        onChange: _this.handleChange,
        onFocus: _this.onFocus,
        onBlur: _this.onBlur,
        onKeyDown: _this.handleKeyDown,
        className: (0, _classnames["default"])(getInputClassName(prefixCls, bordered, customizeSize || size, disabled, _this.direction), (0, _defineProperty2["default"])({}, className, className && !addonBefore && !addonAfter)),
        ref: _this.saveInput
      }));
    };

    _this.clearPasswordValueAttribute = function () {
      // https://github.com/ant-design/ant-design/issues/20541
      _this.removePasswordTimeout = setTimeout(function () {
        if (_this.input && _this.input.getAttribute('type') === 'password' && _this.input.hasAttribute('value')) {
          _this.input.removeAttribute('value');
        }
      });
    };

    _this.handleChange = function (e) {
      _this.setValue(e.target.value, _this.clearPasswordValueAttribute);

      resolveOnChange(_this.input, e, _this.props.onChange);
    };

    _this.handleKeyDown = function (e) {
      var _this$props2 = _this.props,
          onPressEnter = _this$props2.onPressEnter,
          onKeyDown = _this$props2.onKeyDown;

      if (onPressEnter && e.keyCode === 13) {
        onPressEnter(e);
      }

      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    };

    _this.renderComponent = function (_ref2) {
      var getPrefixCls = _ref2.getPrefixCls,
          direction = _ref2.direction,
          input = _ref2.input;
      var _this$state = _this.state,
          value = _this$state.value,
          focused = _this$state.focused;
      var _this$props3 = _this.props,
          customizePrefixCls = _this$props3.prefixCls,
          _this$props3$bordered = _this$props3.bordered,
          bordered = _this$props3$bordered === void 0 ? true : _this$props3$bordered;
      var prefixCls = getPrefixCls('input', customizePrefixCls);
      _this.direction = direction;
      return /*#__PURE__*/React.createElement(_SizeContext["default"].Consumer, null, function (size) {
        return /*#__PURE__*/React.createElement(_ClearableLabeledInput["default"], (0, _extends2["default"])({
          size: size
        }, _this.props, {
          prefixCls: prefixCls,
          inputType: "input",
          value: fixControlledValue(value),
          element: _this.renderInput(prefixCls, size, bordered, input),
          handleReset: _this.handleReset,
          ref: _this.saveClearableInput,
          direction: direction,
          focused: focused,
          triggerFocus: _this.focus,
          bordered: bordered
        }));
      });
    };

    var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    _this.state = {
      value: value,
      focused: false,
      // eslint-disable-next-line react/no-unused-state
      prevValue: props.value
    };
    return _this;
  }

  (0, _createClass2["default"])(Input, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.clearPasswordValueAttribute();
    } // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
    // We keep an empty function here.

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      if ((0, _ClearableLabeledInput.hasPrefixSuffix)(prevProps) !== (0, _ClearableLabeledInput.hasPrefixSuffix)(this.props)) {
        (0, _devWarning["default"])(this.input !== document.activeElement, 'Input', "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ");
      }

      return null;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.removePasswordTimeout) {
        clearTimeout(this.removePasswordTimeout);
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "setSelectionRange",
    value: function setSelectionRange(start, end, direction) {
      this.input.setSelectionRange(start, end, direction);
    }
  }, {
    key: "select",
    value: function select() {
      this.input.select();
    }
  }, {
    key: "setValue",
    value: function setValue(value, callback) {
      if (this.props.value === undefined) {
        this.setState({
          value: value
        }, callback);
      } else {
        callback === null || callback === void 0 ? void 0 : callback();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, this.renderComponent);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, _ref3) {
      var prevValue = _ref3.prevValue;
      var newState = {
        prevValue: nextProps.value
      };

      if (nextProps.value !== undefined || prevValue !== nextProps.value) {
        newState.value = nextProps.value;
      }

      return newState;
    }
  }]);
  return Input;
}(React.Component);

Input.defaultProps = {
  type: 'text'
};
var _default = Input;
exports["default"] = _default;