import * as React from 'react';
import PanelContext from '../PanelContext';
var HIDDEN_STYLE = {
  visibility: 'hidden'
};

function Header(_ref) {
  var prefixCls = _ref.prefixCls,
      _ref$prevIcon = _ref.prevIcon,
      prevIcon = _ref$prevIcon === void 0 ? "\u2039" : _ref$prevIcon,
      _ref$nextIcon = _ref.nextIcon,
      nextIcon = _ref$nextIcon === void 0 ? "\u203A" : _ref$nextIcon,
      _ref$superPrevIcon = _ref.superPrevIcon,
      superPrevIcon = _ref$superPrevIcon === void 0 ? "\xAB" : _ref$superPrevIcon,
      _ref$superNextIcon = _ref.superNextIcon,
      superNextIcon = _ref$superNextIcon === void 0 ? "\xBB" : _ref$superNextIcon,
      onSuperPrev = _ref.onSuperPrev,
      onSuperNext = _ref.onSuperNext,
      onPrev = _ref.onPrev,
      onNext = _ref.onNext,
      children = _ref.children;

  var _React$useContext = React.useContext(PanelContext),
      hideNextBtn = _React$useContext.hideNextBtn,
      hidePrevBtn = _React$useContext.hidePrevBtn;

  return /*#__PURE__*/React.createElement("div", {
    className: prefixCls
  }, onSuperPrev && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSuperPrev,
    tabIndex: -1,
    className: "".concat(prefixCls, "-super-prev-btn"),
    style: hidePrevBtn ? HIDDEN_STYLE : {}
  }, superPrevIcon), onPrev && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onPrev,
    tabIndex: -1,
    className: "".concat(prefixCls, "-prev-btn"),
    style: hidePrevBtn ? HIDDEN_STYLE : {}
  }, prevIcon), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-view")
  }, children), onNext && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onNext,
    tabIndex: -1,
    className: "".concat(prefixCls, "-next-btn"),
    style: hideNextBtn ? HIDDEN_STYLE : {}
  }, nextIcon), onSuperNext && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSuperNext,
    tabIndex: -1,
    className: "".concat(prefixCls, "-super-next-btn"),
    style: hideNextBtn ? HIDDEN_STYLE : {}
  }, superNextIcon));
}

export default Header;