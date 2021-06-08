"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcFieldForm = require("rc-field-form");

var _FieldContext = _interopRequireDefault(require("rc-field-form/lib/FieldContext"));

var _ref2 = require("rc-util/lib/ref");

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _row = _interopRequireDefault(require("../grid/row"));

var _configProvider = require("../config-provider");

var _type = require("../_util/type");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _FormItemLabel = _interopRequireDefault(require("./FormItemLabel"));

var _FormItemInput = _interopRequireDefault(require("./FormItemInput"));

var _context = require("./context");

var _util = require("./util");

var _reactNode = require("../_util/reactNode");

var _useFrameState3 = _interopRequireDefault(require("./hooks/useFrameState"));

var _useItemRef = _interopRequireDefault(require("./hooks/useItemRef"));

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var NAME_SPLIT = '__SPLIT__';
var ValidateStatuses = (0, _type.tuple)('success', 'warning', 'error', 'validating', '');
var MemoInput = /*#__PURE__*/React.memo(function (_ref) {
  var children = _ref.children;
  return children;
}, function (prev, next) {
  return prev.value === next.value && prev.update === next.update;
});

function hasValidName(name) {
  if (name === null) {
    (0, _devWarning["default"])(false, 'Form.Item', '`null` is passed as `name` property');
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

  var destroyRef = (0, React.useRef)(false);

  var _useContext = (0, React.useContext)(_configProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var _useContext2 = (0, React.useContext)(_context.FormContext),
      formName = _useContext2.name,
      requiredMark = _useContext2.requiredMark;

  var _useContext3 = (0, React.useContext)(_context.FormItemContext),
      updateItemErrors = _useContext3.updateItemErrors;

  var _React$useState = React.useState(!!help),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      domErrorVisible = _React$useState2[0],
      innerSetDomErrorVisible = _React$useState2[1];

  var _useFrameState = (0, _useFrameState3["default"])({}),
      _useFrameState2 = (0, _slicedToArray2["default"])(_useFrameState, 2),
      inlineErrors = _useFrameState2[0],
      setInlineErrors = _useFrameState2[1];

  var _useContext4 = (0, React.useContext)(_FieldContext["default"]),
      contextValidateTrigger = _useContext4.validateTrigger;

  var mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  function setDomErrorVisible(visible) {
    if (!destroyRef.current) {
      innerSetDomErrorVisible(visible);
    }
  }

  var hasName = hasValidName(name); // Cache Field NamePath

  var nameRef = (0, React.useRef)([]); // Should clean up if Field removed

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

      if (!(0, _isEqual["default"])(prevInlineErrors[subName], subErrors)) {
        return (0, _extends3["default"])((0, _extends3["default"])({}, prevInlineErrors), (0, _defineProperty2["default"])({}, subName, subErrors));
      }

      return prevInlineErrors;
    });
  }; // ===================== Children Ref =====================

  var getItemRef = (0, _useItemRef["default"])();

  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    var _itemClassName;

    var _a;

    if (noStyle && !hidden) {
      return baseChildren;
    } // ======================== Errors ========================
    // >>> collect sub errors


    var subErrorList = [];
    Object.keys(inlineErrors).forEach(function (subName) {
      subErrorList = [].concat((0, _toConsumableArray2["default"])(subErrorList), (0, _toConsumableArray2["default"])(inlineErrors[subName] || []));
    }); // >>> merged errors

    var mergedErrors;

    if (help !== undefined && help !== null) {
      mergedErrors = (0, _util.toArray)(help);
    } else {
      mergedErrors = meta ? meta.errors : [];
      mergedErrors = [].concat((0, _toConsumableArray2["default"])(mergedErrors), (0, _toConsumableArray2["default"])(subErrorList));
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

    var itemClassName = (_itemClassName = {}, (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item"), true), (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item-with-help"), domErrorVisible || !!help), (0, _defineProperty2["default"])(_itemClassName, "".concat(className), !!className), (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item-has-feedback"), mergedValidateStatus && hasFeedback), (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item-has-success"), mergedValidateStatus === 'success'), (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item-has-warning"), mergedValidateStatus === 'warning'), (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item-has-error"), mergedValidateStatus === 'error'), (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item-is-validating"), mergedValidateStatus === 'validating'), (0, _defineProperty2["default"])(_itemClassName, "".concat(prefixCls, "-item-hidden"), hidden), _itemClassName); // ======================= Children =======================

    return /*#__PURE__*/React.createElement(_row["default"], (0, _extends3["default"])({
      className: (0, _classnames["default"])(itemClassName),
      style: style,
      key: "row"
    }, (0, _omit["default"])(restProps, ['colon', 'extra', 'getValueFromEvent', 'getValueProps', 'htmlFor', 'id', 'initialValue', 'isListField', 'labelAlign', 'labelCol', 'normalize', 'preserve', 'tooltip', 'validateFirst', 'valuePropName', 'wrapperCol', '_internalItemRender'])), /*#__PURE__*/React.createElement(_FormItemLabel["default"], (0, _extends3["default"])({
      htmlFor: fieldId,
      required: isRequired,
      requiredMark: requiredMark
    }, props, {
      prefixCls: prefixCls
    })), /*#__PURE__*/React.createElement(_FormItemInput["default"], (0, _extends3["default"])({}, props, meta, {
      errors: mergedErrors,
      prefixCls: prefixCls,
      status: mergedValidateStatus,
      onDomErrorVisibleChange: setDomErrorVisible,
      validateStatus: mergedValidateStatus
    }), /*#__PURE__*/React.createElement(_context.FormItemContext.Provider, {
      value: {
        updateItemErrors: updateChildItemErrors
      }
    }, baseChildren)));
  }

  var isRenderProps = typeof children === 'function'; // Record for real component render

  var updateRef = (0, React.useRef)(0);
  updateRef.current += 1;

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children);
  }

  var variables = {};

  if (typeof label === 'string') {
    variables.label = label;
  }

  if (messageVariables) {
    variables = (0, _extends3["default"])((0, _extends3["default"])({}, variables), messageVariables);
  }

  return /*#__PURE__*/React.createElement(_rcFieldForm.Field, (0, _extends3["default"])({}, props, {
    messageVariables: variables,
    trigger: trigger,
    validateTrigger: mergedValidateTrigger,
    onReset: function onReset() {
      setDomErrorVisible(false);
    }
  }), function (control, meta, context) {
    var errors = meta.errors;
    var mergedName = (0, _util.toArray)(name).length && meta ? meta.name : [];
    var fieldId = (0, _util.getFieldId)(mergedName, formName);

    if (noStyle) {
      // Clean up origin one
      var originErrorName = nameRef.current.join(NAME_SPLIT);
      nameRef.current = (0, _toConsumableArray2["default"])(mergedName);

      if (fieldKey) {
        var fieldKeys = Array.isArray(fieldKey) ? fieldKey : [fieldKey];
        nameRef.current = [].concat((0, _toConsumableArray2["default"])(mergedName.slice(0, -1)), (0, _toConsumableArray2["default"])(fieldKeys));
      }

      updateItemErrors(nameRef.current.join(NAME_SPLIT), errors, originErrorName);
    }

    var isRequired = required !== undefined ? required : !!(rules && rules.some(function (rule) {
      if (rule && (0, _typeof2["default"])(rule) === 'object' && rule.required) {
        return true;
      }

      if (typeof rule === 'function') {
        var ruleEntity = rule(context);
        return ruleEntity && ruleEntity.required;
      }

      return false;
    })); // ======================= Children =======================

    var mergedControl = (0, _extends3["default"])({}, control);
    var childNode = null;
    (0, _devWarning["default"])(!(shouldUpdate && dependencies), 'Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together. See https://ant.design/components/form/#dependencies.");

    if (Array.isArray(children) && hasName) {
      (0, _devWarning["default"])(false, 'Form.Item', '`children` is array of render props cannot have `name`.');
      childNode = children;
    } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
      (0, _devWarning["default"])(!!(shouldUpdate || dependencies), 'Form.Item', '`children` of render props only work with `shouldUpdate` or `dependencies`.');
      (0, _devWarning["default"])(!hasName, 'Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
    } else if (dependencies && !isRenderProps && !hasName) {
      (0, _devWarning["default"])(false, 'Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
    } else if ((0, _reactNode.isValidElement)(children)) {
      (0, _devWarning["default"])(children.props.defaultValue === undefined, 'Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');
      var childProps = (0, _extends3["default"])((0, _extends3["default"])({}, children.props), mergedControl);

      if (!childProps.id) {
        childProps.id = fieldId;
      }

      if ((0, _ref2.supportRef)(children)) {
        childProps.ref = getItemRef(mergedName, children);
      } // We should keep user origin event handler


      var triggers = new Set([].concat((0, _toConsumableArray2["default"])((0, _util.toArray)(trigger)), (0, _toConsumableArray2["default"])((0, _util.toArray)(mergedValidateTrigger))));
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
      }, (0, _reactNode.cloneElement)(children, childProps));
    } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
      childNode = children(context);
    } else {
      (0, _devWarning["default"])(!mergedName.length, 'Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
      childNode = children;
    }

    return renderLayout(childNode, fieldId, meta, isRequired);
  });
}

var _default = FormItem;
exports["default"] = _default;