import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import IconContext from "@ant-design/icons/es/components/Context";
import { FormProvider as RcFormProvider } from 'rc-field-form';
import useMemo from "rc-util/es/hooks/useMemo";
import LocaleProvider, { ANT_MARK } from '../locale-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer, ConfigContext } from './context';
import SizeContext, { SizeContextProvider } from './SizeContext';
import message from '../message';
import notification from '../notification';
export { ConfigContext, ConfigConsumer };
export var configConsumerProps = ['getTargetContainer', 'getPopupContainer', 'rootPrefixCls', 'getPrefixCls', 'renderEmpty', 'csp', 'autoInsertSpaceInButton', 'locale', 'pageHeader']; // These props is used by `useContext` directly in sub component

var PASSED_PROPS = ['getTargetContainer', 'getPopupContainer', 'renderEmpty', 'pageHeader', 'input', 'form'];
export var defaultPrefixCls = 'ant';
var globalPrefixCls;

var setGlobalConfig = function setGlobalConfig(params) {
  if (params.prefixCls !== undefined) {
    globalPrefixCls = params.prefixCls;
  }
};

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}

export var globalConfig = function globalConfig() {
  return {
    getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? "".concat(getGlobalPrefixCls(), "-").concat(suffixCls) : getGlobalPrefixCls();
    },
    getRootPrefixCls: function getRootPrefixCls(rootPrefixCls, customizePrefixCls) {
      // Customize rootPrefixCls is first priority
      if (rootPrefixCls) {
        return rootPrefixCls;
      } // If Global prefixCls provided, use this


      if (globalPrefixCls) {
        return globalPrefixCls;
      } // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls


      if (customizePrefixCls && customizePrefixCls.includes('-')) {
        return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
      } // Fallback to default prefixCls


      return getGlobalPrefixCls();
    }
  };
};

var ProviderChildren = function ProviderChildren(props) {
  var children = props.children,
      csp = props.csp,
      autoInsertSpaceInButton = props.autoInsertSpaceInButton,
      form = props.form,
      locale = props.locale,
      componentSize = props.componentSize,
      direction = props.direction,
      space = props.space,
      virtual = props.virtual,
      dropdownMatchSelectWidth = props.dropdownMatchSelectWidth,
      legacyLocale = props.legacyLocale,
      parentContext = props.parentContext,
      iconPrefixCls = props.iconPrefixCls;
  var getPrefixCls = React.useCallback(function (suffixCls, customizePrefixCls) {
    var prefixCls = props.prefixCls;
    if (customizePrefixCls) return customizePrefixCls;
    var mergedPrefixCls = prefixCls || parentContext.getPrefixCls('');
    return suffixCls ? "".concat(mergedPrefixCls, "-").concat(suffixCls) : mergedPrefixCls;
  }, [parentContext.getPrefixCls]);

  var config = _extends(_extends({}, parentContext), {
    csp: csp,
    autoInsertSpaceInButton: autoInsertSpaceInButton,
    locale: locale || legacyLocale,
    direction: direction,
    space: space,
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth,
    getPrefixCls: getPrefixCls
  }); // Pass the props used by `useContext` directly with child component.
  // These props should merged into `config`.


  PASSED_PROPS.forEach(function (propName) {
    var propValue = props[propName];

    if (propValue) {
      config[propName] = propValue;
    }
  }); // https://github.com/ant-design/ant-design/issues/27617

  var memoedConfig = useMemo(function () {
    return config;
  }, config, function (prevConfig, currentConfig) {
    var prevKeys = Object.keys(prevConfig);
    var currentKeys = Object.keys(currentConfig);
    return prevKeys.length !== currentKeys.length || prevKeys.some(function (key) {
      return prevConfig[key] !== currentConfig[key];
    });
  });
  var memoIconContextValue = React.useMemo(function () {
    return {
      prefixCls: iconPrefixCls,
      csp: csp
    };
  }, [iconPrefixCls]);
  var childNode = children; // Additional Form provider

  var validateMessages = {};

  if (locale && locale.Form && locale.Form.defaultValidateMessages) {
    validateMessages = locale.Form.defaultValidateMessages;
  }

  if (form && form.validateMessages) {
    validateMessages = _extends(_extends({}, validateMessages), form.validateMessages);
  }

  if (Object.keys(validateMessages).length > 0) {
    childNode = /*#__PURE__*/React.createElement(RcFormProvider, {
      validateMessages: validateMessages
    }, children);
  }

  if (locale) {
    childNode = /*#__PURE__*/React.createElement(LocaleProvider, {
      locale: locale,
      _ANT_MARK__: ANT_MARK
    }, childNode);
  }

  if (iconPrefixCls) {
    childNode = /*#__PURE__*/React.createElement(IconContext.Provider, {
      value: memoIconContextValue
    }, childNode);
  }

  if (componentSize) {
    childNode = /*#__PURE__*/React.createElement(SizeContextProvider, {
      size: componentSize
    }, childNode);
  }

  return /*#__PURE__*/React.createElement(ConfigContext.Provider, {
    value: memoedConfig
  }, childNode);
};

var ConfigProvider = function ConfigProvider(props) {
  React.useEffect(function () {
    if (props.direction) {
      message.config({
        rtl: props.direction === 'rtl'
      });
      notification.config({
        rtl: props.direction === 'rtl'
      });
    }
  }, [props.direction]);
  return /*#__PURE__*/React.createElement(LocaleReceiver, null, function (_, __, legacyLocale) {
    return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (context) {
      return /*#__PURE__*/React.createElement(ProviderChildren, _extends({
        parentContext: context,
        legacyLocale: legacyLocale
      }, props));
    });
  });
};
/** @private internal Usage. do not use in your production */


ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.config = setGlobalConfig;
export default ConfigProvider;