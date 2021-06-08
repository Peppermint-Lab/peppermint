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
import * as ReactDOM from 'react-dom';
import InfoCircleOutlined from "@ant-design/icons/es/icons/InfoCircleOutlined";
import CheckCircleOutlined from "@ant-design/icons/es/icons/CheckCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/es/icons/CloseCircleOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/es/icons/ExclamationCircleOutlined";
import { getConfirmLocale } from './locale';
import { destroyFns } from './Modal';
import ConfirmDialog from './ConfirmDialog';
import { globalConfig } from '../config-provider';
import devWarning from '../_util/devWarning';
var defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

export default function confirm(config) {
  var div = document.createElement('div');
  document.body.appendChild(div); // eslint-disable-next-line @typescript-eslint/no-use-before-define

  var currentConfig = _extends(_extends({}, config), {
    close: close,
    visible: true
  });

  function destroy() {
    var unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });

    if (config.onCancel && triggerCancel) {
      config.onCancel.apply(config, args);
    }

    for (var i = 0; i < destroyFns.length; i++) {
      var fn = destroyFns[i]; // eslint-disable-next-line @typescript-eslint/no-use-before-define

      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(_a) {
    var okText = _a.okText,
        cancelText = _a.cancelText,
        customizePrefixCls = _a.prefixCls,
        props = __rest(_a, ["okText", "cancelText", "prefixCls"]);
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */


    setTimeout(function () {
      var runtimeLocale = getConfirmLocale();

      var _globalConfig = globalConfig(),
          getPrefixCls = _globalConfig.getPrefixCls; // because Modal.config  set rootPrefixCls, which is different from other components


      var rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      var prefixCls = customizePrefixCls || "".concat(rootPrefixCls, "-modal");
      ReactDOM.render( /*#__PURE__*/React.createElement(ConfirmDialog, _extends({}, props, {
        prefixCls: prefixCls,
        rootPrefixCls: rootPrefixCls,
        okText: okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText),
        cancelText: cancelText || runtimeLocale.cancelText
      })), div);
    });
  }

  function close() {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    currentConfig = _extends(_extends({}, currentConfig), {
      visible: false,
      afterClose: function afterClose() {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }

        destroy.apply(_this, args);
      }
    });
    render(currentConfig);
  }

  function update(configUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = _extends(_extends({}, currentConfig), configUpdate);
    }

    render(currentConfig);
  }

  render(currentConfig);
  destroyFns.push(close);
  return {
    destroy: close,
    update: update
  };
}
export function withWarn(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'warning'
  });
}
export function withInfo(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(InfoCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'info'
  });
}
export function withSuccess(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(CheckCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'success'
  });
}
export function withError(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(CloseCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'error'
  });
}
export function withConfirm(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null),
    okCancel: true
  }, props), {
    type: 'confirm'
  });
}
export function modalGlobalConfig(_ref) {
  var rootPrefixCls = _ref.rootPrefixCls;
  devWarning(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.');
  defaultRootPrefixCls = rootPrefixCls;
}