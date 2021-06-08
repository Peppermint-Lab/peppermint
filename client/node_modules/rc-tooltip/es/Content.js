import * as React from 'react';

var Content = function Content(props) {
  var overlay = props.overlay,
      prefixCls = props.prefixCls,
      id = props.id,
      overlayInnerStyle = props.overlayInnerStyle;
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-inner"),
    id: id,
    role: "tooltip",
    style: overlayInnerStyle
  }, typeof overlay === 'function' ? overlay() : overlay);
};

export default Content;