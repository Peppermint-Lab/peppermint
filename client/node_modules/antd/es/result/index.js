import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import classNames from 'classnames';
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import WarningFilled from "@ant-design/icons/es/icons/WarningFilled";
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import noFound from './noFound';
import serverError from './serverError';
import unauthorized from './unauthorized';
export var IconMap = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: ExclamationCircleFilled,
  warning: WarningFilled
};
export var ExceptionMap = {
  '404': noFound,
  '500': serverError,
  '403': unauthorized
}; // ExceptionImageMap keys

var ExceptionStatus = Object.keys(ExceptionMap);
/**
 * Render icon if ExceptionStatus includes ,render svg image else render iconNode
 *
 * @param prefixCls
 * @param {status, icon}
 */

var renderIcon = function renderIcon(prefixCls, _ref) {
  var status = _ref.status,
      icon = _ref.icon;
  var className = classNames("".concat(prefixCls, "-icon"));
  devWarning(!(typeof icon === 'string' && icon.length > 2), 'Result', "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(icon, "` at https://ant.design/components/icon"));

  if (ExceptionStatus.includes("".concat(status))) {
    var SVGComponent = ExceptionMap[status];
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(className, " ").concat(prefixCls, "-image")
    }, /*#__PURE__*/React.createElement(SVGComponent, null));
  }

  var iconNode = /*#__PURE__*/React.createElement(IconMap[status]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, icon || iconNode);
};

var renderExtra = function renderExtra(prefixCls, _ref2) {
  var extra = _ref2.extra;
  return extra && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-extra")
  }, extra);
};

var Result = function Result(_ref3) {
  var customizePrefixCls = _ref3.prefixCls,
      customizeClassName = _ref3.className,
      subTitle = _ref3.subTitle,
      title = _ref3.title,
      style = _ref3.style,
      children = _ref3.children,
      _ref3$status = _ref3.status,
      status = _ref3$status === void 0 ? 'info' : _ref3$status,
      icon = _ref3.icon,
      extra = _ref3.extra;

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('result', customizePrefixCls);
  var className = classNames(prefixCls, "".concat(prefixCls, "-").concat(status), customizeClassName, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, renderIcon(prefixCls, {
    status: status,
    icon: icon
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title), subTitle && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-subtitle")
  }, subTitle), renderExtra(prefixCls, {
    extra: extra
  }), children && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, children));
};

Result.PRESENTED_IMAGE_403 = ExceptionMap['403'];
Result.PRESENTED_IMAGE_404 = ExceptionMap['404'];
Result.PRESENTED_IMAGE_500 = ExceptionMap['500'];
export default Result;