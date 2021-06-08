import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import classNames from 'classnames';
import KeyCode from "rc-util/es/KeyCode";
import EnterOutlined from "@ant-design/icons/es/icons/EnterOutlined";
import TextArea from '../input/TextArea';

var Editable = function Editable(_ref) {
  var prefixCls = _ref.prefixCls,
      ariaLabel = _ref['aria-label'],
      className = _ref.className,
      style = _ref.style,
      direction = _ref.direction,
      maxLength = _ref.maxLength,
      _ref$autoSize = _ref.autoSize,
      autoSize = _ref$autoSize === void 0 ? true : _ref$autoSize,
      value = _ref.value,
      onSave = _ref.onSave,
      onCancel = _ref.onCancel,
      onEnd = _ref.onEnd;
  var ref = React.useRef();
  var inComposition = React.useRef(false);
  var lastKeyCode = React.useRef();

  var _React$useState = React.useState(value),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      current = _React$useState2[0],
      setCurrent = _React$useState2[1];

  React.useEffect(function () {
    setCurrent(value);
  }, [value]);
  React.useEffect(function () {
    if (ref.current && ref.current.resizableTextArea) {
      var textArea = ref.current.resizableTextArea.textArea;
      textArea.focus();
      var length = textArea.value.length;
      textArea.setSelectionRange(length, length);
    }
  }, []);

  var onChange = function onChange(_ref2) {
    var target = _ref2.target;
    setCurrent(target.value.replace(/[\n\r]/g, ''));
  };

  var onCompositionStart = function onCompositionStart() {
    inComposition.current = true;
  };

  var onCompositionEnd = function onCompositionEnd() {
    inComposition.current = false;
  };

  var onKeyDown = function onKeyDown(_ref3) {
    var keyCode = _ref3.keyCode;
    // We don't record keyCode when IME is using
    if (inComposition.current) return;
    lastKeyCode.current = keyCode;
  };

  var confirmChange = function confirmChange() {
    onSave(current.trim());
  };

  var onKeyUp = function onKeyUp(_ref4) {
    var keyCode = _ref4.keyCode,
        ctrlKey = _ref4.ctrlKey,
        altKey = _ref4.altKey,
        metaKey = _ref4.metaKey,
        shiftKey = _ref4.shiftKey;

    // Check if it's a real key
    if (lastKeyCode.current === keyCode && !inComposition.current && !ctrlKey && !altKey && !metaKey && !shiftKey) {
      if (keyCode === KeyCode.ENTER) {
        confirmChange();
        onEnd === null || onEnd === void 0 ? void 0 : onEnd();
      } else if (keyCode === KeyCode.ESC) {
        onCancel();
      }
    }
  };

  var onBlur = function onBlur() {
    confirmChange();
  };

  var textAreaClassName = classNames(prefixCls, "".concat(prefixCls, "-edit-content"), _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", {
    className: textAreaClassName,
    style: style
  }, /*#__PURE__*/React.createElement(TextArea, {
    ref: ref,
    maxLength: maxLength,
    value: current,
    onChange: onChange,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onCompositionStart: onCompositionStart,
    onCompositionEnd: onCompositionEnd,
    onBlur: onBlur,
    "aria-label": ariaLabel,
    autoSize: autoSize
  }), /*#__PURE__*/React.createElement(EnterOutlined, {
    className: "".concat(prefixCls, "-edit-content-confirm")
  }));
};

export default Editable;