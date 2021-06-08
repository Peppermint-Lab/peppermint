import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import React from 'react';
import findDOMNode from "rc-util/es/Dom/findDOMNode";
import classNames from 'classnames';
import KeyCode from "rc-util/es/KeyCode";
import { getOffsetLeft } from './util';
import Star from './Star';

function noop() {}

var Rate = /*#__PURE__*/function (_React$Component) {
  _inherits(Rate, _React$Component);

  var _super = _createSuper(Rate);

  function Rate(props) {
    var _this;

    _classCallCheck(this, Rate);

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

      if (keyCode === KeyCode.RIGHT && value < count && !reverse) {
        if (allowHalf) {
          value += 0.5;
        } else {
          value += 1;
        }

        _this.changeValue(value);

        event.preventDefault();
      } else if (keyCode === KeyCode.LEFT && value > 0 && !reverse) {
        if (allowHalf) {
          value -= 0.5;
        } else {
          value -= 1;
        }

        _this.changeValue(value);

        event.preventDefault();
      } else if (keyCode === KeyCode.RIGHT && value > 0 && reverse) {
        if (allowHalf) {
          value -= 0.5;
        } else {
          value -= 1;
        }

        _this.changeValue(value);

        event.preventDefault();
      } else if (keyCode === KeyCode.LEFT && value < count && reverse) {
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

  _createClass(Rate, [{
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
      return findDOMNode(this.stars[index]);
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
        var leftDis = getOffsetLeft(starEle);
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
        stars.push( /*#__PURE__*/React.createElement(Star, {
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

      var rateClassName = classNames(prefixCls, disabledClass, className, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'));
      return /*#__PURE__*/React.createElement("ul", {
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
        return _objectSpread(_objectSpread({}, state), {}, {
          value: nextProps.value
        });
      }

      return state;
    }
  }]);

  return Rate;
}(React.Component);

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
export default Rate;