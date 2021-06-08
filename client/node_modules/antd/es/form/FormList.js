import _extends from "@babel/runtime/helpers/esm/extends";

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
import { List } from 'rc-field-form';
import devWarning from '../_util/devWarning';
import { ConfigContext } from '../config-provider';
import { FormItemPrefixContext } from './context';

var FormList = function FormList(_a) {
  var customizePrefixCls = _a.prefixCls,
      children = _a.children,
      props = __rest(_a, ["prefixCls", "children"]);

  devWarning(!!props.name, 'Form.List', 'Miss `name` prop.');

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('form', customizePrefixCls);
  return /*#__PURE__*/React.createElement(List, props, function (fields, operation, meta) {
    return /*#__PURE__*/React.createElement(FormItemPrefixContext.Provider, {
      value: {
        prefixCls: prefixCls,
        status: 'error'
      }
    }, children(fields.map(function (field) {
      return _extends(_extends({}, field), {
        fieldKey: field.key
      });
    }), operation, {
      errors: meta.errors
    }));
  });
};

export default FormList;