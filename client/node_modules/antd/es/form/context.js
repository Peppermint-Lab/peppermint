import * as React from 'react';
import omit from "rc-util/es/omit";
import { FormProvider as RcFormProvider } from 'rc-field-form';
export var FormContext = /*#__PURE__*/React.createContext({
  labelAlign: 'right',
  vertical: false,
  itemRef: function itemRef() {}
});
export var FormItemContext = /*#__PURE__*/React.createContext({
  updateItemErrors: function updateItemErrors() {}
});
export var FormProvider = function FormProvider(props) {
  var providerProps = omit(props, ['prefixCls']);
  return /*#__PURE__*/React.createElement(RcFormProvider, providerProps);
};
export var FormItemPrefixContext = /*#__PURE__*/React.createContext({
  prefixCls: ''
});