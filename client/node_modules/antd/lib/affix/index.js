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

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _configProvider = require("../config-provider");

var _throttleByAnimationFrame = require("../_util/throttleByAnimationFrame");

var _utils = require("./utils");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2["default"])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

var AffixStatus;

(function (AffixStatus) {
  AffixStatus[AffixStatus["None"] = 0] = "None";
  AffixStatus[AffixStatus["Prepare"] = 1] = "Prepare";
})(AffixStatus || (AffixStatus = {}));

var Affix = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Affix, _React$Component);

  var _super = (0, _createSuper2["default"])(Affix);

  function Affix() {
    var _this;

    (0, _classCallCheck2["default"])(this, Affix);
    _this = _super.apply(this, arguments);
    _this.state = {
      status: AffixStatus.None,
      lastAffix: false,
      prevTarget: null
    };

    _this.getOffsetTop = function () {
      var offsetBottom = _this.props.offsetBottom;
      var offsetTop = _this.props.offsetTop;

      if (offsetBottom === undefined && offsetTop === undefined) {
        offsetTop = 0;
      }

      return offsetTop;
    };

    _this.getOffsetBottom = function () {
      return _this.props.offsetBottom;
    };

    _this.savePlaceholderNode = function (node) {
      _this.placeholderNode = node;
    };

    _this.saveFixedNode = function (node) {
      _this.fixedNode = node;
    }; // =================== Measure ===================


    _this.measure = function () {
      var _this$state = _this.state,
          status = _this$state.status,
          lastAffix = _this$state.lastAffix;
      var onChange = _this.props.onChange;

      var targetFunc = _this.getTargetFunc();

      if (status !== AffixStatus.Prepare || !_this.fixedNode || !_this.placeholderNode || !targetFunc) {
        return;
      }

      var offsetTop = _this.getOffsetTop();

      var offsetBottom = _this.getOffsetBottom();

      var targetNode = targetFunc();

      if (!targetNode) {
        return;
      }

      var newState = {
        status: AffixStatus.None
      };
      var targetRect = (0, _utils.getTargetRect)(targetNode);
      var placeholderReact = (0, _utils.getTargetRect)(_this.placeholderNode);
      var fixedTop = (0, _utils.getFixedTop)(placeholderReact, targetRect, offsetTop);
      var fixedBottom = (0, _utils.getFixedBottom)(placeholderReact, targetRect, offsetBottom);

      if (fixedTop !== undefined) {
        newState.affixStyle = {
          position: 'fixed',
          top: fixedTop,
          width: placeholderReact.width,
          height: placeholderReact.height
        };
        newState.placeholderStyle = {
          width: placeholderReact.width,
          height: placeholderReact.height
        };
      } else if (fixedBottom !== undefined) {
        newState.affixStyle = {
          position: 'fixed',
          bottom: fixedBottom,
          width: placeholderReact.width,
          height: placeholderReact.height
        };
        newState.placeholderStyle = {
          width: placeholderReact.width,
          height: placeholderReact.height
        };
      }

      newState.lastAffix = !!newState.affixStyle;

      if (onChange && lastAffix !== newState.lastAffix) {
        onChange(newState.lastAffix);
      }

      _this.setState(newState);
    }; // @ts-ignore TS6133


    _this.prepareMeasure = function () {
      // event param is used before. Keep compatible ts define here.
      _this.setState({
        status: AffixStatus.Prepare,
        affixStyle: undefined,
        placeholderStyle: undefined
      }); // Test if `updatePosition` called


      if (process.env.NODE_ENV === 'test') {
        var onTestUpdatePosition = _this.props.onTestUpdatePosition;
        onTestUpdatePosition === null || onTestUpdatePosition === void 0 ? void 0 : onTestUpdatePosition();
      }
    }; // =================== Render ===================


    _this.render = function () {
      var getPrefixCls = _this.context.getPrefixCls;
      var _this$state2 = _this.state,
          affixStyle = _this$state2.affixStyle,
          placeholderStyle = _this$state2.placeholderStyle;
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          children = _this$props.children;
      var className = (0, _classnames["default"])((0, _defineProperty2["default"])({}, getPrefixCls('affix', prefixCls), !!affixStyle));
      var props = (0, _omit["default"])(_this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']); // Omit this since `onTestUpdatePosition` only works on test.

      if (process.env.NODE_ENV === 'test') {
        props = (0, _omit["default"])(props, ['onTestUpdatePosition']);
      }

      return /*#__PURE__*/React.createElement(_rcResizeObserver["default"], {
        onResize: function onResize() {
          _this.updatePosition();
        }
      }, /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, props, {
        ref: _this.savePlaceholderNode
      }), affixStyle && /*#__PURE__*/React.createElement("div", {
        style: placeholderStyle,
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement("div", {
        className: className,
        ref: _this.saveFixedNode,
        style: affixStyle
      }, /*#__PURE__*/React.createElement(_rcResizeObserver["default"], {
        onResize: function onResize() {
          _this.updatePosition();
        }
      }, children))));
    };

    return _this;
  }

  (0, _createClass2["default"])(Affix, [{
    key: "getTargetFunc",
    value: function getTargetFunc() {
      var getTargetContainer = this.context.getTargetContainer;
      var target = this.props.target;

      if (target !== undefined) {
        return target;
      }

      return getTargetContainer || getDefaultTarget;
    } // Event handler

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var targetFunc = this.getTargetFunc();

      if (targetFunc) {
        // [Legacy] Wait for parent component ref has its value.
        // We should use target as directly element instead of function which makes element check hard.
        this.timeout = setTimeout(function () {
          (0, _utils.addObserveTarget)(targetFunc(), _this2); // Mock Event object.

          _this2.updatePosition();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevTarget = this.state.prevTarget;
      var targetFunc = this.getTargetFunc();
      var newTarget = null;

      if (targetFunc) {
        newTarget = targetFunc() || null;
      }

      if (prevTarget !== newTarget) {
        (0, _utils.removeObserveTarget)(this);

        if (newTarget) {
          (0, _utils.addObserveTarget)(newTarget, this); // Mock Event object.

          this.updatePosition();
        } // eslint-disable-next-line react/no-did-update-set-state


        this.setState({
          prevTarget: newTarget
        });
      }

      if (prevProps.offsetTop !== this.props.offsetTop || prevProps.offsetBottom !== this.props.offsetBottom) {
        this.updatePosition();
      }

      this.measure();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      (0, _utils.removeObserveTarget)(this);
      this.updatePosition.cancel(); // https://github.com/ant-design/ant-design/issues/22683

      this.lazyUpdatePosition.cancel();
    } // Handle realign logic

  }, {
    key: "updatePosition",
    value: function updatePosition() {
      this.prepareMeasure();
    }
  }, {
    key: "lazyUpdatePosition",
    value: function lazyUpdatePosition() {
      var targetFunc = this.getTargetFunc();
      var affixStyle = this.state.affixStyle; // Check position change before measure to make Safari smooth

      if (targetFunc && affixStyle) {
        var offsetTop = this.getOffsetTop();
        var offsetBottom = this.getOffsetBottom();
        var targetNode = targetFunc();

        if (targetNode && this.placeholderNode) {
          var targetRect = (0, _utils.getTargetRect)(targetNode);
          var placeholderReact = (0, _utils.getTargetRect)(this.placeholderNode);
          var fixedTop = (0, _utils.getFixedTop)(placeholderReact, targetRect, offsetTop);
          var fixedBottom = (0, _utils.getFixedBottom)(placeholderReact, targetRect, offsetBottom);

          if (fixedTop !== undefined && affixStyle.top === fixedTop || fixedBottom !== undefined && affixStyle.bottom === fixedBottom) {
            return;
          }
        }
      } // Directly call prepare measure since it's already throttled.


      this.prepareMeasure();
    }
  }]);
  return Affix;
}(React.Component);

Affix.contextType = _configProvider.ConfigContext;

__decorate([(0, _throttleByAnimationFrame.throttleByAnimationFrameDecorator)()], Affix.prototype, "updatePosition", null);

__decorate([(0, _throttleByAnimationFrame.throttleByAnimationFrameDecorator)()], Affix.prototype, "lazyUpdatePosition", null);

var _default = Affix;
exports["default"] = _default;