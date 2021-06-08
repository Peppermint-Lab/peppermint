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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _affix = _interopRequireDefault(require("../affix"));

var _configProvider = require("../config-provider");

var _scrollTo = _interopRequireDefault(require("../_util/scrollTo"));

var _getScroll = _interopRequireDefault(require("../_util/getScroll"));

var _context = _interopRequireDefault(require("./context"));

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element, container) {
  if (!element.getClientRects().length) {
    return 0;
  }

  var rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }

    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
}

var sharpMatcherRegx = /#(\S+)$/;

var Anchor = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Anchor, _React$Component);

  var _super = (0, _createSuper2["default"])(Anchor);

  function Anchor() {
    var _this;

    (0, _classCallCheck2["default"])(this, Anchor);
    _this = _super.apply(this, arguments);
    _this.state = {
      activeLink: null
    };
    _this.wrapperRef = /*#__PURE__*/React.createRef();
    _this.links = []; // Context

    _this.registerLink = function (link) {
      if (!_this.links.includes(link)) {
        _this.links.push(link);
      }
    };

    _this.unregisterLink = function (link) {
      var index = _this.links.indexOf(link);

      if (index !== -1) {
        _this.links.splice(index, 1);
      }
    };

    _this.getContainer = function () {
      var getTargetContainer = _this.context.getTargetContainer;
      var getContainer = _this.props.getContainer;
      var getFunc = getContainer || getTargetContainer || getDefaultContainer;
      return getFunc();
    };

    _this.handleScrollTo = function (link) {
      var _this$props = _this.props,
          offsetTop = _this$props.offsetTop,
          targetOffset = _this$props.targetOffset;

      _this.setCurrentActiveLink(link);

      var container = _this.getContainer();

      var scrollTop = (0, _getScroll["default"])(container, true);
      var sharpLinkMatch = sharpMatcherRegx.exec(link);

      if (!sharpLinkMatch) {
        return;
      }

      var targetElement = document.getElementById(sharpLinkMatch[1]);

      if (!targetElement) {
        return;
      }

      var eleOffsetTop = getOffsetTop(targetElement, container);
      var y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      _this.animating = true;
      (0, _scrollTo["default"])(y, {
        callback: function callback() {
          _this.animating = false;
        },
        getContainer: _this.getContainer
      });
    };

    _this.saveInkNode = function (node) {
      _this.inkNode = node;
    };

    _this.setCurrentActiveLink = function (link) {
      var activeLink = _this.state.activeLink;
      var onChange = _this.props.onChange;

      if (activeLink !== link) {
        _this.setState({
          activeLink: link
        });

        onChange === null || onChange === void 0 ? void 0 : onChange(link);
      }
    };

    _this.handleScroll = function () {
      if (_this.animating) {
        return;
      }

      var _this$props2 = _this.props,
          offsetTop = _this$props2.offsetTop,
          bounds = _this$props2.bounds,
          targetOffset = _this$props2.targetOffset;

      var currentActiveLink = _this.getCurrentAnchor(targetOffset !== undefined ? targetOffset : offsetTop || 0, bounds);

      _this.setCurrentActiveLink(currentActiveLink);
    };

    _this.updateInk = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          prefixCls = _assertThisInitialize.prefixCls,
          wrapperRef = _assertThisInitialize.wrapperRef;

      var anchorNode = wrapperRef.current;
      var linkNode = anchorNode === null || anchorNode === void 0 ? void 0 : anchorNode.getElementsByClassName("".concat(prefixCls, "-link-title-active"))[0];

      if (linkNode) {
        _this.inkNode.style.top = "".concat(linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5, "px");
      }
    };

    _this.render = function () {
      var _this$context = _this.context,
          getPrefixCls = _this$context.getPrefixCls,
          direction = _this$context.direction;
      var _this$props3 = _this.props,
          customizePrefixCls = _this$props3.prefixCls,
          _this$props3$classNam = _this$props3.className,
          className = _this$props3$classNam === void 0 ? '' : _this$props3$classNam,
          style = _this$props3.style,
          offsetTop = _this$props3.offsetTop,
          affix = _this$props3.affix,
          showInkInFixed = _this$props3.showInkInFixed,
          children = _this$props3.children;
      var activeLink = _this.state.activeLink;
      var prefixCls = getPrefixCls('anchor', customizePrefixCls); // To support old version react.
      // Have to add prefixCls on the instance.
      // https://github.com/facebook/react/issues/12397

      _this.prefixCls = prefixCls;
      var inkClass = (0, _classnames["default"])("".concat(prefixCls, "-ink-ball"), {
        visible: activeLink
      });
      var wrapperClass = (0, _classnames["default"])("".concat(prefixCls, "-wrapper"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
      var anchorClass = (0, _classnames["default"])(prefixCls, {
        fixed: !affix && !showInkInFixed
      });
      var wrapperStyle = (0, _extends2["default"])({
        maxHeight: offsetTop ? "calc(100vh - ".concat(offsetTop, "px)") : '100vh'
      }, style);
      var anchorContent = /*#__PURE__*/React.createElement("div", {
        ref: _this.wrapperRef,
        className: wrapperClass,
        style: wrapperStyle
      }, /*#__PURE__*/React.createElement("div", {
        className: anchorClass
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-ink")
      }, /*#__PURE__*/React.createElement("span", {
        className: inkClass,
        ref: _this.saveInkNode
      })), children));
      return /*#__PURE__*/React.createElement(_context["default"].Provider, {
        value: {
          registerLink: _this.registerLink,
          unregisterLink: _this.unregisterLink,
          activeLink: _this.state.activeLink,
          scrollTo: _this.handleScrollTo,
          onClick: _this.props.onClick
        }
      }, !affix ? anchorContent : /*#__PURE__*/React.createElement(_affix["default"], {
        offsetTop: offsetTop,
        target: _this.getContainer
      }, anchorContent));
    };

    return _this;
  }

  (0, _createClass2["default"])(Anchor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollContainer = this.getContainer();
      this.scrollEvent = (0, _addEventListener["default"])(this.scrollContainer, 'scroll', this.handleScroll);
      this.handleScroll();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.scrollEvent) {
        var currentContainer = this.getContainer();

        if (this.scrollContainer !== currentContainer) {
          this.scrollContainer = currentContainer;
          this.scrollEvent.remove();
          this.scrollEvent = (0, _addEventListener["default"])(this.scrollContainer, 'scroll', this.handleScroll);
          this.handleScroll();
        }
      }

      this.updateInk();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scrollEvent) {
        this.scrollEvent.remove();
      }
    }
  }, {
    key: "getCurrentAnchor",
    value: function getCurrentAnchor() {
      var offsetTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var getCurrentAnchor = this.props.getCurrentAnchor;

      if (typeof getCurrentAnchor === 'function') {
        return getCurrentAnchor();
      }

      var linkSections = [];
      var container = this.getContainer();
      this.links.forEach(function (link) {
        var sharpLinkMatch = sharpMatcherRegx.exec(link.toString());

        if (!sharpLinkMatch) {
          return;
        }

        var target = document.getElementById(sharpLinkMatch[1]);

        if (target) {
          var top = getOffsetTop(target, container);

          if (top < offsetTop + bounds) {
            linkSections.push({
              link: link,
              top: top
            });
          }
        }
      });

      if (linkSections.length) {
        var maxSection = linkSections.reduce(function (prev, curr) {
          return curr.top > prev.top ? curr : prev;
        });
        return maxSection.link;
      }

      return '';
    }
  }]);
  return Anchor;
}(React.Component);

exports["default"] = Anchor;
Anchor.defaultProps = {
  affix: true,
  showInkInFixed: false
};
Anchor.contextType = _configProvider.ConfigContext;