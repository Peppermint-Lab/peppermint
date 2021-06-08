# rc-select

---

React Select

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![build status][github-actions-image]][github-actions-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies][david-image]](david-url)
[![DevDependencies][david-dev-image]][david-dev-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: http://img.shields.io/npm/v/rc-select.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-select
[travis-image]: https://img.shields.io/travis/react-component/select/master?style=flat-square
[travis-url]: https://travis-ci.com/react-component/select
[github-actions-image]: https://github.com/react-component/select/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/select/actions
[coveralls-image]: https://img.shields.io/coveralls/react-component/select.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/select?branch=master
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/select/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/select/branch/master
[david-url]: https://david-dm.org/react-component/select
[david-image]: https://david-dm.org/react-component/select/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/select?type=dev
[david-dev-image]: https://david-dm.org/react-component/select/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/rc-select.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-select
[bundlephobia-url]: https://bundlephobia.com/result?p=rc-select
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/rc-select

## Screenshots

<img src="https://gw.alipayobjects.com/zos/antfincdn/d13eUZlgdJ/tupian.png" />

## Feature

- support IE11+,Chrome,Firefox,Safari

### Keyboard

- Open select (focus input || focus and click)
- KeyDown/KeyUp/Enter to navigate menu

## install

[![rc-select](https://nodei.co/npm/rc-select.png)](https://npmjs.org/package/rc-select)

## Usage

### basic use

```js
import Select, { Option } from 'rc-select';

export default () => (
  <Select>
    <Option value="jack">jack</Option>
    <Option value="lucy">lucy</Option>
    <Option value="yiminghe">yiminghe</Option>
  </Select>
);
```

## API

### Select props

| name | description | type | default |
| --- | --- | --- | --- |
| id | html id to set on the component wrapper | String | '' |
| className | additional css class of root dom node | String | '' |
| data-\* | html data attributes to set on the component wrapper | String | '' |
| prefixCls | prefix class | String | '' |
| animation | dropdown animation name. only support slide-up now | String | '' |
| transitionName | dropdown css animation name | String | '' |
| choiceTransitionName | css animation name for selected items at multiple mode | String | '' |
| dropdownMatchSelectWidth | whether dropdown's with is same with select | bool | true |
| dropdownClassName | additional className applied to dropdown | String | - |
| dropdownStyle | additional style applied to dropdown | Object | {} |
| dropdownAlign | additional align applied to dropdown | Object | {} |
| dropdownMenuStyle | additional style applied to dropdown menu | Object | {} |
| notFoundContent | specify content to show when no result matches. | String | 'Not Found' |
| tokenSeparators | separator used to tokenize on tag/multiple mode | string[]? |  |
| open | control select open | bool |  |
| defaultOpen | control select default open | bool |  |
| placeholder | select placeholder | React Node |  |
| showSearch | whether show search input in single mode | bool | true |
| showArrow | whether show arrow | bool | true (single mode), false (multiple mode) |
| allowClear | whether allowClear | bool | false |
| tags | when tagging is enabled the user can select from pre-existing options or create a new tag by picking the first choice, which is what the user has typed into the search box so far. | bool | false |
| tagRender | render custom tags. | (props: CustomTagProps) => ReactNode | - |
| maxTagTextLength | max tag text length to show | number | - |
| maxTagCount | max tag count to show | number | - |
| maxTagPlaceholder | placeholder for omitted values | ReactNode/function(omittedValues) | - |
| combobox | enable combobox mode(can not set multiple at the same time) | bool | false |
| multiple | whether multiple select | bool | false |
| disabled | whether disabled select | bool | false |
| filterOption | whether filter options by input value. default filter by option's optionFilterProp prop's value | bool | true/Function(inputValue:string, option:Option) |
| optionFilterProp | which prop value of option will be used for filter if filterOption is true | String | 'value' |
| filterSort | Sort function for search options sorting, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. | Function(optionA:Option, optionB: Option) | - |
| optionLabelProp | render option value or option children as content of select | String: 'value'/'children' | 'value' |
| defaultValue | initial selected option(s) | String/Array<String> | - |
| value | current selected option(s) | String/Array<String>/{key:String, label:React.Node}/Array<{key, label}> | - |
| labelInValue | whether to embed label in value, see above value type. Not support `combobox` mode | Bool | false |
| backfill | whether backfill select option to search input (Only works in single and combobox mode) | Bool | false |
| onChange | called when select an option or input value change(combobox) | function(value, option:Option/Array<Option>) | - |
| onSearch | called when input changed | function | - |
| onBlur | called when blur | function | - |
| onFocus | called when focus | function | - |
| onPopupScroll | called when menu is scrolled | function | - |
| onSelect | called when a option is selected. param is option's value and option instance | Function(value, option:Option) | - |
| onDeselect | called when a option is deselected. param is option's value. only called for multiple or tags | Function(value, option:Option) | - |
| onInputKeyDown | called when key down on input | Function(event) | - |
| defaultActiveFirstOption | whether active first option by default | bool | true |
| getPopupContainer | container which popup select menu rendered into | function(trigger:Node):Node | function(){return document.body;} |
| getInputElement | customize input element | function(): Element | - |
| showAction | actions trigger the dropdown to show | String[]? | - |
| autoFocus | focus select after mount | Bool | - |
| autoClearSearchValue | auto clear search input value when multiple select is selected/deselected | boolean | true |
| inputIcon | specify the select arrow icon | ReactNode | - |
| clearIcon | specify the clear icon | ReactNode | - |
| removeIcon | specify the remove icon | ReactNode | - |
| menuItemSelectedIcon | specify the remove icon | ReactNode \| (props: MenuItemProps) => ReactNode | - |
| dropdownRender | render custom dropdown menu | (menu: React.Node, props: MenuProps) => ReactNode | - |
| loading | show loading icon in arrow | Boolean | false |
| virtual | Disable virtual scroll | Boolean | true |
| direction | direction of dropdown | 'ltr' \| 'rtl' | 'ltr' |

### Methods

| name  | description               | parameters | return |
| ----- | ------------------------- | ---------- | ------ |
| focus | focus select programmably | -          | -      |
| blur  | blur select programmably  | -          | -      |

### Option props

| name | description | type | default |
| --- | --- | --- | --- |
| className | additional class to option | String | '' |
| disabled | no effect for click or keydown for this item | bool | false |
| key | if react want you to set key, then key is same as value, you can omit value | String/number | - |
| value | default filter by this attribute. if react want you to set key, then key is same as value, you can omit value | String/number | - |
| title | if you are not satisfied with auto-generated `title` which is show while hovering on selected value, you can customize it with this property | String | - |

### OptGroup props

| name | description | type | default |
| --- | --- | --- | --- |
| label | group label | String/React.Element | - |
| key | - | String | - |
| value | default filter by this attribute. if react want you to set key, then key is same as value, you can omit value | String | - |

## Development

```
npm install
npm start
```

## Example

local example: http://localhost:9001/

online example: http://select.react-component.now.sh/

## Test Case

```
npm test
```

## Coverage

```
npm run coverage
```

## License

rc-select is released under the MIT license.
