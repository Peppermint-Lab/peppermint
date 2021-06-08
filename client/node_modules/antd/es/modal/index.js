import OriginModal, { destroyFns } from './Modal';
import confirm, { withWarn, withInfo, withSuccess, withError, withConfirm, modalGlobalConfig } from './confirm';

function modalWarn(props) {
  return confirm(withWarn(props));
}

var Modal = OriginModal;

Modal.info = function infoFn(props) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;
Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    var close = destroyFns.pop();

    if (close) {
      close();
    }
  }
};

Modal.config = modalGlobalConfig;
export default Modal;