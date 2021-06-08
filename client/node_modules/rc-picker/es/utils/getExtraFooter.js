import * as React from 'react';
export default function getExtraFooter(prefixCls, mode, renderExtraFooter) {
  if (!renderExtraFooter) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-footer-extra")
  }, renderExtraFooter(mode));
}