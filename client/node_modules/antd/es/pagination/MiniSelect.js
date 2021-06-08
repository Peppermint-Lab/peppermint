import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Select from '../select';

var MiniSelect = function MiniSelect(props) {
  return /*#__PURE__*/React.createElement(Select, _extends({
    size: "small"
  }, props));
};

MiniSelect.Option = Select.Option;
export default MiniSelect;