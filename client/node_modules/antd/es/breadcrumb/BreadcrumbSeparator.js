import * as React from 'react';
import { ConfigContext } from '../config-provider';

var BreadcrumbSeparator = function BreadcrumbSeparator(_ref) {
  var children = _ref.children;

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('breadcrumb');
  return /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-separator")
  }, children || '/');
};

BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;
export default BreadcrumbSeparator;