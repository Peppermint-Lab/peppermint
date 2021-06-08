import * as React from 'react';
var isValidElement = React.isValidElement;
export { isValidElement };
export function replaceElement(element, replacement, props) {
  if (!isValidElement(element)) return replacement;
  return /*#__PURE__*/React.cloneElement(element, typeof props === 'function' ? props(element.props || {}) : props);
}
export function cloneElement(element, props) {
  return replaceElement(element, element, props);
}