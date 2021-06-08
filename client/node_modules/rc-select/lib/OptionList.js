"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _pickAttrs = _interopRequireDefault(require("rc-util/lib/pickAttrs"));

var _useMemo = _interopRequireDefault(require("rc-util/lib/hooks/useMemo"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcVirtualList = _interopRequireDefault(require("rc-virtual-list"));

var _TransBtn = _interopRequireDefault(require("./TransBtn"));

/**
 * Using virtual list of option display.
 * Will fallback to dom if use customize render.
 */
var OptionList = function OptionList(_ref, ref) {
  var prefixCls = _ref.prefixCls,
      id = _ref.id,
      flattenOptions = _ref.flattenOptions,
      childrenAsData = _ref.childrenAsData,
      values = _ref.values,
      searchValue = _ref.searchValue,
      multiple = _ref.multiple,
      defaultActiveFirstOption = _ref.defaultActiveFirstOption,
      height = _ref.height,
      itemHeight = _ref.itemHeight,
      notFoundContent = _ref.notFoundContent,
      open = _ref.open,
      menuItemSelectedIcon = _ref.menuItemSelectedIcon,
      virtual = _ref.virtual,
      onSelect = _ref.onSelect,
      onToggleOpen = _ref.onToggleOpen,
      onActiveValue = _ref.onActiveValue,
      onScroll = _ref.onScroll,
      onMouseEnter = _ref.onMouseEnter;
  var itemPrefixCls = "".concat(prefixCls, "-item");
  var memoFlattenOptions = (0, _useMemo.default)(function () {
    return flattenOptions;
  }, [open, flattenOptions], function (prev, next) {
    return next[0] && prev[1] !== next[1];
  }); // =========================== List ===========================

  var listRef = React.useRef(null);

  var onListMouseDown = function onListMouseDown(event) {
    event.preventDefault();
  };

  var scrollIntoView = function scrollIntoView(index) {
    if (listRef.current) {
      listRef.current.scrollTo({
        index: index
      });
    }
  }; // ========================== Active ==========================


  var getEnabledActiveIndex = function getEnabledActiveIndex(index) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var len = memoFlattenOptions.length;

    for (var i = 0; i < len; i += 1) {
      var current = (index + i * offset + len) % len;
      var _memoFlattenOptions$c = memoFlattenOptions[current],
          group = _memoFlattenOptions$c.group,
          data = _memoFlattenOptions$c.data;

      if (!group && !data.disabled) {
        return current;
      }
    }

    return -1;
  };

  var _React$useState = React.useState(function () {
    return getEnabledActiveIndex(0);
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      activeIndex = _React$useState2[0],
      setActiveIndex = _React$useState2[1];

  var setActive = function setActive(index) {
    var fromKeyboard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    setActiveIndex(index);
    var info = {
      source: fromKeyboard ? 'keyboard' : 'mouse'
    }; // Trigger active event

    var flattenItem = memoFlattenOptions[index];

    if (!flattenItem) {
      onActiveValue(null, -1, info);
      return;
    }

    onActiveValue(flattenItem.data.value, index, info);
  }; // Auto active first item when list length or searchValue changed


  React.useEffect(function () {
    setActive(defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
  }, [memoFlattenOptions.length, searchValue]); // Auto scroll to item position in single mode

  React.useEffect(function () {
    /**
     * React will skip `onChange` when component update.
     * `setActive` function will call root accessibility state update which makes re-render.
     * So we need to delay to let Input component trigger onChange first.
     */
    var timeoutId = setTimeout(function () {
      if (!multiple && open && values.size === 1) {
        var value = Array.from(values)[0];
        var index = memoFlattenOptions.findIndex(function (_ref2) {
          var data = _ref2.data;
          return data.value === value;
        });
        setActive(index);
        scrollIntoView(index);
      }
    }); // Force trigger scrollbar visible when open

    if (open) {
      var _listRef$current;

      (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(undefined);
    }

    return function () {
      return clearTimeout(timeoutId);
    };
  }, [open]); // ========================== Values ==========================

  var onSelectValue = function onSelectValue(value) {
    if (value !== undefined) {
      onSelect(value, {
        selected: !values.has(value)
      });
    } // Single mode should always close by select


    if (!multiple) {
      onToggleOpen(false);
    }
  }; // ========================= Keyboard =========================


  React.useImperativeHandle(ref, function () {
    return {
      onKeyDown: function onKeyDown(event) {
        var which = event.which;

        switch (which) {
          // >>> Arrow keys
          case _KeyCode.default.UP:
          case _KeyCode.default.DOWN:
            {
              var offset = 0;

              if (which === _KeyCode.default.UP) {
                offset = -1;
              } else if (which === _KeyCode.default.DOWN) {
                offset = 1;
              }

              if (offset !== 0) {
                var nextActiveIndex = getEnabledActiveIndex(activeIndex + offset, offset);
                scrollIntoView(nextActiveIndex);
                setActive(nextActiveIndex, true);
              }

              break;
            }
          // >>> Select

          case _KeyCode.default.ENTER:
            {
              // value
              var item = memoFlattenOptions[activeIndex];

              if (item && !item.data.disabled) {
                onSelectValue(item.data.value);
              } else {
                onSelectValue(undefined);
              }

              if (open) {
                event.preventDefault();
              }

              break;
            }
          // >>> Close

          case _KeyCode.default.ESC:
            {
              onToggleOpen(false);

              if (open) {
                event.stopPropagation();
              }
            }
        }
      },
      onKeyUp: function onKeyUp() {},
      scrollTo: function scrollTo(index) {
        scrollIntoView(index);
      }
    };
  }); // ========================== Render ==========================

  if (memoFlattenOptions.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      role: "listbox",
      id: "".concat(id, "_list"),
      className: "".concat(itemPrefixCls, "-empty"),
      onMouseDown: onListMouseDown
    }, notFoundContent);
  }

  function renderItem(index) {
    var item = memoFlattenOptions[index];
    if (!item) return null;
    var itemData = item.data || {};
    var value = itemData.value,
        label = itemData.label,
        children = itemData.children;
    var attrs = (0, _pickAttrs.default)(itemData, true);
    var mergedLabel = childrenAsData ? children : label;
    return item ? /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
      "aria-label": typeof mergedLabel === 'string' ? mergedLabel : null
    }, attrs, {
      key: index,
      role: "option",
      id: "".concat(id, "_list_").concat(index),
      "aria-selected": values.has(value)
    }), value) : null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    role: "listbox",
    id: "".concat(id, "_list"),
    style: {
      height: 0,
      width: 0,
      overflow: 'hidden'
    }
  }, renderItem(activeIndex - 1), renderItem(activeIndex), renderItem(activeIndex + 1)), /*#__PURE__*/React.createElement(_rcVirtualList.default, {
    itemKey: "key",
    ref: listRef,
    data: memoFlattenOptions,
    height: height,
    itemHeight: itemHeight,
    fullHeight: false,
    onMouseDown: onListMouseDown,
    onScroll: onScroll,
    virtual: virtual,
    onMouseEnter: onMouseEnter
  }, function (_ref3, itemIndex) {
    var _classNames;

    var group = _ref3.group,
        groupOption = _ref3.groupOption,
        data = _ref3.data;
    var label = data.label,
        key = data.key; // Group

    if (group) {
      return /*#__PURE__*/React.createElement("div", {
        className: (0, _classnames.default)(itemPrefixCls, "".concat(itemPrefixCls, "-group"))
      }, label !== undefined ? label : key);
    }

    var disabled = data.disabled,
        value = data.value,
        title = data.title,
        children = data.children,
        style = data.style,
        className = data.className,
        otherProps = (0, _objectWithoutProperties2.default)(data, ["disabled", "value", "title", "children", "style", "className"]); // Option

    var selected = values.has(value);
    var optionPrefixCls = "".concat(itemPrefixCls, "-option");
    var optionClassName = (0, _classnames.default)(itemPrefixCls, optionPrefixCls, className, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(optionPrefixCls, "-grouped"), groupOption), (0, _defineProperty2.default)(_classNames, "".concat(optionPrefixCls, "-active"), activeIndex === itemIndex && !disabled), (0, _defineProperty2.default)(_classNames, "".concat(optionPrefixCls, "-disabled"), disabled), (0, _defineProperty2.default)(_classNames, "".concat(optionPrefixCls, "-selected"), selected), _classNames));
    var mergedLabel = childrenAsData ? children : label;
    var iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === 'function' || selected;
    var content = mergedLabel || value; // https://github.com/ant-design/ant-design/issues/26717

    var optionTitle = typeof content === 'string' || typeof content === 'number' ? content.toString() : undefined;

    if (title !== undefined) {
      optionTitle = title;
    }

    return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, otherProps, {
      "aria-selected": selected,
      className: optionClassName,
      title: optionTitle,
      onMouseMove: function onMouseMove() {
        if (activeIndex === itemIndex || disabled) {
          return;
        }

        setActive(itemIndex);
      },
      onClick: function onClick() {
        if (!disabled) {
          onSelectValue(value);
        }
      },
      style: style
    }), /*#__PURE__*/React.createElement("div", {
      className: "".concat(optionPrefixCls, "-content")
    }, content), /*#__PURE__*/React.isValidElement(menuItemSelectedIcon) || selected, iconVisible && /*#__PURE__*/React.createElement(_TransBtn.default, {
      className: "".concat(itemPrefixCls, "-option-state"),
      customizeIcon: menuItemSelectedIcon,
      customizeIconProps: {
        isSelected: selected
      }
    }, selected ? '✓' : null));
  }));
};

var RefOptionList = /*#__PURE__*/React.forwardRef(OptionList);
RefOptionList.displayName = 'OptionList';
var _default = RefOptionList;
exports.default = _default;