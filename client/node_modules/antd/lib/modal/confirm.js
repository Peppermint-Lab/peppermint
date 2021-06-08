"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = confirm;
exports.withWarn = withWarn;
exports.withInfo = withInfo;
exports.withSuccess = withSuccess;
exports.withError = withError;
exports.withConfirm = withConfirm;
exports.modalGlobalConfig = modalGlobalConfig;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _InfoCircleOutlined = _interopRequireDefault(require("@ant-design/icons/InfoCircleOutlined"));

var _CheckCircleOutlined = _interopRequireDefault(require("@ant-design/icons/CheckCircleOutlined"));

var _CloseCircleOutlined = _interopRequireDefault(require("@ant-design/icons/CloseCircleOutlined"));

var _ExclamationCircleOutlined = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleOutlined"));

var _locale = require("./locale");

var _Modal = require("./Modal");

var _ConfirmDialog = _interopRequireDefault(require("./ConfirmDialog"));

var _configProvider = require("../config-provider");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

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

var defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

function confirm(config) {
  var div = document.createElement('div');
  document.body.appendChild(div); // eslint-disable-next-line @typescript-eslint/no-use-before-define

  var currentConfig = (0, _extends2["default"])((0, _extends2["default"])({}, config), {
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

    for (var i = 0; i < _Modal.destroyFns.length; i++) {
      var fn = _Modal.destroyFns[i]; // eslint-disable-next-line @typescript-eslint/no-use-before-define

      if (fn === close) {
        _Modal.destroyFns.splice(i, 1);

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
      var runtimeLocale = (0, _locale.getConfirmLocale)();

      var _globalConfig = (0, _configProvider.globalConfig)(),
          getPrefixCls = _globalConfig.getPrefixCls; // because Modal.config  set rootPrefixCls, which is different from other components


      var rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      var prefixCls = customizePrefixCls || "".concat(rootPrefixCls, "-modal");
      ReactDOM.render( /*#__PURE__*/React.createElement(_ConfirmDialog["default"], (0, _extends2["default"])({}, props, {
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

    currentConfig = (0, _extends2["default"])((0, _extends2["default"])({}, currentConfig), {
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
      currentConfig = (0, _extends2["default"])((0, _extends2["default"])({}, currentConfig), configUpdate);
    }

    render(currentConfig);
  }

  render(currentConfig);

  _Modal.destroyFns.push(close);

  return {
    destroy: close,
    update: update
  };
}

function withWarn(props) {
  return (0, _extends2["default"])((0, _extends2["default"])({
    icon: /*#__PURE__*/React.createElement(_ExclamationCircleOutlined["default"], null),
    okCancel: false
  }, props), {
    type: 'warning'
  });
}

function withInfo(props) {
  return (0, _extends2["default"])((0, _extends2["default"])({
    icon: /*#__PURE__*/React.createElement(_InfoCircleOutlined["default"], null),
    okCancel: false
  }, props), {
    type: 'info'
  });
}

function withSuccess(props) {
  return (0, _extends2["default"])((0, _extends2["default"])({
    icon: /*#__PURE__*/React.createElement(_CheckCircleOutlined["default"], null),
    okCancel: false
  }, props), {
    type: 'success'
  });
}

function withError(props) {
  return (0, _extends2["default"])((0, _extends2["default"])({
    icon: /*#__PURE__*/React.createElement(_CloseCircleOutlined["default"], null),
    okCancel: false
  }, props), {
    type: 'error'
  });
}

function withConfirm(props) {
  return (0, _extends2["default"])((0, _extends2["default"])({
    icon: /*#__PURE__*/React.createElement(_ExclamationCircleOutlined["default"], null),
    okCancel: true
  }, props), {
    type: 'confirm'
  });
}

function modalGlobalConfig(_ref) {
  var rootPrefixCls = _ref.rootPrefixCls;
  (0, _devWarning["default"])(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.');
  defaultRootPrefixCls = rootPrefixCls;
}