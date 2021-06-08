import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import classNames from 'classnames';
import { withConfigConsumer } from '../config-provider/context';
import Skeleton from '../skeleton';
import StatisticNumber from './Number';

var Statistic = function Statistic(props) {
  var prefixCls = props.prefixCls,
      className = props.className,
      style = props.style,
      valueStyle = props.valueStyle,
      _props$value = props.value,
      value = _props$value === void 0 ? 0 : _props$value,
      title = props.title,
      valueRender = props.valueRender,
      prefix = props.prefix,
      suffix = props.suffix,
      loading = props.loading,
      direction = props.direction,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave;
  var valueNode = /*#__PURE__*/React.createElement(StatisticNumber, _extends({}, props, {
    value: value
  }));
  var cls = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: style,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title), /*#__PURE__*/React.createElement(Skeleton, {
    paragraph: false,
    loading: loading
  }, /*#__PURE__*/React.createElement("div", {
    style: valueStyle,
    className: "".concat(prefixCls, "-content")
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-prefix")
  }, prefix), valueRender ? valueRender(valueNode) : valueNode, suffix && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-suffix")
  }, suffix))));
};

Statistic.defaultProps = {
  decimalSeparator: '.',
  groupSeparator: ',',
  loading: false
};
var WrapperStatistic = withConfigConsumer({
  prefixCls: 'statistic'
})(Statistic);
export default WrapperStatistic;