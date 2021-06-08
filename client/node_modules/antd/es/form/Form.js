import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import FieldForm, { List } from 'rc-field-form';
import { ConfigContext } from '../config-provider';
import { FormContext } from './context';
import useForm from './hooks/useForm';
import SizeContext, { SizeContextProvider } from '../config-provider/SizeContext';

var InternalForm = function InternalForm(props, ref) {
  var _classNames;

  var contextSize = React.useContext(SizeContext);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction,
      contextForm = _React$useContext.form;

  var customizePrefixCls = props.prefixCls,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      _props$size = props.size,
      size = _props$size === void 0 ? contextSize : _props$size,
      form = props.form,
      colon = props.colon,
      labelAlign = props.labelAlign,
      labelCol = props.labelCol,
      wrapperCol = props.wrapperCol,
      hideRequiredMark = props.hideRequiredMark,
      _props$layout = props.layout,
      layout = _props$layout === void 0 ? 'horizontal' : _props$layout,
      scrollToFirstError = props.scrollToFirstError,
      requiredMark = props.requiredMark,
      onFinishFailed = props.onFinishFailed,
      name = props.name,
      restFormProps = __rest(props, ["prefixCls", "className", "size", "form", "colon", "labelAlign", "labelCol", "wrapperCol", "hideRequiredMark", "layout", "scrollToFirstError", "requiredMark", "onFinishFailed", "name"]);

  var mergedRequiredMark = useMemo(function () {
    if (requiredMark !== undefined) {
      return requiredMark;
    }

    if (contextForm && contextForm.requiredMark !== undefined) {
      return contextForm.requiredMark;
    }

    if (hideRequiredMark) {
      return false;
    }

    return true;
  }, [hideRequiredMark, requiredMark, contextForm]);
  var prefixCls = getPrefixCls('form', customizePrefixCls);
  var formClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(layout), true), _defineProperty(_classNames, "".concat(prefixCls, "-hide-required-mark"), mergedRequiredMark === false), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _classNames), className);

  var _useForm = useForm(form),
      _useForm2 = _slicedToArray(_useForm, 1),
      wrapForm = _useForm2[0];

  var __INTERNAL__ = wrapForm.__INTERNAL__;
  __INTERNAL__.name = name;
  var formContextValue = useMemo(function () {
    return {
      name: name,
      labelAlign: labelAlign,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      vertical: layout === 'vertical',
      colon: colon,
      requiredMark: mergedRequiredMark,
      itemRef: __INTERNAL__.itemRef
    };
  }, [name, labelAlign, labelCol, wrapperCol, layout, colon, mergedRequiredMark]);
  React.useImperativeHandle(ref, function () {
    return wrapForm;
  });

  var onInternalFinishFailed = function onInternalFinishFailed(errorInfo) {
    onFinishFailed === null || onFinishFailed === void 0 ? void 0 : onFinishFailed(errorInfo);
    var defaultScrollToFirstError = {
      block: 'nearest'
    };

    if (scrollToFirstError && errorInfo.errorFields.length) {
      if (_typeof(scrollToFirstError) === 'object') {
        defaultScrollToFirstError = scrollToFirstError;
      }

      wrapForm.scrollToField(errorInfo.errorFields[0].name, defaultScrollToFirstError);
    }
  };

  return /*#__PURE__*/React.createElement(SizeContextProvider, {
    size: size
  }, /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: formContextValue
  }, /*#__PURE__*/React.createElement(FieldForm, _extends({
    id: name
  }, restFormProps, {
    name: name,
    onFinishFailed: onInternalFinishFailed,
    form: wrapForm,
    className: formClassName
  }))));
};

var Form = /*#__PURE__*/React.forwardRef(InternalForm);
export { useForm, List };
export default Form;