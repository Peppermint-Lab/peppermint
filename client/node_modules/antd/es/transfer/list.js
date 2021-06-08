import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import * as React from 'react';
import omit from "rc-util/es/omit";
import classNames from 'classnames';
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import Checkbox from '../checkbox';
import Menu from '../menu';
import Dropdown from '../dropdown';
import Search from './search';
import DefaultListBody, { OmitProps } from './ListBody';
import { isValidElement } from '../_util/reactNode';

var defaultRender = function defaultRender() {
  return null;
};

function isRenderResultPlainObject(result) {
  return result && !isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]';
}

function getEnabledItemKeys(items) {
  return items.filter(function (data) {
    return !data.disabled;
  }).map(function (data) {
    return data.key;
  });
}

var TransferList = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TransferList, _React$PureComponent);

  var _super = _createSuper(TransferList);

  function TransferList(props) {
    var _this;

    _classCallCheck(this, TransferList);

    _this = _super.call(this, props);
    _this.defaultListBodyRef = /*#__PURE__*/React.createRef(); // =============================== Filter ===============================

    _this.handleFilter = function (e) {
      var handleFilter = _this.props.handleFilter;
      var filterValue = e.target.value;

      _this.setState({
        filterValue: filterValue
      });

      handleFilter(e);
    };

    _this.handleClear = function () {
      var handleClear = _this.props.handleClear;

      _this.setState({
        filterValue: ''
      });

      handleClear();
    };

    _this.matchFilter = function (text, item) {
      var filterValue = _this.state.filterValue;
      var filterOption = _this.props.filterOption;

      if (filterOption) {
        return filterOption(filterValue, item);
      }

      return text.indexOf(filterValue) >= 0;
    };

    _this.getCurrentPageItems = function () {}; // =============================== Render ===============================


    _this.renderListBody = function (renderList, props) {
      var bodyContent = renderList ? renderList(props) : null;
      var customize = !!bodyContent;

      if (!customize) {
        bodyContent = /*#__PURE__*/React.createElement(DefaultListBody, _extends({
          ref: _this.defaultListBodyRef
        }, props));
      }

      return {
        customize: customize,
        bodyContent: bodyContent
      };
    };

    _this.renderItem = function (item) {
      var _this$props$render = _this.props.render,
          render = _this$props$render === void 0 ? defaultRender : _this$props$render;
      var renderResult = render(item);
      var isRenderResultPlain = isRenderResultPlainObject(renderResult);
      return {
        renderedText: isRenderResultPlain ? renderResult.value : renderResult,
        renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
        item: item
      };
    };

    _this.getSelectAllLabel = function (selectedCount, totalCount) {
      var _this$props = _this.props,
          itemsUnit = _this$props.itemsUnit,
          itemUnit = _this$props.itemUnit,
          selectAllLabel = _this$props.selectAllLabel;

      if (selectAllLabel) {
        return typeof selectAllLabel === 'function' ? selectAllLabel({
          selectedCount: selectedCount,
          totalCount: totalCount
        }) : selectAllLabel;
      }

      var unit = totalCount > 1 ? itemsUnit : itemUnit;
      return /*#__PURE__*/React.createElement(React.Fragment, null, (selectedCount > 0 ? "".concat(selectedCount, "/") : '') + totalCount, " ", unit);
    };

    _this.state = {
      filterValue: ''
    };
    return _this;
  }

  _createClass(TransferList, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.triggerScrollTimer);
    }
  }, {
    key: "getCheckStatus",
    value: function getCheckStatus(filteredItems) {
      var checkedKeys = this.props.checkedKeys;

      if (checkedKeys.length === 0) {
        return 'none';
      }

      if (filteredItems.every(function (item) {
        return checkedKeys.indexOf(item.key) >= 0 || !!item.disabled;
      })) {
        return 'all';
      }

      return 'part';
    } // ================================ Item ================================

  }, {
    key: "getFilteredItems",
    value: function getFilteredItems(dataSource, filterValue) {
      var _this2 = this;

      var filteredItems = [];
      var filteredRenderItems = [];
      dataSource.forEach(function (item) {
        var renderedItem = _this2.renderItem(item);

        var renderedText = renderedItem.renderedText; // Filter skip

        if (filterValue && !_this2.matchFilter(renderedText, item)) {
          return null;
        }

        filteredItems.push(item);
        filteredRenderItems.push(renderedItem);
      });
      return {
        filteredItems: filteredItems,
        filteredRenderItems: filteredRenderItems
      };
    }
  }, {
    key: "getListBody",
    value: function getListBody(prefixCls, searchPlaceholder, filterValue, filteredItems, notFoundContent, filteredRenderItems, checkedKeys, renderList, showSearch, disabled) {
      var search = showSearch ? /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-body-search-wrapper")
      }, /*#__PURE__*/React.createElement(Search, {
        prefixCls: "".concat(prefixCls, "-search"),
        onChange: this.handleFilter,
        handleClear: this.handleClear,
        placeholder: searchPlaceholder,
        value: filterValue,
        disabled: disabled
      })) : null;

      var _this$renderListBody = this.renderListBody(renderList, _extends(_extends({}, omit(this.props, OmitProps)), {
        filteredItems: filteredItems,
        filteredRenderItems: filteredRenderItems,
        selectedKeys: checkedKeys
      })),
          bodyContent = _this$renderListBody.bodyContent,
          customize = _this$renderListBody.customize;

      var bodyNode; // We should wrap customize list body in a classNamed div to use flex layout.

      if (customize) {
        bodyNode = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-body-customize-wrapper")
        }, bodyContent);
      } else {
        bodyNode = filteredItems.length ? bodyContent : /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-body-not-found")
        }, notFoundContent);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: classNames(showSearch ? "".concat(prefixCls, "-body ").concat(prefixCls, "-body-with-search") : "".concat(prefixCls, "-body"))
      }, search, bodyNode);
    }
  }, {
    key: "getCheckBox",
    value: function getCheckBox(filteredItems, onItemSelectAll, showSelectAll, disabled, prefixCls) {
      var checkStatus = this.getCheckStatus(filteredItems);
      var checkedAll = checkStatus === 'all';
      var checkAllCheckbox = showSelectAll !== false && /*#__PURE__*/React.createElement(Checkbox, {
        disabled: disabled,
        checked: checkedAll,
        indeterminate: checkStatus === 'part',
        className: "".concat(prefixCls, "-checkbox"),
        onChange: function onChange() {
          // Only select enabled items
          onItemSelectAll(filteredItems.filter(function (item) {
            return !item.disabled;
          }).map(function (_ref) {
            var key = _ref.key;
            return key;
          }), !checkedAll);
        }
      });
      return checkAllCheckbox;
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _this3 = this;

      var filterValue = this.state.filterValue;
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          dataSource = _this$props2.dataSource,
          titleText = _this$props2.titleText,
          checkedKeys = _this$props2.checkedKeys,
          disabled = _this$props2.disabled,
          footer = _this$props2.footer,
          showSearch = _this$props2.showSearch,
          style = _this$props2.style,
          searchPlaceholder = _this$props2.searchPlaceholder,
          notFoundContent = _this$props2.notFoundContent,
          selectAll = _this$props2.selectAll,
          selectCurrent = _this$props2.selectCurrent,
          selectInvert = _this$props2.selectInvert,
          removeAll = _this$props2.removeAll,
          removeCurrent = _this$props2.removeCurrent,
          renderList = _this$props2.renderList,
          onItemSelectAll = _this$props2.onItemSelectAll,
          onItemRemove = _this$props2.onItemRemove,
          showSelectAll = _this$props2.showSelectAll,
          showRemove = _this$props2.showRemove,
          pagination = _this$props2.pagination; // Custom Layout

      var footerDom = footer && footer(this.props);
      var listCls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-with-pagination"), !!pagination), _defineProperty(_classNames, "".concat(prefixCls, "-with-footer"), !!footerDom), _classNames)); // ====================== Get filtered, checked item list ======================

      var _this$getFilteredItem = this.getFilteredItems(dataSource, filterValue),
          filteredItems = _this$getFilteredItem.filteredItems,
          filteredRenderItems = _this$getFilteredItem.filteredRenderItems; // ================================= List Body =================================


      var listBody = this.getListBody(prefixCls, searchPlaceholder, filterValue, filteredItems, notFoundContent, filteredRenderItems, checkedKeys, renderList, showSearch, disabled); // ================================ List Footer ================================

      var listFooter = footerDom ? /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-footer")
      }, footerDom) : null;
      var checkAllCheckbox = !showRemove && !pagination && this.getCheckBox(filteredItems, onItemSelectAll, showSelectAll, disabled, prefixCls);
      var menu = null;

      if (showRemove) {
        menu = /*#__PURE__*/React.createElement(Menu, null, pagination && /*#__PURE__*/React.createElement(Menu.Item, {
          onClick: function onClick() {
            var _a;

            var pageKeys = getEnabledItemKeys((((_a = _this3.defaultListBodyRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || []).map(function (entity) {
              return entity.item;
            }));
            onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(pageKeys);
          }
        }, removeCurrent), /*#__PURE__*/React.createElement(Menu.Item, {
          onClick: function onClick() {
            onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(getEnabledItemKeys(filteredItems));
          }
        }, removeAll));
      } else {
        menu = /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(Menu.Item, {
          onClick: function onClick() {
            var keys = getEnabledItemKeys(filteredItems);
            onItemSelectAll(keys, keys.length !== checkedKeys.length);
          }
        }, selectAll), pagination && /*#__PURE__*/React.createElement(Menu.Item, {
          onClick: function onClick() {
            var _a;

            var pageItems = ((_a = _this3.defaultListBodyRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || [];
            onItemSelectAll(getEnabledItemKeys(pageItems.map(function (entity) {
              return entity.item;
            })), true);
          }
        }, selectCurrent), /*#__PURE__*/React.createElement(Menu.Item, {
          onClick: function onClick() {
            var _a;

            var availableKeys;

            if (pagination) {
              availableKeys = getEnabledItemKeys((((_a = _this3.defaultListBodyRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || []).map(function (entity) {
                return entity.item;
              }));
            } else {
              availableKeys = getEnabledItemKeys(filteredItems);
            }

            var checkedKeySet = new Set(checkedKeys);
            var newCheckedKeys = [];
            var newUnCheckedKeys = [];
            availableKeys.forEach(function (key) {
              if (checkedKeySet.has(key)) {
                newUnCheckedKeys.push(key);
              } else {
                newCheckedKeys.push(key);
              }
            });
            onItemSelectAll(newCheckedKeys, true);
            onItemSelectAll(newUnCheckedKeys, false);
          }
        }, selectInvert));
      }

      var dropdown = /*#__PURE__*/React.createElement(Dropdown, {
        className: "".concat(prefixCls, "-header-dropdown"),
        overlay: menu,
        disabled: disabled
      }, /*#__PURE__*/React.createElement(DownOutlined, null)); // ================================== Render ===================================

      return /*#__PURE__*/React.createElement("div", {
        className: listCls,
        style: style
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-header")
      }, checkAllCheckbox, dropdown, /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-header-selected")
      }, this.getSelectAllLabel(checkedKeys.length, filteredItems.length)), /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-header-title")
      }, titleText)), listBody, listFooter);
    }
  }]);

  return TransferList;
}(React.PureComponent);

export { TransferList as default };
TransferList.defaultProps = {
  dataSource: [],
  titleText: '',
  showSearch: false
};