import _extends from "@babel/runtime/helpers/esm/extends";
import defaultLocale from '../locale/default';

var runtimeLocale = _extends({}, defaultLocale.Modal);

export function changeConfirmLocale(newLocale) {
  if (newLocale) {
    runtimeLocale = _extends(_extends({}, runtimeLocale), newLocale);
  } else {
    runtimeLocale = _extends({}, defaultLocale.Modal);
  }
}
export function getConfirmLocale() {
  return runtimeLocale;
}