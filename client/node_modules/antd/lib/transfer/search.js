"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Search;

var React = _interopRequireWildcard(require("react"));

var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));

var _SearchOutlined = _interopRequireDefault(require("@ant-design/icons/SearchOutlined"));

var _input = _interopRequireDefault(require("../input"));

function Search(props) {
  var _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '' : _props$placeholder,
      value = props.value,
      prefixCls = props.prefixCls,
      disabled = props.disabled,
      onChange = props.onChange,
      handleClear = props.handleClear;
  var handleChange = React.useCallback(function (e) {
    onChange === null || onChange === void 0 ? void 0 : onChange(e);
  }, [onChange]);

  var handleClearFn = function handleClearFn(e) {
    e.preventDefault();

    if (!disabled && handleClear) {
      handleClear(e);
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_input["default"], {
    placeholder: placeholder,
    className: prefixCls,
    value: value,
    onChange: handleChange,
    disabled: disabled
  }), value && value.length > 0 ? /*#__PURE__*/React.createElement("a", {
    className: "".concat(prefixCls, "-action"),
    onClick: handleClearFn
  }, /*#__PURE__*/React.createElement(_CloseCircleFilled["default"], null)) : /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-action")
  }, /*#__PURE__*/React.createElement(_SearchOutlined["default"], null)));
}