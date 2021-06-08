import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import classNames from 'classnames';
import ArrowLeftOutlined from "@ant-design/icons/es/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/es/icons/ArrowRightOutlined";
import ResizeObserver from 'rc-resize-observer';
import { ConfigConsumer } from '../config-provider';
import Breadcrumb from '../breadcrumb';
import Avatar from '../avatar';
import TransButton from '../_util/transButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

var renderBack = function renderBack(prefixCls, backIcon, onBack) {
  if (!backIcon || !onBack) {
    return null;
  }

  return /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "PageHeader"
  }, function (_ref) {
    var back = _ref.back;
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-back")
    }, /*#__PURE__*/React.createElement(TransButton, {
      onClick: function onClick(e) {
        onBack === null || onBack === void 0 ? void 0 : onBack(e);
      },
      className: "".concat(prefixCls, "-back-button"),
      "aria-label": back
    }, backIcon));
  });
};

var renderBreadcrumb = function renderBreadcrumb(breadcrumb) {
  return /*#__PURE__*/React.createElement(Breadcrumb, breadcrumb);
};

var getBackIcon = function getBackIcon(props) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ltr';

  if (props.backIcon !== undefined) {
    return props.backIcon;
  }

  return direction === 'rtl' ? /*#__PURE__*/React.createElement(ArrowRightOutlined, null) : /*#__PURE__*/React.createElement(ArrowLeftOutlined, null);
};

var renderTitle = function renderTitle(prefixCls, props) {
  var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ltr';
  var title = props.title,
      avatar = props.avatar,
      subTitle = props.subTitle,
      tags = props.tags,
      extra = props.extra,
      onBack = props.onBack;
  var headingPrefixCls = "".concat(prefixCls, "-heading");
  var hasHeading = title || subTitle || tags || extra; // If there is nothing, return a null

  if (!hasHeading) {
    return null;
  }

  var backIcon = getBackIcon(props, direction);
  var backIconDom = renderBack(prefixCls, backIcon, onBack);
  var hasTitle = backIconDom || avatar || hasHeading;
  return /*#__PURE__*/React.createElement("div", {
    className: headingPrefixCls
  }, hasTitle && /*#__PURE__*/React.createElement("div", {
    className: "".concat(headingPrefixCls, "-left")
  }, backIconDom, avatar && /*#__PURE__*/React.createElement(Avatar, avatar), title && /*#__PURE__*/React.createElement("span", {
    className: "".concat(headingPrefixCls, "-title"),
    title: typeof title === 'string' ? title : undefined
  }, title), subTitle && /*#__PURE__*/React.createElement("span", {
    className: "".concat(headingPrefixCls, "-sub-title"),
    title: typeof subTitle === 'string' ? subTitle : undefined
  }, subTitle), tags && /*#__PURE__*/React.createElement("span", {
    className: "".concat(headingPrefixCls, "-tags")
  }, tags)), extra && /*#__PURE__*/React.createElement("span", {
    className: "".concat(headingPrefixCls, "-extra")
  }, extra));
};

var renderFooter = function renderFooter(prefixCls, footer) {
  if (footer) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-footer")
    }, footer);
  }

  return null;
};

var renderChildren = function renderChildren(prefixCls, children) {
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, children);
};

var PageHeader = function PageHeader(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      compact = _React$useState2[0],
      updateCompact = _React$useState2[1];

  var onResize = function onResize(_ref2) {
    var width = _ref2.width;
    updateCompact(width < 768);
  };

  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref3) {
    var _classNames;

    var getPrefixCls = _ref3.getPrefixCls,
        pageHeader = _ref3.pageHeader,
        direction = _ref3.direction;
    var customizePrefixCls = props.prefixCls,
        style = props.style,
        footer = props.footer,
        children = props.children,
        breadcrumb = props.breadcrumb,
        breadcrumbRender = props.breadcrumbRender,
        customizeClassName = props.className;
    var ghost = true; // Use `ghost` from `props` or from `ConfigProvider` instead.

    if ('ghost' in props) {
      ghost = props.ghost;
    } else if (pageHeader && 'ghost' in pageHeader) {
      ghost = pageHeader.ghost;
    }

    var prefixCls = getPrefixCls('page-header', customizePrefixCls);

    var getDefaultBreadcrumbDom = function getDefaultBreadcrumbDom() {
      var _a;

      if ((_a = breadcrumb) === null || _a === void 0 ? void 0 : _a.routes) {
        return renderBreadcrumb(breadcrumb);
      }

      return null;
    };

    var defaultBreadcrumbDom = getDefaultBreadcrumbDom(); //  support breadcrumbRender function

    var breadcrumbDom = (breadcrumbRender === null || breadcrumbRender === void 0 ? void 0 : breadcrumbRender(props, defaultBreadcrumbDom)) || defaultBreadcrumbDom;
    var className = classNames(prefixCls, customizeClassName, (_classNames = {
      'has-breadcrumb': !!breadcrumbDom,
      'has-footer': !!footer
    }, _defineProperty(_classNames, "".concat(prefixCls, "-ghost"), ghost), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-compact"), compact), _classNames));
    return /*#__PURE__*/React.createElement(ResizeObserver, {
      onResize: onResize
    }, /*#__PURE__*/React.createElement("div", {
      className: className,
      style: style
    }, breadcrumbDom, renderTitle(prefixCls, props, direction), children && renderChildren(prefixCls, children), renderFooter(prefixCls, footer)));
  });
};

export default PageHeader;