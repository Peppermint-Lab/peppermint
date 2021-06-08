"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Header = _interopRequireDefault(require("../Header"));

var _PanelContext = _interopRequireDefault(require("../../PanelContext"));

var _dateUtil = require("../../utils/dateUtil");

function TimeHeader(props) {
  var _React$useContext = React.useContext(_PanelContext.default),
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
  return /*#__PURE__*/React.createElement(_Header.default, {
    prefixCls: headerPrefixCls
  }, value ? (0, _dateUtil.formatValue)(value, {
    locale: locale,
    format: format,
    generateConfig: generateConfig
  }) : "\xA0");
}

var _default = TimeHeader;
exports.default = _default;