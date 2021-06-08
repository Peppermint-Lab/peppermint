import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";

/**
 * To match accessibility requirement, we always provide an input in the component.
 * Other element will not set `tabIndex` to avoid `onBlur` sequence problem.
 * For focused select, we set `aria-live="polite"` to update the accessibility content.
 *
 * ref:
 * - keyboard: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role#Keyboard_interactions
 *
 * New api:
 * - listHeight
 * - listItemHeight
 * - component
 *
 * Remove deprecated api:
 * - multiple
 * - tags
 * - combobox
 * - firstActiveValue
 * - dropdownMenuStyle
 * - openClassName (Not list in api)
 *
 * Update:
 * - `backfill` only support `combobox` mode
 * - `combobox` mode not support `labelInValue` since it's meaningless
 * - `getInputElement` only support `combobox` mode
 * - `onChange` return OptionData instead of ReactNode
 * - `filterOption` `onChange` `onSelect` accept OptionData instead of ReactNode
 * - `combobox` mode trigger `onChange` will get `undefined` if no `value` match in Option
 * - `combobox` mode not support `optionLabelProp`
 */
import * as React from 'react';
import SelectOptionList from './OptionList';
import Option from './Option';
import OptGroup from './OptGroup';
import { convertChildrenToData as convertSelectChildrenToData } from './utils/legacyUtil';
import { getLabeledValue as getSelectLabeledValue, filterOptions as selectDefaultFilterOptions, isValueDisabled as isSelectValueDisabled, findValueOption as findSelectValueOption, flattenOptions, fillOptionsWithMissingValue } from './utils/valueUtil';
import generateSelector from './generate';
import warningProps from './utils/warningPropsUtil';
var RefSelect = generateSelector({
  prefixCls: 'rc-select',
  components: {
    optionList: SelectOptionList
  },
  convertChildrenToData: convertSelectChildrenToData,
  flattenOptions: flattenOptions,
  getLabeledValue: getSelectLabeledValue,
  filterOptions: selectDefaultFilterOptions,
  isValueDisabled: isSelectValueDisabled,
  findValueOption: findSelectValueOption,
  warningProps: warningProps,
  fillOptionsWithMissingValue: fillOptionsWithMissingValue
});
/**
 * Typescript not support generic with function component,
 * we have to wrap an class component to handle this.
 */

var Select = /*#__PURE__*/function (_React$Component) {
  _inherits(Select, _React$Component);

  var _super = _createSuper(Select);

  function Select() {
    var _this;

    _classCallCheck(this, Select);

    _this = _super.apply(this, arguments);
    _this.selectRef = /*#__PURE__*/React.createRef();

    _this.focus = function () {
      _this.selectRef.current.focus();
    };

    _this.blur = function () {
      _this.selectRef.current.blur();
    };

    return _this;
  }

  _createClass(Select, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(RefSelect, _extends({
        ref: this.selectRef
      }, this.props));
    }
  }]);

  return Select;
}(React.Component);

Select.Option = Option;
Select.OptGroup = OptGroup;
export default Select;