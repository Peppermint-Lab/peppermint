"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRanges;

var React = _interopRequireWildcard(require("react"));

function getRanges(_ref) {
  var prefixCls = _ref.prefixCls,
      _ref$rangeList = _ref.rangeList,
      rangeList = _ref$rangeList === void 0 ? [] : _ref$rangeList,
      _ref$components = _ref.components,
      components = _ref$components === void 0 ? {} : _ref$components,
      needConfirmButton = _ref.needConfirmButton,
      onNow = _ref.onNow,
      onOk = _ref.onOk,
      okDisabled = _ref.okDisabled,
      showNow = _ref.showNow,
      locale = _ref.locale;
  var presetNode;
  var okNode;

  if (rangeList.length) {
    var Item = components.rangeItem || 'span';
    presetNode = /*#__PURE__*/React.createElement(React.Fragment, null, rangeList.map(function (_ref2) {
      var label = _ref2.label,
          onClick = _ref2.onClick,
          onMouseEnter = _ref2.onMouseEnter,
          onMouseLeave = _ref2.onMouseLeave;
      return /*#__PURE__*/React.createElement("li", {
        key: label,
        className: "".concat(prefixCls, "-preset")
      }, /*#__PURE__*/React.createElement(Item, {
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      }, label));
    }));
  }

  if (needConfirmButton) {
    var Button = components.button || 'button';

    if (onNow && !presetNode && showNow !== false) {
      presetNode = /*#__PURE__*/React.createElement("li", {
        className: "".concat(prefixCls, "-now")
      }, /*#__PURE__*/React.createElement("a", {
        className: "".concat(prefixCls, "-now-btn"),
        onClick: onNow
      }, locale.now));
    }

    okNode = needConfirmButton && /*#__PURE__*/React.createElement("li", {
      className: "".concat(prefixCls, "-ok")
    }, /*#__PURE__*/React.createElement(Button, {
      disabled: okDisabled,
      onClick: onOk
    }, locale.ok));
  }

  if (!presetNode && !okNode) {
    return null;
  }

  return /*#__PURE__*/React.createElement("ul", {
    className: "".concat(prefixCls, "-ranges")
  }, presetNode, okNode);
}