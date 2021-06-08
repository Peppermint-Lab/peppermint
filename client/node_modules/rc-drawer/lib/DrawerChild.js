"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _getScrollBarSize = _interopRequireDefault(require("rc-util/lib/getScrollBarSize"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _utils = require("./utils");

var currentDrawer = {};

var DrawerChild = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DrawerChild, _React$Component);

  var _super = (0, _createSuper2.default)(DrawerChild);

  function DrawerChild(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DrawerChild);
    _this = _super.call(this, props);

    _this.domFocus = function () {
      if (_this.dom) {
        _this.dom.focus();
      }
    };

    _this.removeStartHandler = function (e) {
      if (e.touches.length > 1) {
        return;
      }

      _this.startPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    _this.removeMoveHandler = function (e) {
      if (e.changedTouches.length > 1) {
        return;
      }

      var currentTarget = e.currentTarget;
      var differX = e.changedTouches[0].clientX - _this.startPos.x;
      var differY = e.changedTouches[0].clientY - _this.startPos.y;

      if ((currentTarget === _this.maskDom || currentTarget === _this.handlerDom || currentTarget === _this.contentDom && (0, _utils.getTouchParentScroll)(currentTarget, e.target, differX, differY)) && e.cancelable) {
        e.preventDefault();
      }
    };

    _this.transitionEnd = function (e) {
      var dom = e.target;
      (0, _utils.removeEventListener)(dom, _utils.transitionEnd, _this.transitionEnd);
      dom.style.transition = '';
    };

    _this.onKeyDown = function (e) {
      if (e.keyCode === _KeyCode.default.ESC) {
        var onClose = _this.props.onClose;
        e.stopPropagation();

        if (onClose) {
          onClose(e);
        }
      }
    };

    _this.onWrapperTransitionEnd = function (e) {
      var _this$props = _this.props,
          open = _this$props.open,
          afterVisibleChange = _this$props.afterVisibleChange;

      if (e.target === _this.contentWrapper && e.propertyName.match(/transform$/)) {
        _this.dom.style.transition = '';

        if (!open && _this.getCurrentDrawerSome()) {
          document.body.style.overflowX = '';

          if (_this.maskDom) {
            _this.maskDom.style.left = '';
            _this.maskDom.style.width = '';
          }
        }

        if (afterVisibleChange) {
          afterVisibleChange(!!open);
        }
      }
    };

    _this.openLevelTransition = function () {
      var _this$props2 = _this.props,
          open = _this$props2.open,
          width = _this$props2.width,
          height = _this$props2.height;

      var _this$getHorizontalBo = _this.getHorizontalBoolAndPlacementName(),
          isHorizontal = _this$getHorizontalBo.isHorizontal,
          placementName = _this$getHorizontalBo.placementName;

      var contentValue = _this.contentDom ? _this.contentDom.getBoundingClientRect()[isHorizontal ? 'width' : 'height'] : 0;
      var value = (isHorizontal ? width : height) || contentValue;

      _this.setLevelAndScrolling(open, placementName, value);
    };

    _this.setLevelTransform = function (open, placementName, value, right) {
      var _this$props3 = _this.props,
          placement = _this$props3.placement,
          levelMove = _this$props3.levelMove,
          duration = _this$props3.duration,
          ease = _this$props3.ease,
          showMask = _this$props3.showMask; // router 切换时可能会导至页面失去滚动条，所以需要时时获取。

      _this.levelDom.forEach(function (dom) {
        dom.style.transition = "transform ".concat(duration, " ").concat(ease);
        (0, _utils.addEventListener)(dom, _utils.transitionEnd, _this.transitionEnd);
        var levelValue = open ? value : 0;

        if (levelMove) {
          var $levelMove = (0, _utils.transformArguments)(levelMove, {
            target: dom,
            open: open
          });
          levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
        }

        var $value = typeof levelValue === 'number' ? "".concat(levelValue, "px") : levelValue;
        var placementPos = placement === 'left' || placement === 'top' ? $value : "-".concat($value);
        placementPos = showMask && placement === 'right' && right ? "calc(".concat(placementPos, " + ").concat(right, "px)") : placementPos;
        dom.style.transform = levelValue ? "".concat(placementName, "(").concat(placementPos, ")") : '';
      });
    };

    _this.setLevelAndScrolling = function (open, placementName, value) {
      var onChange = _this.props.onChange;

      if (!_utils.windowIsUndefined) {
        var right = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? (0, _getScrollBarSize.default)(true) : 0;

        _this.setLevelTransform(open, placementName, value, right);

        _this.toggleScrollingToDrawerAndBody(right);
      }

      if (onChange) {
        onChange(open);
      }
    };

    _this.toggleScrollingToDrawerAndBody = function (right) {
      var _this$props4 = _this.props,
          getContainer = _this$props4.getContainer,
          showMask = _this$props4.showMask,
          open = _this$props4.open;
      var container = getContainer && getContainer(); // 处理 body 滚动

      if (container && container.parentNode === document.body && showMask) {
        var eventArray = ['touchstart'];
        var domArray = [document.body, _this.maskDom, _this.handlerDom, _this.contentDom];

        if (open && document.body.style.overflow !== 'hidden') {
          if (right) {
            _this.addScrollingEffect(right);
          }

          document.body.style.touchAction = 'none'; // 手机禁滚

          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }

            (0, _utils.addEventListener)(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
          });
        } else if (_this.getCurrentDrawerSome()) {
          document.body.style.touchAction = '';

          if (right) {
            _this.remScrollingEffect(right);
          } // 恢复事件


          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }

            (0, _utils.removeEventListener)(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
          });
        }
      }
    };

    _this.addScrollingEffect = function (right) {
      var _this$props5 = _this.props,
          placement = _this$props5.placement,
          duration = _this$props5.duration,
          ease = _this$props5.ease;
      var widthTransition = "width ".concat(duration, " ").concat(ease);
      var transformTransition = "transform ".concat(duration, " ").concat(ease);
      _this.dom.style.transition = 'none';

      switch (placement) {
        case 'right':
          _this.dom.style.transform = "translateX(-".concat(right, "px)");
          break;

        case 'top':
        case 'bottom':
          _this.dom.style.width = "calc(100% - ".concat(right, "px)");
          _this.dom.style.transform = 'translateZ(0)';
          break;

        default:
          break;
      }

      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (_this.dom) {
          _this.dom.style.transition = "".concat(transformTransition, ",").concat(widthTransition);
          _this.dom.style.width = '';
          _this.dom.style.transform = '';
        }
      });
    };

    _this.remScrollingEffect = function (right) {
      var _this$props6 = _this.props,
          placement = _this$props6.placement,
          duration = _this$props6.duration,
          ease = _this$props6.ease;

      if (_utils.transitionStr) {
        document.body.style.overflowX = 'hidden';
      }

      _this.dom.style.transition = 'none';
      var heightTransition;
      var widthTransition = "width ".concat(duration, " ").concat(ease);
      var transformTransition = "transform ".concat(duration, " ").concat(ease);

      switch (placement) {
        case 'left':
          {
            _this.dom.style.width = '100%';
            widthTransition = "width 0s ".concat(ease, " ").concat(duration);
            break;
          }

        case 'right':
          {
            _this.dom.style.transform = "translateX(".concat(right, "px)");
            _this.dom.style.width = '100%';
            widthTransition = "width 0s ".concat(ease, " ").concat(duration);

            if (_this.maskDom) {
              _this.maskDom.style.left = "-".concat(right, "px");
              _this.maskDom.style.width = "calc(100% + ".concat(right, "px)");
            }

            break;
          }

        case 'top':
        case 'bottom':
          {
            _this.dom.style.width = "calc(100% + ".concat(right, "px)");
            _this.dom.style.height = '100%';
            _this.dom.style.transform = 'translateZ(0)';
            heightTransition = "height 0s ".concat(ease, " ").concat(duration);
            break;
          }

        default:
          break;
      }

      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (_this.dom) {
          _this.dom.style.transition = "".concat(transformTransition, ",").concat(heightTransition ? "".concat(heightTransition, ",") : '').concat(widthTransition);
          _this.dom.style.transform = '';
          _this.dom.style.width = '';
          _this.dom.style.height = '';
        }
      });
    };

    _this.getCurrentDrawerSome = function () {
      return !Object.keys(currentDrawer).some(function (key) {
        return currentDrawer[key];
      });
    };

    _this.getLevelDom = function (_ref) {
      var level = _ref.level,
          getContainer = _ref.getContainer;

      if (_utils.windowIsUndefined) {
        return;
      }

      var container = getContainer && getContainer();
      var parent = container ? container.parentNode : null;
      _this.levelDom = [];

      if (level === 'all') {
        var children = parent ? Array.prototype.slice.call(parent.children) : [];
        children.forEach(function (child) {
          if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child.nodeName !== 'LINK' && child !== container) {
            _this.levelDom.push(child);
          }
        });
      } else if (level) {
        (0, _utils.dataToArray)(level).forEach(function (key) {
          document.querySelectorAll(key).forEach(function (item) {
            _this.levelDom.push(item);
          });
        });
      }
    };

    _this.getHorizontalBoolAndPlacementName = function () {
      var placement = _this.props.placement;
      var isHorizontal = placement === 'left' || placement === 'right';
      var placementName = "translate".concat(isHorizontal ? 'X' : 'Y');
      return {
        isHorizontal: isHorizontal,
        placementName: placementName
      };
    };

    _this.state = {
      _self: (0, _assertThisInitialized2.default)(_this)
    };
    return _this;
  }

  (0, _createClass2.default)(DrawerChild, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!_utils.windowIsUndefined) {
        var passiveSupported = false;

        try {
          window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
            get: function get() {
              passiveSupported = true;
              return null;
            }
          }));
        } catch (err) {}

        this.passive = passiveSupported ? {
          passive: false
        } : false;
      }

      var _this$props7 = this.props,
          open = _this$props7.open,
          getContainer = _this$props7.getContainer,
          showMask = _this$props7.showMask;
      var container = getContainer && getContainer();
      this.drawerId = "drawer_id_".concat(Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9).toString())).toString(16));
      this.getLevelDom(this.props);

      if (open) {
        if (container && container.parentNode === document.body) {
          currentDrawer[this.drawerId] = open;
        } // 默认打开状态时推出 level;


        this.openLevelTransition();
        this.forceUpdate(function () {
          _this2.domFocus();
        });

        if (showMask) {
          var _this$props$scrollLoc;

          (_this$props$scrollLoc = this.props.scrollLocker) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.lock();
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props8 = this.props,
          open = _this$props8.open,
          getContainer = _this$props8.getContainer,
          scrollLocker = _this$props8.scrollLocker,
          showMask = _this$props8.showMask;
      var container = getContainer && getContainer();

      if (open !== prevProps.open) {
        if (container && container.parentNode === document.body) {
          currentDrawer[this.drawerId] = !!open;
        }

        this.openLevelTransition();

        if (open) {
          this.domFocus();

          if (showMask) {
            scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.lock();
          }
        } else {
          scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.unLock();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props9 = this.props,
          open = _this$props9.open,
          scrollLocker = _this$props9.scrollLocker;
      delete currentDrawer[this.drawerId];

      if (open) {
        this.setLevelTransform(false);
        document.body.style.touchAction = '';
      }

      scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.unLock();
    } // tslint:disable-next-line:member-ordering

  }, {
    key: "render",
    value: function render() {
      var _classnames,
          _this3 = this;

      var _this$props10 = this.props,
          className = _this$props10.className,
          children = _this$props10.children,
          style = _this$props10.style,
          width = _this$props10.width,
          height = _this$props10.height,
          defaultOpen = _this$props10.defaultOpen,
          $open = _this$props10.open,
          prefixCls = _this$props10.prefixCls,
          placement = _this$props10.placement,
          level = _this$props10.level,
          levelMove = _this$props10.levelMove,
          ease = _this$props10.ease,
          duration = _this$props10.duration,
          getContainer = _this$props10.getContainer,
          handler = _this$props10.handler,
          onChange = _this$props10.onChange,
          afterVisibleChange = _this$props10.afterVisibleChange,
          showMask = _this$props10.showMask,
          maskClosable = _this$props10.maskClosable,
          maskStyle = _this$props10.maskStyle,
          onClose = _this$props10.onClose,
          onHandleClick = _this$props10.onHandleClick,
          keyboard = _this$props10.keyboard,
          getOpenCount = _this$props10.getOpenCount,
          scrollLocker = _this$props10.scrollLocker,
          contentWrapperStyle = _this$props10.contentWrapperStyle,
          props = (0, _objectWithoutProperties2.default)(_this$props10, ["className", "children", "style", "width", "height", "defaultOpen", "open", "prefixCls", "placement", "level", "levelMove", "ease", "duration", "getContainer", "handler", "onChange", "afterVisibleChange", "showMask", "maskClosable", "maskStyle", "onClose", "onHandleClick", "keyboard", "getOpenCount", "scrollLocker", "contentWrapperStyle"]); // 首次渲染都将是关闭状态。

      var open = this.dom ? $open : false;
      var wrapperClassName = (0, _classnames2.default)(prefixCls, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(placement), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-open"), open), (0, _defineProperty2.default)(_classnames, className || '', !!className), (0, _defineProperty2.default)(_classnames, 'no-mask', !showMask), _classnames));

      var _this$getHorizontalBo2 = this.getHorizontalBoolAndPlacementName(),
          placementName = _this$getHorizontalBo2.placementName; // 百分比与像素动画不同步，第一次打用后全用像素动画。
      // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;


      var placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
      var transform = open ? '' : "".concat(placementName, "(").concat(placementPos, ")");
      var handlerChildren = handler && /*#__PURE__*/React.cloneElement(handler, {
        onClick: function onClick(e) {
          if (handler.props.onClick) {
            handler.props.onClick();
          }

          if (onHandleClick) {
            onHandleClick(e);
          }
        },
        ref: function ref(c) {
          _this3.handlerDom = c;
        }
      });
      return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, (0, _omit.default)(props, ['switchScrollingEffect']), {
        tabIndex: -1,
        className: wrapperClassName,
        style: style,
        ref: function ref(c) {
          _this3.dom = c;
        },
        onKeyDown: open && keyboard ? this.onKeyDown : undefined,
        onTransitionEnd: this.onWrapperTransitionEnd
      }), showMask && /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-mask"),
        onClick: maskClosable ? onClose : undefined,
        style: maskStyle,
        ref: function ref(c) {
          _this3.maskDom = c;
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-content-wrapper"),
        style: (0, _objectSpread2.default)({
          transform: transform,
          msTransform: transform,
          width: (0, _utils.isNumeric)(width) ? "".concat(width, "px") : width,
          height: (0, _utils.isNumeric)(height) ? "".concat(height, "px") : height
        }, contentWrapperStyle),
        ref: function ref(c) {
          _this3.contentWrapper = c;
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-content"),
        ref: function ref(c) {
          _this3.contentDom = c;
        },
        onTouchStart: open && showMask ? this.removeStartHandler : undefined // 跑用例用
        ,
        onTouchMove: open && showMask ? this.removeMoveHandler : undefined // 跑用例用

      }, children), handlerChildren));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps,
          _self = _ref2._self;
      var nextState = {
        prevProps: props
      };

      if (prevProps !== undefined) {
        var placement = props.placement,
            level = props.level;

        if (placement !== prevProps.placement) {
          // test 的 bug, 有动画过场，删除 dom
          _self.contentDom = null;
        }

        if (level !== prevProps.level) {
          _self.getLevelDom(props);
        }
      }

      return nextState;
    }
  }]);
  return DrawerChild;
}(React.Component);

var _default = DrawerChild;
exports.default = _default;