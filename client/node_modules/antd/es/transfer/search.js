import * as React from 'react';
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import Input from '../input';
export default function Search(props) {
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

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
    placeholder: placeholder,
    className: prefixCls,
    value: value,
    onChange: handleChange,
    disabled: disabled
  }), value && value.length > 0 ? /*#__PURE__*/React.createElement("a", {
    className: "".concat(prefixCls, "-action"),
    onClick: handleClearFn
  }, /*#__PURE__*/React.createElement(CloseCircleFilled, null)) : /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-action")
  }, /*#__PURE__*/React.createElement(SearchOutlined, null)));
}