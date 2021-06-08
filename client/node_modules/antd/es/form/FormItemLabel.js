import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";

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
import QuestionCircleOutlined from "@ant-design/icons/es/icons/QuestionCircleOutlined";
import Col from '../grid/col';
import { FormContext } from './context';
import { useLocaleReceiver } from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import Tooltip from '../tooltip';

function toTooltipProps(tooltip) {
  if (!tooltip) {
    return null;
  }

  if (_typeof(tooltip) === 'object' && ! /*#__PURE__*/React.isValidElement(tooltip)) {
    return tooltip;
  }

  return {
    title: tooltip
  };
}

var FormItemLabel = function FormItemLabel(_ref) {
  var prefixCls = _ref.prefixCls,
      label = _ref.label,
      htmlFor = _ref.htmlFor,
      labelCol = _ref.labelCol,
      labelAlign = _ref.labelAlign,
      colon = _ref.colon,
      required = _ref.required,
      requiredMark = _ref.requiredMark,
      tooltip = _ref.tooltip;

  var _useLocaleReceiver = useLocaleReceiver('Form'),
      _useLocaleReceiver2 = _slicedToArray(_useLocaleReceiver, 1),
      formLocale = _useLocaleReceiver2[0];

  if (!label) return null;
  return /*#__PURE__*/React.createElement(FormContext.Consumer, {
    key: "label"
  }, function (_ref2) {
    var _classNames;

    var vertical = _ref2.vertical,
        contextLabelAlign = _ref2.labelAlign,
        contextLabelCol = _ref2.labelCol,
        contextColon = _ref2.colon;

    var _a;

    var mergedLabelCol = labelCol || contextLabelCol || {};
    var mergedLabelAlign = labelAlign || contextLabelAlign;
    var labelClsBasic = "".concat(prefixCls, "-item-label");
    var labelColClassName = classNames(labelClsBasic, mergedLabelAlign === 'left' && "".concat(labelClsBasic, "-left"), mergedLabelCol.className);
    var labelChildren = label; // Keep label is original where there should have no colon

    var computedColon = colon === true || contextColon !== false && colon !== false;
    var haveColon = computedColon && !vertical; // Remove duplicated user input colon

    if (haveColon && typeof label === 'string' && label.trim() !== '') {
      labelChildren = label.replace(/[:|：]\s*$/, '');
    } // Tooltip


    var tooltipProps = toTooltipProps(tooltip);

    if (tooltipProps) {
      var _tooltipProps$icon = tooltipProps.icon,
          icon = _tooltipProps$icon === void 0 ? /*#__PURE__*/React.createElement(QuestionCircleOutlined, null) : _tooltipProps$icon,
          restTooltipProps = __rest(tooltipProps, ["icon"]);

      var tooltipNode = /*#__PURE__*/React.createElement(Tooltip, restTooltipProps, /*#__PURE__*/React.cloneElement(icon, {
        className: "".concat(prefixCls, "-item-tooltip")
      }));
      labelChildren = /*#__PURE__*/React.createElement(React.Fragment, null, labelChildren, tooltipNode);
    } // Add required mark if optional


    if (requiredMark === 'optional' && !required) {
      labelChildren = /*#__PURE__*/React.createElement(React.Fragment, null, labelChildren, /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-item-optional")
      }, (formLocale === null || formLocale === void 0 ? void 0 : formLocale.optional) || ((_a = defaultLocale.Form) === null || _a === void 0 ? void 0 : _a.optional)));
    }

    var labelClassName = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-item-required"), required), _defineProperty(_classNames, "".concat(prefixCls, "-item-required-mark-optional"), requiredMark === 'optional'), _defineProperty(_classNames, "".concat(prefixCls, "-item-no-colon"), !computedColon), _classNames));
    return /*#__PURE__*/React.createElement(Col, _extends({}, mergedLabelCol, {
      className: labelColClassName
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: htmlFor,
      className: labelClassName,
      title: typeof label === 'string' ? label : ''
    }, labelChildren));
  });
};

export default FormItemLabel;