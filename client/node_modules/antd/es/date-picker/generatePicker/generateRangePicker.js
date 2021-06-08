import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";

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
import CalendarOutlined from "@ant-design/icons/es/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/es/icons/ClockCircleOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import SwapRightOutlined from "@ant-design/icons/es/icons/SwapRightOutlined";
import { RangePicker as RCRangePicker } from 'rc-picker';
import enUS from '../locale/en_US';
import { ConfigContext } from '../../config-provider';
import SizeContext from '../../config-provider/SizeContext';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getRangePlaceholder } from '../util';
import { getTimeProps, Components } from '.';
export default function generateRangePicker(generateConfig) {
  var RangePicker = /*#__PURE__*/function (_React$Component) {
    _inherits(RangePicker, _React$Component);

    var _super = _createSuper(RangePicker);

    function RangePicker() {
      var _this;

      _classCallCheck(this, RangePicker);

      _this = _super.apply(this, arguments);
      _this.pickerRef = /*#__PURE__*/React.createRef();

      _this.focus = function () {
        if (_this.pickerRef.current) {
          _this.pickerRef.current.focus();
        }
      };

      _this.blur = function () {
        if (_this.pickerRef.current) {
          _this.pickerRef.current.blur();
        }
      };

      _this.getDefaultLocale = function () {
        var locale = _this.props.locale;

        var result = _extends(_extends({}, enUS), locale);

        result.lang = _extends(_extends({}, result.lang), (locale || {}).lang);
        return result;
      };

      _this.renderPicker = function (locale) {
        var _this$context = _this.context,
            getPrefixCls = _this$context.getPrefixCls,
            direction = _this$context.direction,
            getPopupContainer = _this$context.getPopupContainer;

        var _a = _this.props,
            customizePrefixCls = _a.prefixCls,
            customGetPopupContainer = _a.getPopupContainer,
            className = _a.className,
            customizeSize = _a.size,
            _a$bordered = _a.bordered,
            bordered = _a$bordered === void 0 ? true : _a$bordered,
            placeholder = _a.placeholder,
            restProps = __rest(_a, ["prefixCls", "getPopupContainer", "className", "size", "bordered", "placeholder"]);

        var _this$props = _this.props,
            format = _this$props.format,
            showTime = _this$props.showTime,
            picker = _this$props.picker;
        var prefixCls = getPrefixCls('picker', customizePrefixCls);
        var additionalOverrideProps = {};
        additionalOverrideProps = _extends(_extends(_extends({}, additionalOverrideProps), showTime ? getTimeProps(_extends({
          format: format,
          picker: picker
        }, showTime)) : {}), picker === 'time' ? getTimeProps(_extends(_extends({
          format: format
        }, _this.props), {
          picker: picker
        })) : {});
        var rootPrefixCls = getPrefixCls();
        return /*#__PURE__*/React.createElement(SizeContext.Consumer, null, function (size) {
          var _classNames;

          var mergedSize = customizeSize || size;
          return /*#__PURE__*/React.createElement(RCRangePicker, _extends({
            separator: /*#__PURE__*/React.createElement("span", {
              "aria-label": "to",
              className: "".concat(prefixCls, "-separator")
            }, /*#__PURE__*/React.createElement(SwapRightOutlined, null)),
            ref: _this.pickerRef,
            placeholder: getRangePlaceholder(picker, locale, placeholder),
            suffixIcon: picker === 'time' ? /*#__PURE__*/React.createElement(ClockCircleOutlined, null) : /*#__PURE__*/React.createElement(CalendarOutlined, null),
            clearIcon: /*#__PURE__*/React.createElement(CloseCircleFilled, null),
            allowClear: true,
            transitionName: "".concat(rootPrefixCls, "-slide-up")
          }, restProps, additionalOverrideProps, {
            className: classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), _defineProperty(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _classNames), className),
            locale: locale.lang,
            prefixCls: prefixCls,
            getPopupContainer: customGetPopupContainer || getPopupContainer,
            generateConfig: generateConfig,
            prevIcon: /*#__PURE__*/React.createElement("span", {
              className: "".concat(prefixCls, "-prev-icon")
            }),
            nextIcon: /*#__PURE__*/React.createElement("span", {
              className: "".concat(prefixCls, "-next-icon")
            }),
            superPrevIcon: /*#__PURE__*/React.createElement("span", {
              className: "".concat(prefixCls, "-super-prev-icon")
            }),
            superNextIcon: /*#__PURE__*/React.createElement("span", {
              className: "".concat(prefixCls, "-super-next-icon")
            }),
            components: Components,
            direction: direction
          }));
        });
      };

      return _this;
    }

    _createClass(RangePicker, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement(LocaleReceiver, {
          componentName: "DatePicker",
          defaultLocale: this.getDefaultLocale
        }, this.renderPicker);
      }
    }]);

    return RangePicker;
  }(React.Component);

  RangePicker.contextType = ConfigContext;
  return RangePicker;
}