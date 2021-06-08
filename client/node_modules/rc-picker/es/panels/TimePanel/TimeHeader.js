import * as React from 'react';
import Header from '../Header';
import PanelContext from '../../PanelContext';
import { formatValue } from '../../utils/dateUtil';

function TimeHeader(props) {
  var _React$useContext = React.useContext(PanelContext),
      hideHeader = _React$useContext.hideHeader;

  if (hideHeader) {
    return null;
  }

  var prefixCls = props.prefixCls,
      generateConfig = props.generateConfig,
      locale = props.locale,
      value = props.value,
      format = props.format;
  var headerPrefixCls = "".concat(prefixCls, "-header");
  return /*#__PURE__*/React.createElement(Header, {
    prefixCls: headerPrefixCls
  }, value ? formatValue(value, {
    locale: locale,
    format: format,
    generateConfig: generateConfig
  }) : "\xA0");
}

export default TimeHeader;