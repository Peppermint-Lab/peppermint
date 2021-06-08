"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _FilterFilled = _interopRequireDefault(require("@ant-design/icons/FilterFilled"));

var _button = _interopRequireDefault(require("../../../button"));

var _menu = _interopRequireDefault(require("../../../menu"));

var _checkbox = _interopRequireDefault(require("../../../checkbox"));

var _radio = _interopRequireDefault(require("../../../radio"));

var _dropdown = _interopRequireDefault(require("../../../dropdown"));

var _empty = _interopRequireDefault(require("../../../empty"));

var _FilterWrapper = _interopRequireDefault(require("./FilterWrapper"));

var _useSyncState3 = _interopRequireDefault(require("../../../_util/hooks/useSyncState"));

var _context = require("../../../config-provider/context");

var SubMenu = _menu["default"].SubMenu,
    MenuItem = _menu["default"].Item;

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
    }, /*#__PURE__*/React.createElement(_empty["default"], {
      image: _empty["default"].PRESENTED_IMAGE_SIMPLE,
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

    var Component = filterMultiple ? _checkbox["default"] : _radio["default"];
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
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var filtered = !!(filterState && (((_a = filterState.filteredKeys) === null || _a === void 0 ? void 0 : _a.length) || filterState.forceFiltered));

  var triggerVisible = function triggerVisible(newVisible) {
    setVisible(newVisible);
    onFilterDropdownVisibleChange === null || onFilterDropdownVisibleChange === void 0 ? void 0 : onFilterDropdownVisibleChange(newVisible);
  };

  var mergedVisible = typeof filterDropdownVisible === 'boolean' ? filterDropdownVisible : visible; // ===================== Select Keys =====================

  var propFilteredKeys = filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys;

  var _useSyncState = (0, _useSyncState3["default"])(propFilteredKeys || []),
      _useSyncState2 = (0, _slicedToArray2["default"])(_useSyncState, 2),
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
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
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

    if ((0, _isEqual["default"])(mergedKeys, filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys)) {
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


  var dropdownMenuClass = (0, _classnames["default"])((0, _defineProperty2["default"])({}, "".concat(dropdownPrefixCls, "-menu-without-submenu"), !hasSubMenu(column.filters || [])));
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
    dropdownContent = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_menu["default"], {
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
    }, /*#__PURE__*/React.createElement(_button["default"], {
      type: "link",
      size: "small",
      disabled: selectedKeys.length === 0,
      onClick: onReset
    }, locale.filterReset), /*#__PURE__*/React.createElement(_button["default"], {
      type: "primary",
      size: "small",
      onClick: onConfirm
    }, locale.filterConfirm)));
  }

  var menu = /*#__PURE__*/React.createElement(_FilterWrapper["default"], {
    className: "".concat(prefixCls, "-dropdown")
  }, dropdownContent);
  var filterIcon;

  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(filtered);
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon;
  } else {
    filterIcon = /*#__PURE__*/React.createElement(_FilterFilled["default"], null);
  }

  var _React$useContext = React.useContext(_context.ConfigContext),
      direction = _React$useContext.direction;

  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames["default"])("".concat(prefixCls, "-column"))
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-column-title")
  }, children), /*#__PURE__*/React.createElement("span", {
    className: (0, _classnames["default"])("".concat(prefixCls, "-trigger-container"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-trigger-container-open"), mergedVisible)),
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement(_dropdown["default"], {
    overlay: menu,
    trigger: ['click'],
    visible: mergedVisible,
    onVisibleChange: onVisibleChange,
    getPopupContainer: getPopupContainer,
    placement: direction === 'rtl' ? 'bottomLeft' : 'bottomRight'
  }, /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: -1,
    className: (0, _classnames["default"])("".concat(prefixCls, "-trigger"), {
      active: filtered
    })
  }, filterIcon))));
}

var _default = FilterDropdown;
exports["default"] = _default;