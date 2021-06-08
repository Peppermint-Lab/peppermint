import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

import * as React from 'react';
import Notification from 'rc-notification';
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import classNames from 'classnames';
import CheckCircleOutlined from "@ant-design/icons/es/icons/CheckCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/es/icons/CloseCircleOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/es/icons/ExclamationCircleOutlined";
import InfoCircleOutlined from "@ant-design/icons/es/icons/InfoCircleOutlined";
import createUseNotification from './hooks/useNotification';
import { globalConfig } from '../config-provider';
var notificationInstance = {};
var defaultDuration = 4.5;
var defaultTop = 24;
var defaultBottom = 24;
var defaultPrefixCls = '';
var defaultPlacement = 'topRight';
var defaultGetContainer;
var defaultCloseIcon;
var rtl = false;

function setNotificationConfig(options) {
  var duration = options.duration,
      placement = options.placement,
      bottom = options.bottom,
      top = options.top,
      getContainer = options.getContainer,
      closeIcon = options.closeIcon,
      prefixCls = options.prefixCls;

  if (prefixCls !== undefined) {
    defaultPrefixCls = prefixCls;
  }

  if (duration !== undefined) {
    defaultDuration = duration;
  }

  if (placement !== undefined) {
    defaultPlacement = placement;
  } else if (options.rtl) {
    defaultPlacement = 'topLeft';
  }

  if (bottom !== undefined) {
    defaultBottom = bottom;
  }

  if (top !== undefined) {
    defaultTop = top;
  }

  if (getContainer !== undefined) {
    defaultGetContainer = getContainer;
  }

  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon;
  }

  if (options.rtl !== undefined) {
    rtl = options.rtl;
  }
}

function getPlacementStyle(placement) {
  var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTop;
  var bottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultBottom;
  var style;

  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top: top,
        bottom: 'auto'
      };
      break;

    case 'topRight':
      style = {
        right: 0,
        top: top,
        bottom: 'auto'
      };
      break;

    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom: bottom
      };
      break;

    default:
      style = {
        right: 0,
        top: 'auto',
        bottom: bottom
      };
      break;
  }

  return style;
}

function getNotificationInstance(args, callback) {
  var _args$placement = args.placement,
      placement = _args$placement === void 0 ? defaultPlacement : _args$placement,
      top = args.top,
      bottom = args.bottom,
      _args$getContainer = args.getContainer,
      getContainer = _args$getContainer === void 0 ? defaultGetContainer : _args$getContainer,
      _args$closeIcon = args.closeIcon,
      closeIcon = _args$closeIcon === void 0 ? defaultCloseIcon : _args$closeIcon,
      customizePrefixCls = args.prefixCls;

  var _globalConfig = globalConfig(),
      getPrefixCls = _globalConfig.getPrefixCls;

  var prefixCls = getPrefixCls('notification', customizePrefixCls || defaultPrefixCls);
  var cacheKey = "".concat(prefixCls, "-").concat(placement);
  var cacheInstance = notificationInstance[cacheKey];

  if (cacheInstance) {
    Promise.resolve(cacheInstance).then(function (instance) {
      callback({
        prefixCls: "".concat(prefixCls, "-notice"),
        instance: instance
      });
    });
    return;
  }

  var closeIconToRender = /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-close-x")
  }, closeIcon || /*#__PURE__*/React.createElement(CloseOutlined, {
    className: "".concat(prefixCls, "-close-icon")
  }));
  var notificationClass = classNames("".concat(prefixCls, "-").concat(placement), _defineProperty({}, "".concat(prefixCls, "-rtl"), rtl === true));
  notificationInstance[cacheKey] = new Promise(function (resolve) {
    Notification.newInstance({
      prefixCls: prefixCls,
      className: notificationClass,
      style: getPlacementStyle(placement, top, bottom),
      getContainer: getContainer,
      closeIcon: closeIconToRender
    }, function (notification) {
      resolve(notification);
      callback({
        prefixCls: "".concat(prefixCls, "-notice"),
        instance: notification
      });
    });
  });
}

var typeToIcon = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined
};

function getRCNoticeProps(args, prefixCls) {
  var durationArg = args.duration,
      icon = args.icon,
      type = args.type,
      description = args.description,
      message = args.message,
      btn = args.btn,
      onClose = args.onClose,
      onClick = args.onClick,
      key = args.key,
      style = args.style,
      className = args.className;
  var duration = durationArg === undefined ? defaultDuration : durationArg;
  var iconNode = null;

  if (icon) {
    iconNode = /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-icon")
    }, args.icon);
  } else if (type) {
    iconNode = /*#__PURE__*/React.createElement(typeToIcon[type] || null, {
      className: "".concat(prefixCls, "-icon ").concat(prefixCls, "-icon-").concat(type)
    });
  }

  var autoMarginTag = !description && iconNode ? /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-message-single-line-auto-margin")
  }) : null;
  return {
    content: /*#__PURE__*/React.createElement("div", {
      className: iconNode ? "".concat(prefixCls, "-with-icon") : '',
      role: "alert"
    }, iconNode, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-message")
    }, autoMarginTag, message), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-description")
    }, description), btn ? /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-btn")
    }, btn) : null),
    duration: duration,
    closable: true,
    onClose: onClose,
    onClick: onClick,
    key: key,
    style: style || {},
    className: classNames(className, _defineProperty({}, "".concat(prefixCls, "-").concat(type), !!type))
  };
}

function notice(args) {
  getNotificationInstance(args, function (_ref) {
    var prefixCls = _ref.prefixCls,
        instance = _ref.instance;
    instance.notice(getRCNoticeProps(args, prefixCls));
  });
}

var api = {
  open: notice,
  close: function close(key) {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      return Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
        instance.removeNotice(key);
      });
    });
  },
  config: setNotificationConfig,
  destroy: function destroy() {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
        instance.destroy();
      });
      delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
    });
  }
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
  api[type] = function (args) {
    return api.open(_extends(_extends({}, args), {
      type: type
    }));
  };
});
api.warn = api.warning;
api.useNotification = createUseNotification(getNotificationInstance, getRCNoticeProps);
/** @private test Only function. Not work on production */

export var getInstance = function getInstance(cacheKey) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", process.env.NODE_ENV === 'test' ? notificationInstance[cacheKey] : null);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};
export default api;