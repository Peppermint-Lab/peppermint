"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _findDOMNode = _interopRequireDefault(require("rc-util/lib/Dom/findDOMNode"));

var _classnames = _interopRequireDefault(require("classnames"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _util = require("./util");

var _Star = _interopRequireDefault(require("./Star"));

function noop() {}

var Rate = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Rate, _React$Component);

  var _super = (0, _createSuper2.default)(Rate);

  function Rate(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Rate);
    _this = _super.call(this, props);

    _this.onHover = function (event, index) {
      var onHoverChange = _this.props.onHoverChange;

      var hoverValue = _this.getStarValue(index, event.pageX);

      var cleanedValue = _this.state.cleanedValue;

      if (hoverValue !== cleanedValue) {
        _this.setState({
          hoverValue: hoverValue,
          cleanedValue: null
        });
      }

      onHoverChange(hoverValue);
    };

    _this.onMouseLeave = function () {
      var onHoverChange = _this.props.onHoverChange;

      _this.setState({
        hoverValue: undefined,
        cleanedValue: null
      });

      onHoverChange(undefined);
    };

    _this.onClick = function (event, index) {
      var allowClear = _this.props.allowClear;
      var value = _this.state.value;

      var newValue = _this.getStarValue(index, event.pageX);

      var isReset = false;

      if (allowClear) {
        isReset = newValue === value;
      }

      _this.onMouseLeave();

      _this.changeValue(isReset ? 0 : newValue);

      _this.setState({
        cleanedValue: isReset ? newValue : null
      });
    };

    _this.onFocus = function () {
      var onFocus = _this.props.onFocus;

      _this.setState({
        focused: true
      });

      if (onFocus) {
        onFocus();
      }
    };

    _this.onBlur = function () {
      var onBlur = _this.props.onBlur;

      _this.setState({
        focused: false
      });

      if (onBlur) {
        onBlur();
      }
    };

    _this.onKeyDown = function (event) {
      var keyCode = event.keyCode;
      var _this$props = _this.props,
          count = _this$props.count,
          allowHalf = _this$props.allowHalf,
          onKeyDown = _this$props.onKeyDown,
          direction = _this$props.direction;
      var reverse = direction === 'rtl';
      var value = _this.state.value;

      if (keyCode === _KeyCode.default.RIGHT && value < count && !reverse) {
        if (allowHalf) {
          value += 0.5;
        } else {
          value += 1;
        }

        _this.changeValue(value);

        event.preventDefault();
      } else if (keyCode === _KeyCode.default.LEFT && value > 0 && !reverse) {
        if (allowHalf) {
          value -= 0.5;
        } else {
          value -= 1;
        }

        _this.changeValue(value);

        event.preventDefault();
      } else if (keyCode === _KeyCode.default.RIGHT && value > 0 && reverse) {
        if (allowHalf) {
          value -= 0.5;
        } else {
          value -= 1;
        }

        _this.changeValue(value);

        event.preventDefault();
      } else if (keyCode === _KeyCode.default.LEFT && value < count && reverse) {
        if (allowHalf) {
          value += 0.5;
        } else {
          value += 1;
        }

        _this.changeValue(value);

        event.preventDefault();
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    _this.saveRef = function (index) {
      return function (node) {
        _this.stars[index] = node;
      };
    };

    _this.saveRate = function (node) {
      _this.rate = node;
    };

    var value = props.value;

    if (value === undefined) {
      value = props.defaultValue;
    }

    _this.stars = {};
    _this.state = {
      value: value,
      focused: false,
      cleanedValue: null
    };
    return _this;
  }

  (0, _createClass2.default)(Rate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          autoFocus = _this$props2.autoFocus,
          disabled = _this$props2.disabled;

      if (autoFocus && !disabled) {
        this.focus();
      }
    }
  }, {
    key: "getStarDOM",
    value: function getStarDOM(index) {
      return (0, _findDOMNode.default)(this.stars[index]);
    }
  }, {
    key: "getStarValue",
    value: function getStarValue(index, x) {
      var _this$props3 = this.props,
          allowHalf = _this$props3.allowHalf,
          direction = _this$props3.direction;
      var reverse = direction === 'rtl';
      var value = index + 1;

      if (allowHalf) {
        var starEle = this.getStarDOM(index);
        var leftDis = (0, _util.getOffsetLeft)(starEle);
        var width = starEle.clientWidth;

        if (reverse && x - leftDis > width / 2) {
          value -= 0.5;
        } else if (!reverse && x - leftDis < width / 2) {
          value -= 0.5;
        }
      }

      return value;
    }
  }, {
    key: "focus",
    value: function focus() {
      var disabled = this.props.disabled;

      if (!disabled) {
        this.rate.focus();
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      var disabled = this.props.disabled;

      if (!disabled) {
        this.rate.blur();
      }
    }
  }, {
    key: "changeValue",
    value: function changeValue(value) {
      var onChange = this.props.onChange;

      if (!('value' in this.props)) {
        this.setState({
          value: value
        });
      }

      onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          count = _this$props4.count,
          allowHalf = _this$props4.allowHalf,
          style = _this$props4.style,
          prefixCls = _this$props4.prefixCls,
          disabled = _this$props4.disabled,
          className = _this$props4.className,
          character = _this$props4.character,
          characterRender = _this$props4.characterRender,
          tabIndex = _this$props4.tabIndex,
          direction = _this$props4.direction;
      var _this$state = this.state,
          value = _this$state.value,
          hoverValue = _this$state.hoverValue,
          focused = _this$state.focused;
      var stars = [];
      var disabledClass = disabled ? "".concat(prefixCls, "-disabled") : '';

      for (var index = 0; index < count; index += 1) {
        stars.push( /*#__PURE__*/_react.default.createElement(_Star.default, {
          ref: this.saveRef(index),
          index: index,
          count: count,
          disabled: disabled,
          prefixCls: "".concat(prefixCls, "-star"),
          allowHalf: allowHalf,
          value: hoverValue === undefined ? value : hoverValue,
          onClick: this.onClick,
          onHover: this.onHover,
          key: index,
          character: character,
          characterRender: characterRender,
          focused: focused
        }));
      }

      var rateClassName = (0, _classnames.default)(prefixCls, disabledClass, className, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'));
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: rateClassName,
        style: style,
        onMouseLeave: disabled ? null : this.onMouseLeave,
        tabIndex: disabled ? -1 : tabIndex,
        onFocus: disabled ? null : this.onFocus,
        onBlur: disabled ? null : this.onBlur,
        onKeyDown: disabled ? null : this.onKeyDown,
        ref: this.saveRate,
        role: "radiogroup"
      }, stars);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      if ('value' in nextProps && nextProps.value !== undefined) {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          value: nextProps.value
        });
      }

      return state;
    }
  }]);
  return Rate;
}(_react.default.Component);

Rate.defaultProps = {
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  style: {},
  prefixCls: 'rc-rate',
  onChange: noop,
  character: '★',
  onHoverChange: noop,
  tabIndex: 0,
  direction: 'ltr'
};
var _default = Rate;
exports.default = _default;