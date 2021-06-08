"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useModal;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _usePatchElement3 = _interopRequireDefault(require("../../_util/hooks/usePatchElement"));

var _HookModal = _interopRequireDefault(require("./HookModal"));

var _confirm = require("../confirm");

var uuid = 0;
var ElementsHolder = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (_props, ref) {
  var _usePatchElement = (0, _usePatchElement3["default"])(),
      _usePatchElement2 = (0, _slicedToArray2["default"])(_usePatchElement, 2),
      elements = _usePatchElement2[0],
      patchElement = _usePatchElement2[1];

  React.useImperativeHandle(ref, function () {
    return {
      patchElement: patchElement
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, elements);
}));

function useModal() {
  var holderRef = React.useRef(null); // ========================== Effect ==========================

  var _React$useState = React.useState([]),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      actionQueue = _React$useState2[0],
      setActionQueue = _React$useState2[1];

  React.useEffect(function () {
    if (actionQueue.length) {
      var cloneQueue = (0, _toConsumableArray2["default"])(actionQueue);
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
      var modal = /*#__PURE__*/React.createElement(_HookModal["default"], {
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
              return [].concat((0, _toConsumableArray2["default"])(prev), [destroyAction]);
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
              return [].concat((0, _toConsumableArray2["default"])(prev), [updateAction]);
            });
          }
        }
      };
    };
  }, []);
  var fns = React.useMemo(function () {
    return {
      info: getConfirmFunc(_confirm.withInfo),
      success: getConfirmFunc(_confirm.withSuccess),
      error: getConfirmFunc(_confirm.withError),
      warning: getConfirmFunc(_confirm.withWarn),
      confirm: getConfirmFunc(_confirm.withConfirm)
    };
  }, []); // eslint-disable-next-line react/jsx-key

  return [fns, /*#__PURE__*/React.createElement(ElementsHolder, {
    ref: holderRef
  })];
}