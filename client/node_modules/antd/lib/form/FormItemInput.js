"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));

var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));

var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));

var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));

var _col = _interopRequireDefault(require("../grid/col"));

var _context = require("./context");

var _ErrorList = _interopRequireDefault(require("./ErrorList"));

var iconMap = {
  success: _CheckCircleFilled["default"],
  warning: _ExclamationCircleFilled["default"],
  error: _CloseCircleFilled["default"],
  validating: _LoadingOutlined["default"]
};

var FormItemInput = function FormItemInput(props) {
  var prefixCls = props.prefixCls,
      status = props.status,
      wrapperCol = props.wrapperCol,
      children = props.children,
      help = props.help,
      errors = props.errors,
      onDomErrorVisibleChange = props.onDomErrorVisibleChange,
      hasFeedback = props.hasFeedback,
      formItemRender = props._internalItemRender,
      validateStatus = props.validateStatus,
      extra = props.extra;
  var baseClassName = "".concat(prefixCls, "-item");
  var formContext = React.useContext(_context.FormContext);
  var mergedWrapperCol = wrapperCol || formContext.wrapperCol || {};
  var className = (0, _classnames["default"])("".concat(baseClassName, "-control"), mergedWrapperCol.className);
  React.useEffect(function () {
    return function () {
      onDomErrorVisibleChange(false);
    };
  }, []); // Should provides additional icon if `hasFeedback`

  var IconNode = validateStatus && iconMap[validateStatus];
  var icon = hasFeedback && IconNode ? /*#__PURE__*/React.createElement("span", {
    className: "".concat(baseClassName, "-children-icon")
  }, /*#__PURE__*/React.createElement(IconNode, null)) : null; // Pass to sub FormItem should not with col info

  var subFormContext = (0, _extends2["default"])({}, formContext);
  delete subFormContext.labelCol;
  delete subFormContext.wrapperCol;
  var inputDom = /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-control-input")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-control-input-content")
  }, children), icon);
  var errorListDom = /*#__PURE__*/React.createElement(_context.FormItemPrefixContext.Provider, {
    value: {
      prefixCls: prefixCls,
      status: status
    }
  }, /*#__PURE__*/React.createElement(_ErrorList["default"], {
    errors: errors,
    help: help,
    onDomErrorVisibleChange: onDomErrorVisibleChange
  })); // If extra = 0, && will goes wrong
  // 0&&error -> 0

  var extraDom = extra ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-extra")
  }, extra) : null;
  var dom = formItemRender && formItemRender.mark === 'pro_table_render' && formItemRender.render ? formItemRender.render(props, {
    input: inputDom,
    errorList: errorListDom,
    extra: extraDom
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, inputDom, errorListDom, extraDom);
  return /*#__PURE__*/React.createElement(_context.FormContext.Provider, {
    value: subFormContext
  }, /*#__PURE__*/React.createElement(_col["default"], (0, _extends2["default"])({}, mergedWrapperCol, {
    className: className
  }), dom));
};

var _default = FormItemInput;
exports["default"] = _default;