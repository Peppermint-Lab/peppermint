import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
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
import { useContext, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { Field } from 'rc-field-form';
import FieldContext from "rc-field-form/es/FieldContext";
import { supportRef } from "rc-util/es/ref";
import omit from "rc-util/es/omit";
import Row from '../grid/row';
import { ConfigContext } from '../config-provider';
import { tuple } from '../_util/type';
import devWarning from '../_util/devWarning';
import FormItemLabel from './FormItemLabel';
import FormItemInput from './FormItemInput';
import { FormContext, FormItemContext } from './context';
import { toArray, getFieldId } from './util';
import { cloneElement, isValidElement } from '../_util/reactNode';
import useFrameState from './hooks/useFrameState';
import useItemRef from './hooks/useItemRef';
var NAME_SPLIT = '__SPLIT__';
var ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
var MemoInput = /*#__PURE__*/React.memo(function (_ref) {
  var children = _ref.children;
  return children;
}, function (prev, next) {
  return prev.value === next.value && prev.update === next.update;
});

function hasValidName(name) {
  if (name === null) {
    devWarning(false, 'Form.Item', '`null` is passed as `name` property');
  }

  return !(name === undefined || name === null);
}

function FormItem(props) {
  var name = props.name,
      fieldKey = props.fieldKey,
      noStyle = props.noStyle,
      dependencies = props.dependencies,
      customizePrefixCls = props.prefixCls,
      style = props.style,
      className = props.className,
      shouldUpdate = props.shouldUpdate,
      hasFeedback = props.hasFeedback,
      help = props.help,
      rules = props.rules,
      validateStatus = props.validateStatus,
      children = props.children,
      required = props.required,
      label = props.label,
      messageVariables = props.messageVariables,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'onChange' : _props$trigger,
      validateTrigger = props.validateTrigger,
      hidden = props.hidden,
      restProps = __rest(props, ["name", "fieldKey", "noStyle", "dependencies", "prefixCls", "style", "className", "shouldUpdate", "hasFeedback", "help", "rules", "validateStatus", "children", "required", "label", "messageVariables", "trigger", "validateTrigger", "hidden"]);

  var destroyRef = useRef(false);

  var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var _useContext2 = useContext(FormContext),
      formName = _useContext2.name,
      requiredMark = _useContext2.requiredMark;

  var _useContext3 = useContext(FormItemContext),
      updateItemErrors = _useContext3.updateItemErrors;

  var _React$useState = React.useState(!!help),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      domErrorVisible = _React$useState2[0],
      innerSetDomErrorVisible = _React$useState2[1];

  var _useFrameState = useFrameState({}),
      _useFrameState2 = _slicedToArray(_useFrameState, 2),
      inlineErrors = _useFrameState2[0],
      setInlineErrors = _useFrameState2[1];

  var _useContext4 = useContext(FieldContext),
      contextValidateTrigger = _useContext4.validateTrigger;

  var mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  function setDomErrorVisible(visible) {
    if (!destroyRef.current) {
      innerSetDomErrorVisible(visible);
    }
  }

  var hasName = hasValidName(name); // Cache Field NamePath

  var nameRef = useRef([]); // Should clean up if Field removed

  React.useEffect(function () {
    return function () {
      destroyRef.current = true;
      updateItemErrors(nameRef.current.join(NAME_SPLIT), []);
    };
  }, []);
  var prefixCls = getPrefixCls('form', customizePrefixCls); // ======================== Errors ========================
  // Collect noStyle Field error to the top FormItem

  var updateChildItemErrors = noStyle ? updateItemErrors : function (subName, subErrors, originSubName) {
    setInlineErrors(function () {
      var prevInlineErrors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // Clean up origin error when name changed
      if (originSubName !== subName) {
        delete prevInlineErrors[originSubName];
      }

      if (!isEqual(prevInlineErrors[subName], subErrors)) {
        return _extends(_extends({}, prevInlineErrors), _defineProperty({}, subName, subErrors));
      }

      return prevInlineErrors;
    });
  }; // ===================== Children Ref =====================

  var getItemRef = useItemRef();

  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    var _itemClassName;

    var _a;

    if (noStyle && !hidden) {
      return baseChildren;
    } // ======================== Errors ========================
    // >>> collect sub errors


    var subErrorList = [];
    Object.keys(inlineErrors).forEach(function (subName) {
      subErrorList = [].concat(_toConsumableArray(subErrorList), _toConsumableArray(inlineErrors[subName] || []));
    }); // >>> merged errors

    var mergedErrors;

    if (help !== undefined && help !== null) {
      mergedErrors = toArray(help);
    } else {
      mergedErrors = meta ? meta.errors : [];
      mergedErrors = [].concat(_toConsumableArray(mergedErrors), _toConsumableArray(subErrorList));
    } // ======================== Status ========================


    var mergedValidateStatus = '';

    if (validateStatus !== undefined) {
      mergedValidateStatus = validateStatus;
    } else if (meta === null || meta === void 0 ? void 0 : meta.validating) {
      mergedValidateStatus = 'validating';
    } else if (((_a = meta === null || meta === void 0 ? void 0 : meta.errors) === null || _a === void 0 ? void 0 : _a.length) || subErrorList.length) {
      mergedValidateStatus = 'error';
    } else if (meta === null || meta === void 0 ? void 0 : meta.touched) {
      mergedValidateStatus = 'success';
    }

    var itemClassName = (_itemClassName = {}, _defineProperty(_itemClassName, "".concat(prefixCls, "-item"), true), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-with-help"), domErrorVisible || !!help), _defineProperty(_itemClassName, "".concat(className), !!className), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-feedback"), mergedValidateStatus && hasFeedback), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-success"), mergedValidateStatus === 'success'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-warning"), mergedValidateStatus === 'warning'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-has-error"), mergedValidateStatus === 'error'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-is-validating"), mergedValidateStatus === 'validating'), _defineProperty(_itemClassName, "".concat(prefixCls, "-item-hidden"), hidden), _itemClassName); // ======================= Children =======================

    return /*#__PURE__*/React.createElement(Row, _extends({
      className: classNames(itemClassName),
      style: style,
      key: "row"
    }, omit(restProps, ['colon', 'extra', 'getValueFromEvent', 'getValueProps', 'htmlFor', 'id', 'initialValue', 'isListField', 'labelAlign', 'labelCol', 'normalize', 'preserve', 'tooltip', 'validateFirst', 'valuePropName', 'wrapperCol', '_internalItemRender'])), /*#__PURE__*/React.createElement(FormItemLabel, _extends({
      htmlFor: fieldId,
      required: isRequired,
      requiredMark: requiredMark
    }, props, {
      prefixCls: prefixCls
    })), /*#__PURE__*/React.createElement(FormItemInput, _extends({}, props, meta, {
      errors: mergedErrors,
      prefixCls: prefixCls,
      status: mergedValidateStatus,
      onDomErrorVisibleChange: setDomErrorVisible,
      validateStatus: mergedValidateStatus
    }), /*#__PURE__*/React.createElement(FormItemContext.Provider, {
      value: {
        updateItemErrors: updateChildItemErrors
      }
    }, baseChildren)));
  }

  var isRenderProps = typeof children === 'function'; // Record for real component render

  var updateRef = useRef(0);
  updateRef.current += 1;

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children);
  }

  var variables = {};

  if (typeof label === 'string') {
    variables.label = label;
  }

  if (messageVariables) {
    variables = _extends(_extends({}, variables), messageVariables);
  }

  return /*#__PURE__*/React.createElement(Field, _extends({}, props, {
    messageVariables: variables,
    trigger: trigger,
    validateTrigger: mergedValidateTrigger,
    onReset: function onReset() {
      setDomErrorVisible(false);
    }
  }), function (control, meta, context) {
    var errors = meta.errors;
    var mergedName = toArray(name).length && meta ? meta.name : [];
    var fieldId = getFieldId(mergedName, formName);

    if (noStyle) {
      // Clean up origin one
      var originErrorName = nameRef.current.join(NAME_SPLIT);
      nameRef.current = _toConsumableArray(mergedName);

      if (fieldKey) {
        var fieldKeys = Array.isArray(fieldKey) ? fieldKey : [fieldKey];
        nameRef.current = [].concat(_toConsumableArray(mergedName.slice(0, -1)), _toConsumableArray(fieldKeys));
      }

      updateItemErrors(nameRef.current.join(NAME_SPLIT), errors, originErrorName);
    }

    var isRequired = required !== undefined ? required : !!(rules && rules.some(function (rule) {
      if (rule && _typeof(rule) === 'object' && rule.required) {
        return true;
      }

      if (typeof rule === 'function') {
        var ruleEntity = rule(context);
        return ruleEntity && ruleEntity.required;
      }

      return false;
    })); // ======================= Children =======================

    var mergedControl = _extends({}, control);

    var childNode = null;
    devWarning(!(shouldUpdate && dependencies), 'Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together. See https://ant.design/components/form/#dependencies.");

    if (Array.isArray(children) && hasName) {
      devWarning(false, 'Form.Item', '`children` is array of render props cannot have `name`.');
      childNode = children;
    } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
      devWarning(!!(shouldUpdate || dependencies), 'Form.Item', '`children` of render props only work with `shouldUpdate` or `dependencies`.');
      devWarning(!hasName, 'Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
    } else if (dependencies && !isRenderProps && !hasName) {
      devWarning(false, 'Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
    } else if (isValidElement(children)) {
      devWarning(children.props.defaultValue === undefined, 'Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');

      var childProps = _extends(_extends({}, children.props), mergedControl);

      if (!childProps.id) {
        childProps.id = fieldId;
      }

      if (supportRef(children)) {
        childProps.ref = getItemRef(mergedName, children);
      } // We should keep user origin event handler


      var triggers = new Set([].concat(_toConsumableArray(toArray(trigger)), _toConsumableArray(toArray(mergedValidateTrigger))));
      triggers.forEach(function (eventName) {
        childProps[eventName] = function () {
          var _a2, _c2;

          var _a, _b, _c;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_a = mergedControl[eventName]) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [mergedControl].concat(args));
          (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : (_c2 = _c).call.apply(_c2, [_b].concat(args));
        };
      });
      childNode = /*#__PURE__*/React.createElement(MemoInput, {
        value: mergedControl[props.valuePropName || 'value'],
        update: updateRef.current
      }, cloneElement(children, childProps));
    } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
      childNode = children(context);
    } else {
      devWarning(!mergedName.length, 'Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
      childNode = children;
    }

    return renderLayout(childNode, fieldId, meta, isRequired);
  });
}

export default FormItem;