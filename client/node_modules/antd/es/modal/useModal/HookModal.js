import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import ConfirmDialog from '../ConfirmDialog';
import defaultLocale from '../../locale/default';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { ConfigContext } from '../../config-provider';

var HookModal = function HookModal(_ref, ref) {
  var afterClose = _ref.afterClose,
      config = _ref.config;

  var _React$useState = React.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var _React$useState3 = React.useState(config),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      innerConfig = _React$useState4[0],
      setInnerConfig = _React$useState4[1];

  var _React$useContext = React.useContext(ConfigContext),
      direction = _React$useContext.direction,
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('modal');
  var rootPrefixCls = getPrefixCls();

  function close() {
    setVisible(false);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });

    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel();
    }
  }

  React.useImperativeHandle(ref, function () {
    return {
      destroy: close,
      update: function update(newConfig) {
        setInnerConfig(function (originConfig) {
          return _extends(_extends({}, originConfig), newConfig);
        });
      }
    };
  });
  return /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Modal",
    defaultLocale: defaultLocale.Modal
  }, function (modalLocale) {
    return /*#__PURE__*/React.createElement(ConfirmDialog, _extends({
      prefixCls: prefixCls,
      rootPrefixCls: rootPrefixCls
    }, innerConfig, {
      close: close,
      visible: visible,
      afterClose: afterClose,
      okText: innerConfig.okText || (innerConfig.okCancel ? modalLocale.okText : modalLocale.justOkText),
      direction: direction,
      cancelText: innerConfig.cancelText || modalLocale.cancelText
    }));
  });
};

export default /*#__PURE__*/React.forwardRef(HookModal);