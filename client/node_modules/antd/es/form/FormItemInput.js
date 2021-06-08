import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import Col from '../grid/col';
import { FormContext, FormItemPrefixContext } from './context';
import ErrorList from './ErrorList';
var iconMap = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined
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
  var formContext = React.useContext(FormContext);
  var mergedWrapperCol = wrapperCol || formContext.wrapperCol || {};
  var className = classNames("".concat(baseClassName, "-control"), mergedWrapperCol.className);
  React.useEffect(function () {
    return function () {
      onDomErrorVisibleChange(false);
    };
  }, []); // Should provides additional icon if `hasFeedback`

  var IconNode = validateStatus && iconMap[validateStatus];
  var icon = hasFeedback && IconNode ? /*#__PURE__*/React.createElement("span", {
    className: "".concat(baseClassName, "-children-icon")
  }, /*#__PURE__*/React.createElement(IconNode, null)) : null; // Pass to sub FormItem should not with col info

  var subFormContext = _extends({}, formContext);

  delete subFormContext.labelCol;
  delete subFormContext.wrapperCol;
  var inputDom = /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-control-input")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-control-input-content")
  }, children), icon);
  var errorListDom = /*#__PURE__*/React.createElement(FormItemPrefixContext.Provider, {
    value: {
      prefixCls: prefixCls,
      status: status
    }
  }, /*#__PURE__*/React.createElement(ErrorList, {
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
  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: subFormContext
  }, /*#__PURE__*/React.createElement(Col, _extends({}, mergedWrapperCol, {
    className: className
  }), dom));
};

export default FormItemInput;