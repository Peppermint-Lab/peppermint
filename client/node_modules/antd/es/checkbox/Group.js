import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

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
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import Checkbox from './Checkbox';
import { ConfigContext } from '../config-provider';
export var GroupContext = /*#__PURE__*/React.createContext(null);

var InternalCheckboxGroup = function InternalCheckboxGroup(_a, ref) {
  var defaultValue = _a.defaultValue,
      children = _a.children,
      _a$options = _a.options,
      options = _a$options === void 0 ? [] : _a$options,
      customizePrefixCls = _a.prefixCls,
      className = _a.className,
      style = _a.style,
      onChange = _a.onChange,
      restProps = __rest(_a, ["defaultValue", "children", "options", "prefixCls", "className", "style", "onChange"]);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var _React$useState = React.useState(restProps.value || defaultValue || []),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      registeredValues = _React$useState4[0],
      setRegisteredValues = _React$useState4[1];

  React.useEffect(function () {
    if ('value' in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps.value]);

  var getOptions = function getOptions() {
    return options.map(function (option) {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option
        };
      }

      return option;
    });
  };

  var cancelValue = function cancelValue(val) {
    setRegisteredValues(function (prevValues) {
      return prevValues.filter(function (v) {
        return v !== val;
      });
    });
  };

  var registerValue = function registerValue(val) {
    setRegisteredValues(function (prevValues) {
      return [].concat(_toConsumableArray(prevValues), [val]);
    });
  };

  var toggleOption = function toggleOption(option) {
    var optionIndex = value.indexOf(option.value);

    var newValue = _toConsumableArray(value);

    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }

    if (!('value' in restProps)) {
      setValue(newValue);
    }

    var opts = getOptions();
    onChange === null || onChange === void 0 ? void 0 : onChange(newValue.filter(function (val) {
      return registeredValues.indexOf(val) !== -1;
    }).sort(function (a, b) {
      var indexA = opts.findIndex(function (opt) {
        return opt.value === a;
      });
      var indexB = opts.findIndex(function (opt) {
        return opt.value === b;
      });
      return indexA - indexB;
    }));
  };

  var prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  var groupPrefixCls = "".concat(prefixCls, "-group");
  var domProps = omit(restProps, ['value', 'disabled']);

  if (options && options.length > 0) {
    children = getOptions().map(function (option) {
      return /*#__PURE__*/React.createElement(Checkbox, {
        prefixCls: prefixCls,
        key: option.value.toString(),
        disabled: 'disabled' in option ? option.disabled : restProps.disabled,
        value: option.value,
        checked: value.indexOf(option.value) !== -1,
        onChange: option.onChange,
        className: "".concat(groupPrefixCls, "-item"),
        style: option.style
      }, option.label);
    });
  }

  var context = {
    toggleOption: toggleOption,
    value: value,
    disabled: restProps.disabled,
    name: restProps.name,
    // https://github.com/ant-design/ant-design/issues/16376
    registerValue: registerValue,
    cancelValue: cancelValue
  };
  var classString = classNames(groupPrefixCls, _defineProperty({}, "".concat(groupPrefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classString,
    style: style
  }, domProps, {
    ref: ref
  }), /*#__PURE__*/React.createElement(GroupContext.Provider, {
    value: context
  }, children));
};

var CheckboxGroup = /*#__PURE__*/React.forwardRef(InternalCheckboxGroup);
export default /*#__PURE__*/React.memo(CheckboxGroup);