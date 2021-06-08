import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import AnchorContext from './context';

var AnchorLink = /*#__PURE__*/function (_React$Component) {
  _inherits(AnchorLink, _React$Component);

  var _super = _createSuper(AnchorLink);

  function AnchorLink() {
    var _this;

    _classCallCheck(this, AnchorLink);

    _this = _super.apply(this, arguments);

    _this.handleClick = function (e) {
      var _this$context = _this.context,
          scrollTo = _this$context.scrollTo,
          onClick = _this$context.onClick;
      var _this$props = _this.props,
          href = _this$props.href,
          title = _this$props.title;
      onClick === null || onClick === void 0 ? void 0 : onClick(e, {
        title: title,
        href: href
      });
      scrollTo(href);
    };

    _this.renderAnchorLink = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props2 = _this.props,
          customizePrefixCls = _this$props2.prefixCls,
          href = _this$props2.href,
          title = _this$props2.title,
          children = _this$props2.children,
          className = _this$props2.className,
          target = _this$props2.target;
      var prefixCls = getPrefixCls('anchor', customizePrefixCls);
      var active = _this.context.activeLink === href;
      var wrapperClassName = classNames("".concat(prefixCls, "-link"), _defineProperty({}, "".concat(prefixCls, "-link-active"), active), className);
      var titleClassName = classNames("".concat(prefixCls, "-link-title"), _defineProperty({}, "".concat(prefixCls, "-link-title-active"), active));
      return /*#__PURE__*/React.createElement("div", {
        className: wrapperClassName
      }, /*#__PURE__*/React.createElement("a", {
        className: titleClassName,
        href: href,
        title: typeof title === 'string' ? title : '',
        target: target,
        onClick: _this.handleClick
      }, title), children);
    };

    return _this;
  }

  _createClass(AnchorLink, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.context.registerLink(this.props.href);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref2) {
      var prevHref = _ref2.href;
      var href = this.props.href;

      if (prevHref !== href) {
        this.context.unregisterLink(prevHref);
        this.context.registerLink(href);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.context.unregisterLink(this.props.href);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConfigConsumer, null, this.renderAnchorLink);
    }
  }]);

  return AnchorLink;
}(React.Component);

AnchorLink.defaultProps = {
  href: '#'
};
AnchorLink.contextType = AnchorContext;
export default AnchorLink;