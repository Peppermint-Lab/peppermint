import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import FilterFilled from "@ant-design/icons/es/icons/FilterFilled";
import Button from '../../../button';
import Menu from '../../../menu';
import Checkbox from '../../../checkbox';
import Radio from '../../../radio';
import Dropdown from '../../../dropdown';
import Empty from '../../../empty';
import FilterDropdownMenuWrapper from './FilterWrapper';
import useSyncState from '../../../_util/hooks/useSyncState';
import { ConfigContext } from '../../../config-provider/context';
var SubMenu = Menu.SubMenu,
    MenuItem = Menu.Item;

function hasSubMenu(filters) {
  return filters.some(function (_ref) {
    var children = _ref.children;
    return children;
  });
}

function renderFilterItems(_ref2) {
  var filters = _ref2.filters,
      prefixCls = _ref2.prefixCls,
      filteredKeys = _ref2.filteredKeys,
      filterMultiple = _ref2.filterMultiple,
      locale = _ref2.locale;

  if (filters.length === 0) {
    // wrapped with <div /> to avoid react warning
    // https://github.com/ant-design/ant-design/issues/25979
    return /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '16px 0'
      }
    }, /*#__PURE__*/React.createElement(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE,
      description: locale.filterEmptyText,
      imageStyle: {
        height: 24
      }
    }));
  }

  return filters.map(function (filter, index) {
    var key = String(filter.value);

    if (filter.children) {
      return /*#__PURE__*/React.createElement(SubMenu, {
        key: key || index,
        title: filter.text,
        popupClassName: "".concat(prefixCls, "-dropdown-submenu")
      }, renderFilterItems({
        filters: filter.children,
        prefixCls: prefixCls,
        filteredKeys: filteredKeys,
        filterMultiple: filterMultiple,
        locale: locale
      }));
    }

    var Component = filterMultiple ? Checkbox : Radio;
    return /*#__PURE__*/React.createElement(MenuItem, {
      key: filter.value !== undefined ? key : index
    }, /*#__PURE__*/React.createElement(Component, {
      checked: filteredKeys.includes(key)
    }), /*#__PURE__*/React.createElement("span", null, filter.text));
  });
}

function FilterDropdown(props) {
  var _a;

  var prefixCls = props.prefixCls,
      column = props.column,
      dropdownPrefixCls = props.dropdownPrefixCls,
      columnKey = props.columnKey,
      filterMultiple = props.filterMultiple,
      filterState = props.filterState,
      triggerFilter = props.triggerFilter,
      locale = props.locale,
      children = props.children,
      getPopupContainer = props.getPopupContainer;
  var filterDropdownVisible = column.filterDropdownVisible,
      onFilterDropdownVisibleChange = column.onFilterDropdownVisibleChange;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var filtered = !!(filterState && (((_a = filterState.filteredKeys) === null || _a === void 0 ? void 0 : _a.length) || filterState.forceFiltered));

  var triggerVisible = function triggerVisible(newVisible) {
    setVisible(newVisible);
    onFilterDropdownVisibleChange === null || onFilterDropdownVisibleChange === void 0 ? void 0 : onFilterDropdownVisibleChange(newVisible);
  };

  var mergedVisible = typeof filterDropdownVisible === 'boolean' ? filterDropdownVisible : visible; // ===================== Select Keys =====================

  var propFilteredKeys = filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys;

  var _useSyncState = useSyncState(propFilteredKeys || []),
      _useSyncState2 = _slicedToArray(_useSyncState, 2),
      getFilteredKeysSync = _useSyncState2[0],
      setFilteredKeysSync = _useSyncState2[1];

  var onSelectKeys = function onSelectKeys(_ref3) {
    var selectedKeys = _ref3.selectedKeys;
    setFilteredKeysSync(selectedKeys);
  };

  React.useEffect(function () {
    onSelectKeys({
      selectedKeys: propFilteredKeys || []
    });
  }, [propFilteredKeys]); // ====================== Open Keys ======================

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      openKeys = _React$useState4[0],
      setOpenKeys = _React$useState4[1];

  var openRef = React.useRef();

  var onOpenChange = function onOpenChange(keys) {
    openRef.current = window.setTimeout(function () {
      setOpenKeys(keys);
    });
  };

  var onMenuClick = function onMenuClick() {
    window.clearTimeout(openRef.current);
  };

  React.useEffect(function () {
    return function () {
      window.clearTimeout(openRef.current);
    };
  }, []); // ======================= Submit ========================

  var internalTriggerFilter = function internalTriggerFilter(keys) {
    var mergedKeys = keys && keys.length ? keys : null;

    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }

    if (isEqual(mergedKeys, filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys)) {
      return null;
    }

    triggerFilter({
      column: column,
      key: columnKey,
      filteredKeys: mergedKeys
    });
  };

  var onConfirm = function onConfirm() {
    triggerVisible(false);
    internalTriggerFilter(getFilteredKeysSync());
  };

  var onReset = function onReset() {
    setFilteredKeysSync([]);
    triggerVisible(false);
    internalTriggerFilter([]);
  };

  var doFilter = function doFilter() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      closeDropdown: true
    };
    triggerVisible(!param.closeDropdown);
    internalTriggerFilter(getFilteredKeysSync());
  };

  var onVisibleChange = function onVisibleChange(newVisible) {
    if (newVisible && propFilteredKeys !== undefined) {
      // Sync filteredKeys on appear in controlled mode (propFilteredKeys !== undefiend)
      setFilteredKeysSync(propFilteredKeys || []);
    }

    triggerVisible(newVisible); // Default will filter when closed

    if (!newVisible && !column.filterDropdown) {
      onConfirm();
    }
  }; // ======================== Style ========================


  var dropdownMenuClass = classNames(_defineProperty({}, "".concat(dropdownPrefixCls, "-menu-without-submenu"), !hasSubMenu(column.filters || [])));
  var dropdownContent;

  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: "".concat(dropdownPrefixCls, "-custom"),
      setSelectedKeys: function setSelectedKeys(selectedKeys) {
        return onSelectKeys({
          selectedKeys: selectedKeys
        });
      },
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    var selectedKeys = getFilteredKeysSync() || [];
    dropdownContent = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Menu, {
      multiple: filterMultiple,
      prefixCls: "".concat(dropdownPrefixCls, "-menu"),
      className: dropdownMenuClass,
      onClick: onMenuClick,
      onSelect: onSelectKeys,
      onDeselect: onSelectKeys,
      selectedKeys: selectedKeys,
      getPopupContainer: getPopupContainer,
      openKeys: openKeys,
      onOpenChange: onOpenChange
    }, renderFilterItems({
      filters: column.filters || [],
      prefixCls: prefixCls,
      filteredKeys: getFilteredKeysSync(),
      filterMultiple: filterMultiple,
      locale: locale
    })), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-dropdown-btns")
    }, /*#__PURE__*/React.createElement(Button, {
      type: "link",
      size: "small",
      disabled: selectedKeys.length === 0,
      onClick: onReset
    }, locale.filterReset), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      size: "small",
      onClick: onConfirm
    }, locale.filterConfirm)));
  }

  var menu = /*#__PURE__*/React.createElement(FilterDropdownMenuWrapper, {
    className: "".concat(prefixCls, "-dropdown")
  }, dropdownContent);
  var filterIcon;

  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(filtered);
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon;
  } else {
    filterIcon = /*#__PURE__*/React.createElement(FilterFilled, null);
  }

  var _React$useContext = React.useContext(ConfigContext),
      direction = _React$useContext.direction;

  return /*#__PURE__*/React.createElement("div", {
    className: classNames("".concat(prefixCls, "-column"))
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-column-title")
  }, children), /*#__PURE__*/React.createElement("span", {
    className: classNames("".concat(prefixCls, "-trigger-container"), _defineProperty({}, "".concat(prefixCls, "-trigger-container-open"), mergedVisible)),
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement(Dropdown, {
    overlay: menu,
    trigger: ['click'],
    visible: mergedVisible,
    onVisibleChange: onVisibleChange,
    getPopupContainer: getPopupContainer,
    placement: direction === 'rtl' ? 'bottomLeft' : 'bottomRight'
  }, /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: -1,
    className: classNames("".concat(prefixCls, "-trigger"), {
      active: filtered
    })
  }, filterIcon))));
}

export default FilterDropdown;