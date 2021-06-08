import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useRCNotification from "rc-notification/es/useNotification";
import { ConfigConsumer } from '../../config-provider';
import { attachTypeApi, getKeyThenIncreaseKey } from '..';
export default function createUseMessage(getRcNotificationInstance, getRCNoticeProps) {
  var useMessage = function useMessage() {
    // We can only get content by render
    var getPrefixCls; // We create a proxy to handle delay created instance

    var innerInstance = null;
    var proxy = {
      add: function add(noticeProps, holderCallback) {
        innerInstance === null || innerInstance === void 0 ? void 0 : innerInstance.component.add(noticeProps, holderCallback);
      }
    };

    var _useRCNotification = useRCNotification(proxy),
        _useRCNotification2 = _slicedToArray(_useRCNotification, 2),
        hookNotify = _useRCNotification2[0],
        holder = _useRCNotification2[1];

    function notify(args) {
      var customizePrefixCls = args.prefixCls;
      var mergedPrefixCls = getPrefixCls('message', customizePrefixCls);
      var rootPrefixCls = getPrefixCls();
      var target = args.key || getKeyThenIncreaseKey();
      var closePromise = new Promise(function (resolve) {
        var callback = function callback() {
          if (typeof args.onClose === 'function') {
            args.onClose();
          }

          return resolve(true);
        };

        getRcNotificationInstance(_extends(_extends({}, args), {
          prefixCls: mergedPrefixCls,
          rootPrefixCls: rootPrefixCls
        }), function (_ref) {
          var prefixCls = _ref.prefixCls,
              instance = _ref.instance;
          innerInstance = instance;
          hookNotify(getRCNoticeProps(_extends(_extends({}, args), {
            key: target,
            onClose: callback
          }), prefixCls));
        });
      });

      var result = function result() {
        if (innerInstance) {
          innerInstance.removeNotice(target);
        }
      };

      result.then = function (filled, rejected) {
        return closePromise.then(filled, rejected);
      };

      result.promise = closePromise;
      return result;
    } // Fill functions


    var hookApiRef = React.useRef({});
    hookApiRef.current.open = notify;
    ['success', 'info', 'warning', 'error', 'loading'].forEach(function (type) {
      return attachTypeApi(hookApiRef.current, type);
    });
    return [hookApiRef.current, /*#__PURE__*/React.createElement(ConfigConsumer, {
      key: "holder"
    }, function (context) {
      getPrefixCls = context.getPrefixCls;
      return holder;
    })];
  };

  return useMessage;
}