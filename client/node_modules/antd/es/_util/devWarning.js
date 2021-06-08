import devWarning, { resetWarned } from "rc-util/es/warning";
export { resetWarned };
export default (function (valid, component, message) {
  devWarning(valid, "[antd: ".concat(component, "] ").concat(message));
});