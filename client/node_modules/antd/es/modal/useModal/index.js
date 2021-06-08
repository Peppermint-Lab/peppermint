import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import usePatchElement from '../../_util/hooks/usePatchElement';
import HookModal from './HookModal';
import { withConfirm, withInfo, withSuccess, withError, withWarn } from '../confirm';
var uuid = 0;
var ElementsHolder = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (_props, ref) {
  var _usePatchElement = usePatchElement(),
      _usePatchElement2 = _slicedToArray(_usePatchElement, 2),
      elements = _usePatchElement2[0],
      patchElement = _usePatchElement2[1];

  React.useImperativeHandle(ref, function () {
    return {
      patchElement: patchElement
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, elements);
}));
export default function useModal() {
  var holderRef = React.useRef(null); // ========================== Effect ==========================

  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      actionQueue = _React$useState2[0],
      setActionQueue = _React$useState2[1];

  React.useEffect(function () {
    if (actionQueue.length) {
      var cloneQueue = _toConsumableArray(actionQueue);

      cloneQueue.forEach(function (action) {
        action();
      });
      setActionQueue([]);
    }
  }, [actionQueue]); // =========================== Hook ===========================

  var getConfirmFunc = React.useCallback(function (withFunc) {
    return function hookConfirm(config) {
      var _a;

      uuid += 1;
      var modalRef = /*#__PURE__*/React.createRef();
      var closeFunc;
      var modal = /*#__PURE__*/React.createElement(HookModal, {
        key: "modal-".concat(uuid),
        config: withFunc(config),
        ref: modalRef,
        afterClose: function afterClose() {
          closeFunc();
        }
      });
      closeFunc = (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.patchElement(modal);
      return {
        destroy: function destroy() {
          function destroyAction() {
            var _a;

            (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
          }

          if (modalRef.current) {
            destroyAction();
          } else {
            setActionQueue(function (prev) {
              return [].concat(_toConsumableArray(prev), [destroyAction]);
            });
          }
        },
        update: function update(newConfig) {
          function updateAction() {
            var _a;

            (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.update(newConfig);
          }

          if (modalRef.current) {
            updateAction();
          } else {
            setActionQueue(function (prev) {
              return [].concat(_toConsumableArray(prev), [updateAction]);
            });
          }
        }
      };
    };
  }, []);
  var fns = React.useMemo(function () {
    return {
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarn),
      confirm: getConfirmFunc(withConfirm)
    };
  }, []); // eslint-disable-next-line react/jsx-key

  return [fns, /*#__PURE__*/React.createElement(ElementsHolder, {
    ref: holderRef
  })];
}