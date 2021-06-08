"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _configProvider = require("../config-provider");

var _type = require("../_util/type");

var _reactNode = require("../_util/reactNode");

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var SpinSizes = (0, _type.tuple)('small', 'default', 'large'); // Render indicator

var defaultIndicator = null;

function renderIndicator(prefixCls, props) {
  var indicator = props.indicator;
  var dotClassName = "".concat(prefixCls, "-dot"); // should not be render default indicator when indicator value is null

  if (indicator === null) {
    return null;
  }

  if ((0, _reactNode.isValidElement)(indicator)) {
    return (0, _reactNode.cloneElement)(indicator, {
      className: (0, _classnames["default"])(indicator.props.className, dotClassName)
    });
  }

  if ((0, _reactNode.isValidElement)(defaultIndicator)) {
    return (0, _reactNode.cloneElement)(defaultIndicator, {
      className: (0, _classnames["default"])(defaultIndicator.props.className, dotClassName)
    });
  }

  return /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames["default"])(dotClassName, "".concat(prefixCls, "-dot-spin"))
  }, /*#__PURE__*/React.createElement("i", {
    className: "".concat(prefixCls, "-dot-item")
  }), /*#__PURE__*/React.createElement("i", {
    className: "".concat(prefixCls, "-dot-item")
  }), /*#__PURE__*/React.createElement("i", {
    className: "".concat(prefixCls, "-dot-item")
  }), /*#__PURE__*/React.createElement("i", {
    className: "".concat(prefixCls, "-dot-item")
  }));
}

function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

var Spin = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Spin, _React$Component);

  var _super = (0, _createSuper2["default"])(Spin);

  function Spin(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Spin);
    _this = _super.call(this, props);

    _this.debouncifyUpdateSpinning = function (props) {
      var _ref = props || _this.props,
          delay = _ref.delay;

      if (delay) {
        _this.cancelExistingSpin();

        _this.updateSpinning = (0, _debounce["default"])(_this.originalUpdateSpinning, delay);
      }
    };

    _this.updateSpinning = function () {
      var spinning = _this.props.spinning;
      var currentSpinning = _this.state.spinning;

      if (currentSpinning !== spinning) {
        _this.setState({
          spinning: spinning
        });
      }
    };

    _this.renderSpin = function (_ref2) {
      var _classNames;

      var getPrefixCls = _ref2.getPrefixCls,
          direction = _ref2.direction;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          className = _a.className,
          size = _a.size,
          tip = _a.tip,
          wrapperClassName = _a.wrapperClassName,
          style = _a.style,
          restProps = __rest(_a, ["prefixCls", "className", "size", "tip", "wrapperClassName", "style"]);

      var spinning = _this.state.spinning;
      var prefixCls = getPrefixCls('spin', customizePrefixCls);
      var spinClassName = (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-spinning"), spinning), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-show-text"), !!tip), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className); // fix https://fb.me/react-unknown-prop

      var divProps = (0, _omit["default"])(restProps, ['spinning', 'delay', 'indicator']);
      var spinElement = /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, divProps, {
        style: style,
        className: spinClassName
      }), renderIndicator(prefixCls, _this.props), tip ? /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-text")
      }, tip) : null);

      if (_this.isNestedPattern()) {
        var containerClassName = (0, _classnames["default"])("".concat(prefixCls, "-container"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-blur"), spinning));
        return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, divProps, {
          className: (0, _classnames["default"])("".concat(prefixCls, "-nested-loading"), wrapperClassName)
        }), spinning && /*#__PURE__*/React.createElement("div", {
          key: "loading"
        }, spinElement), /*#__PURE__*/React.createElement("div", {
          className: containerClassName,
          key: "container"
        }, _this.props.children));
      }

      return spinElement;
    };

    var spinning = props.spinning,
        delay = props.delay;
    var shouldBeDelayed = shouldDelay(spinning, delay);
    _this.state = {
      spinning: spinning && !shouldBeDelayed
    };
    _this.originalUpdateSpinning = _this.updateSpinning;

    _this.debouncifyUpdateSpinning(props);

    return _this;
  }

  (0, _createClass2["default"])(Spin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSpinning();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.debouncifyUpdateSpinning();
      this.updateSpinning();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelExistingSpin();
    }
  }, {
    key: "cancelExistingSpin",
    value: function cancelExistingSpin() {
      var updateSpinning = this.updateSpinning;

      if (updateSpinning && updateSpinning.cancel) {
        updateSpinning.cancel();
      }
    }
  }, {
    key: "isNestedPattern",
    value: function isNestedPattern() {
      return !!(this.props && typeof this.props.children !== 'undefined');
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, this.renderSpin);
    }
  }], [{
    key: "setDefaultIndicator",
    value: function setDefaultIndicator(indicator) {
      defaultIndicator = indicator;
    }
  }]);
  return Spin;
}(React.Component);

Spin.defaultProps = {
  spinning: true,
  size: 'default',
  wrapperClassName: ''
};
var _default = Spin;
exports["default"] = _default;