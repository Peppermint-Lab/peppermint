"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _rcCascader = _interopRequireDefault(require("rc-cascader"));

var _arrayTreeFilter = _interopRequireDefault(require("array-tree-filter"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));

var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));

var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));

var _RedoOutlined = _interopRequireDefault(require("@ant-design/icons/RedoOutlined"));

var _LeftOutlined = _interopRequireDefault(require("@ant-design/icons/LeftOutlined"));

var _input = _interopRequireDefault(require("../input"));

var _configProvider = require("../config-provider");

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));

var _reactNode = require("../_util/reactNode");

var _motion = require("../_util/motion");

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

// We limit the filtered item count by default
var defaultLimit = 50; // keep value when filtering

var keepFilteredValueField = '__KEEP_FILTERED_OPTION_VALUE';

function highlightKeyword(str, keyword, prefixCls) {
  return str.split(keyword).map(function (node, index) {
    return index === 0 ? node : [/*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-menu-item-keyword"),
      key: "seperator"
    }, keyword), node];
  });
}

function defaultFilterOption(inputValue, path, names) {
  return path.some(function (option) {
    return option[names.label].indexOf(inputValue) > -1;
  });
}

function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
  return path.map(function (option, index) {
    var label = option[names.label];
    var node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls) : label;
    return index === 0 ? node : [' / ', node];
  });
}

function defaultSortFilteredOption(a, b, inputValue, names) {
  function callback(elem) {
    return elem[names.label].indexOf(inputValue) > -1;
  }

  return a.findIndex(callback) - b.findIndex(callback);
}

function getFieldNames(_ref) {
  var fieldNames = _ref.fieldNames;
  return fieldNames;
}

function getFilledFieldNames(props) {
  var fieldNames = getFieldNames(props) || {};
  var names = {
    children: fieldNames.children || 'children',
    label: fieldNames.label || 'label',
    value: fieldNames.value || 'value'
  };
  return names;
}

function flattenTree(options, props) {
  var ancestor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var names = getFilledFieldNames(props);
  var flattenOptions = [];
  var childrenName = names.children;
  options.forEach(function (option) {
    var path = ancestor.concat(option);

    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }

    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}

var defaultDisplayRender = function defaultDisplayRender(label) {
  return label.join(' / ');
};

function warningValueNotExist(list) {
  var fieldNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (list || []).forEach(function (item) {
    var valueFieldName = fieldNames.value || 'value';
    (0, _devWarning["default"])(valueFieldName in item, 'Cascader', 'Not found `value` in `options`.');
    warningValueNotExist(item[fieldNames.children || 'children'], fieldNames);
  });
}

function getEmptyNode(renderEmpty, names, notFoundContent) {
  var _ref2;

  return _ref2 = {}, (0, _defineProperty2["default"])(_ref2, names.value, 'ANT_CASCADER_NOT_FOUND'), (0, _defineProperty2["default"])(_ref2, names.label, notFoundContent || renderEmpty('Cascader')), (0, _defineProperty2["default"])(_ref2, "disabled", true), (0, _defineProperty2["default"])(_ref2, "isEmptyNode", true), _ref2;
}

var Cascader = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Cascader, _React$Component);

  var _super = (0, _createSuper2["default"])(Cascader);

  function Cascader(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Cascader);
    _this = _super.call(this, props);
    _this.cachedOptions = [];

    _this.setValue = function (value) {
      var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      var onChange = _this.props.onChange;
      onChange === null || onChange === void 0 ? void 0 : onChange(value, selectedOptions);
    };

    _this.saveInput = function (node) {
      _this.input = node;
    };

    _this.handleChange = function (value, selectedOptions) {
      _this.setState({
        inputValue: ''
      });

      if (selectedOptions[0].__IS_FILTERED_OPTION) {
        var unwrappedValue = selectedOptions[0][keepFilteredValueField] === undefined ? value[0] : selectedOptions[0][keepFilteredValueField];
        var unwrappedSelectedOptions = selectedOptions[0].path;

        _this.setValue(unwrappedValue, unwrappedSelectedOptions);

        return;
      }

      _this.setValue(value, selectedOptions);
    };

    _this.handlePopupVisibleChange = function (popupVisible) {
      if (!('popupVisible' in _this.props)) {
        _this.setState(function (state) {
          return {
            popupVisible: popupVisible,
            inputFocused: popupVisible,
            inputValue: popupVisible ? state.inputValue : ''
          };
        });
      }

      var onPopupVisibleChange = _this.props.onPopupVisibleChange;
      onPopupVisibleChange === null || onPopupVisibleChange === void 0 ? void 0 : onPopupVisibleChange(popupVisible);
    };

    _this.handleInputBlur = function () {
      _this.setState({
        inputFocused: false
      });
    };

    _this.handleInputClick = function (e) {
      var _this$state = _this.state,
          inputFocused = _this$state.inputFocused,
          popupVisible = _this$state.popupVisible; // Prevent `Trigger` behaviour.

      if (inputFocused || popupVisible) {
        e.stopPropagation();
      }
    };

    _this.handleKeyDown = function (e) {
      // SPACE => https://github.com/ant-design/ant-design/issues/16871
      if (e.keyCode === _KeyCode["default"].BACKSPACE || e.keyCode === _KeyCode["default"].SPACE) {
        e.stopPropagation();
      }
    };

    _this.handleInputChange = function (e) {
      var popupVisible = _this.state.popupVisible;
      var inputValue = e.target.value;

      if (!popupVisible) {
        _this.handlePopupVisibleChange(true);
      }

      _this.setState({
        inputValue: inputValue
      });
    };

    _this.clearSelection = function (e) {
      var inputValue = _this.state.inputValue;
      e.preventDefault();
      e.stopPropagation();

      if (!inputValue) {
        _this.handlePopupVisibleChange(false);

        _this.clearSelectionTimeout = setTimeout(function () {
          _this.setValue([]);
        }, 200);
      } else {
        _this.setState({
          inputValue: ''
        });
      }
    };

    _this.renderCascader = function (_ref3, locale) {
      var getContextPopupContainer = _ref3.getPopupContainer,
          getPrefixCls = _ref3.getPrefixCls,
          renderEmpty = _ref3.renderEmpty,
          direction = _ref3.direction;
      return /*#__PURE__*/React.createElement(_SizeContext["default"].Consumer, null, function (size) {
        var _classNames, _classNames2, _classNames3, _classNames5;

        var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
            props = _assertThisInitialize.props,
            state = _assertThisInitialize.state;

        var customizePrefixCls = props.prefixCls,
            customizeInputPrefixCls = props.inputPrefixCls,
            children = props.children,
            _props$placeholder = props.placeholder,
            placeholder = _props$placeholder === void 0 ? locale.placeholder || 'Please select' : _props$placeholder,
            customizeSize = props.size,
            disabled = props.disabled,
            className = props.className,
            style = props.style,
            allowClear = props.allowClear,
            _props$showSearch = props.showSearch,
            showSearch = _props$showSearch === void 0 ? false : _props$showSearch,
            suffixIcon = props.suffixIcon,
            expandIcon = props.expandIcon,
            notFoundContent = props.notFoundContent,
            popupClassName = props.popupClassName,
            bordered = props.bordered,
            dropdownRender = props.dropdownRender,
            otherProps = __rest(props, ["prefixCls", "inputPrefixCls", "children", "placeholder", "size", "disabled", "className", "style", "allowClear", "showSearch", "suffixIcon", "expandIcon", "notFoundContent", "popupClassName", "bordered", "dropdownRender"]);

        var mergedSize = customizeSize || size;
        var value = state.value,
            inputFocused = state.inputFocused;
        var isRtlLayout = direction === 'rtl';
        var prefixCls = getPrefixCls('cascader', customizePrefixCls);
        var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
        var sizeCls = (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(inputPrefixCls, "-lg"), mergedSize === 'large'), (0, _defineProperty2["default"])(_classNames, "".concat(inputPrefixCls, "-sm"), mergedSize === 'small'), _classNames));
        var clearIcon = allowClear && !disabled && value.length > 0 || state.inputValue ? /*#__PURE__*/React.createElement(_CloseCircleFilled["default"], {
          className: "".concat(prefixCls, "-picker-clear"),
          onClick: _this.clearSelection
        }) : null;
        var arrowCls = (0, _classnames["default"])((_classNames2 = {}, (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-picker-arrow"), true), (0, _defineProperty2["default"])(_classNames2, "".concat(prefixCls, "-picker-arrow-expand"), state.popupVisible), _classNames2));
        var pickerCls = (0, _classnames["default"])("".concat(prefixCls, "-picker"), (_classNames3 = {}, (0, _defineProperty2["default"])(_classNames3, "".concat(prefixCls, "-picker-rtl"), isRtlLayout), (0, _defineProperty2["default"])(_classNames3, "".concat(prefixCls, "-picker-with-value"), state.inputValue), (0, _defineProperty2["default"])(_classNames3, "".concat(prefixCls, "-picker-disabled"), disabled), (0, _defineProperty2["default"])(_classNames3, "".concat(prefixCls, "-picker-").concat(mergedSize), !!mergedSize), (0, _defineProperty2["default"])(_classNames3, "".concat(prefixCls, "-picker-show-search"), !!showSearch), (0, _defineProperty2["default"])(_classNames3, "".concat(prefixCls, "-picker-focused"), inputFocused), (0, _defineProperty2["default"])(_classNames3, "".concat(prefixCls, "-picker-borderless"), !bordered), _classNames3), className); // Fix bug of https://github.com/facebook/react/pull/5004
        // and https://fb.me/react-unknown-prop

        var inputProps = (0, _omit["default"])( // Not know why these props left
        otherProps, ['onChange', 'options', 'popupPlacement', 'transitionName', 'displayRender', 'onPopupVisibleChange', 'changeOnSelect', 'expandTrigger', 'popupVisible', 'getPopupContainer', 'loadData', 'filterOption', 'renderFilteredOption', 'sortFilteredOption', 'fieldNames']);
        var options = props.options;
        var names = getFilledFieldNames(_this.props);

        if (options && options.length > 0) {
          if (state.inputValue) {
            options = _this.generateFilteredOptions(prefixCls, renderEmpty);
          }
        } else {
          options = [getEmptyNode(renderEmpty, names, notFoundContent)];
        } // Dropdown menu should keep previous status until it is fully closed.


        if (!state.popupVisible) {
          options = _this.cachedOptions;
        } else {
          _this.cachedOptions = options;
        }

        var dropdownMenuColumnStyle = {};
        var isNotFound = (options || []).length === 1 && options[0].isEmptyNode;

        if (isNotFound) {
          dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
        } // The default value of `matchInputWidth` is `true`


        var resultListMatchInputWidth = showSearch.matchInputWidth !== false;

        if (resultListMatchInputWidth && (state.inputValue || isNotFound) && _this.input) {
          dropdownMenuColumnStyle.width = _this.input.input.offsetWidth;
        }

        var inputIcon;

        if (suffixIcon) {
          inputIcon = (0, _reactNode.replaceElement)(suffixIcon, /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-picker-arrow")
          }, suffixIcon), function () {
            var _classNames4;

            return {
              className: (0, _classnames["default"])((_classNames4 = {}, (0, _defineProperty2["default"])(_classNames4, suffixIcon.props.className, suffixIcon.props.className), (0, _defineProperty2["default"])(_classNames4, "".concat(prefixCls, "-picker-arrow"), true), _classNames4))
            };
          });
        } else {
          inputIcon = /*#__PURE__*/React.createElement(_DownOutlined["default"], {
            className: arrowCls
          });
        }

        var input = children || /*#__PURE__*/React.createElement("span", {
          style: style,
          className: pickerCls
        }, /*#__PURE__*/React.createElement("span", {
          className: "".concat(prefixCls, "-picker-label")
        }, _this.getLabel()), /*#__PURE__*/React.createElement(_input["default"], (0, _extends2["default"])({}, inputProps, {
          tabIndex: -1,
          ref: _this.saveInput,
          prefixCls: inputPrefixCls,
          placeholder: value && value.length > 0 ? undefined : placeholder,
          className: "".concat(prefixCls, "-input ").concat(sizeCls),
          value: state.inputValue,
          disabled: disabled,
          readOnly: !showSearch,
          autoComplete: inputProps.autoComplete || 'off',
          onClick: showSearch ? _this.handleInputClick : undefined,
          onBlur: showSearch ? _this.handleInputBlur : undefined,
          onKeyDown: _this.handleKeyDown,
          onChange: showSearch ? _this.handleInputChange : undefined
        })), clearIcon, inputIcon);
        var expandIconNode;

        if (expandIcon) {
          expandIconNode = expandIcon;
        } else {
          expandIconNode = isRtlLayout ? /*#__PURE__*/React.createElement(_LeftOutlined["default"], null) : /*#__PURE__*/React.createElement(_RightOutlined["default"], null);
        }

        var loadingIcon = /*#__PURE__*/React.createElement("span", {
          className: "".concat(prefixCls, "-menu-item-loading-icon")
        }, /*#__PURE__*/React.createElement(_RedoOutlined["default"], {
          spin: true
        }));
        var getPopupContainer = props.getPopupContainer || getContextPopupContainer;
        var rest = (0, _omit["default"])(props, ['inputIcon', 'expandIcon', 'loadingIcon', 'bordered', 'className']);
        var rcCascaderPopupClassName = (0, _classnames["default"])(popupClassName, (_classNames5 = {}, (0, _defineProperty2["default"])(_classNames5, "".concat(prefixCls, "-menu-").concat(direction), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames5, "".concat(prefixCls, "-menu-empty"), options.length === 1 && options[0].value === 'ANT_CASCADER_NOT_FOUND'), _classNames5));
        var rootPrefixCls = getPrefixCls();
        return /*#__PURE__*/React.createElement(_rcCascader["default"], (0, _extends2["default"])({}, rest, {
          prefixCls: prefixCls,
          getPopupContainer: getPopupContainer,
          options: options,
          value: value,
          popupVisible: state.popupVisible,
          onPopupVisibleChange: _this.handlePopupVisibleChange,
          onChange: _this.handleChange,
          dropdownMenuColumnStyle: dropdownMenuColumnStyle,
          expandIcon: expandIconNode,
          loadingIcon: loadingIcon,
          popupClassName: rcCascaderPopupClassName,
          popupPlacement: _this.getPopupPlacement(direction) // rc-cascader should update ts define to fix this case
          ,
          dropdownRender: dropdownRender,
          transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'slide-up', props.transitionName)
        }), input);
      });
    };

    _this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch ? flattenTree(props.options, props) : undefined,
      prevProps: props
    };
    return _this;
  }

  (0, _createClass2["default"])(Cascader, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.clearSelectionTimeout) {
        clearTimeout(this.clearSelectionTimeout);
      }
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      var _this$props = this.props,
          options = _this$props.options,
          _this$props$displayRe = _this$props.displayRender,
          displayRender = _this$props$displayRe === void 0 ? defaultDisplayRender : _this$props$displayRe;
      var names = getFilledFieldNames(this.props);
      var value = this.state.value;
      var unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
      var selectedOptions = (0, _arrayTreeFilter["default"])(options, function (o, level) {
        return o[names.value] === unwrappedValue[level];
      }, {
        childrenKeyName: names.children
      });
      var label = selectedOptions.length ? selectedOptions.map(function (o) {
        return o[names.label];
      }) : value;
      return displayRender(label, selectedOptions);
    }
  }, {
    key: "generateFilteredOptions",
    value: function generateFilteredOptions(prefixCls, renderEmpty) {
      var _this2 = this;

      var _this$props2 = this.props,
          showSearch = _this$props2.showSearch,
          notFoundContent = _this$props2.notFoundContent;
      var names = getFilledFieldNames(this.props);
      var _showSearch$filter = showSearch.filter,
          filter = _showSearch$filter === void 0 ? defaultFilterOption : _showSearch$filter,
          _showSearch$render = showSearch.render,
          render = _showSearch$render === void 0 ? defaultRenderFilteredOption : _showSearch$render,
          _showSearch$sort = showSearch.sort,
          sort = _showSearch$sort === void 0 ? defaultSortFilteredOption : _showSearch$sort,
          _showSearch$limit = showSearch.limit,
          limit = _showSearch$limit === void 0 ? defaultLimit : _showSearch$limit;
      var _this$state2 = this.state,
          _this$state2$flattenO = _this$state2.flattenOptions,
          flattenOptions = _this$state2$flattenO === void 0 ? [] : _this$state2$flattenO,
          inputValue = _this$state2.inputValue; // Limit the filter if needed

      var filtered;

      if (limit > 0) {
        filtered = [];
        var matchCount = 0; // Perf optimization to filter items only below the limit

        flattenOptions.some(function (path) {
          var match = filter(_this2.state.inputValue, path, names);

          if (match) {
            filtered.push(path);
            matchCount += 1;
          }

          return matchCount >= limit;
        });
      } else {
        (0, _devWarning["default"])(typeof limit !== 'number', 'Cascader', "'limit' of showSearch should be positive number or false.");
        filtered = flattenOptions.filter(function (path) {
          return filter(_this2.state.inputValue, path, names);
        });
      }

      filtered = filtered.sort(function (a, b) {
        return sort(a, b, inputValue, names);
      });

      if (filtered.length > 0) {
        // Fix issue: https://github.com/ant-design/ant-design/issues/26554
        var field = names.value === names.label ? keepFilteredValueField : names.value;
        return filtered.map(function (path) {
          var _ref4;

          return _ref4 = {
            __IS_FILTERED_OPTION: true,
            path: path
          }, (0, _defineProperty2["default"])(_ref4, field, path.map(function (o) {
            return o[names.value];
          })), (0, _defineProperty2["default"])(_ref4, names.label, render(inputValue, path, prefixCls, names)), (0, _defineProperty2["default"])(_ref4, "disabled", path.some(function (o) {
            return !!o.disabled;
          })), (0, _defineProperty2["default"])(_ref4, "isEmptyNode", true), _ref4;
        });
      }

      return [getEmptyNode(renderEmpty, names, notFoundContent)];
    }
  }, {
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "getPopupPlacement",
    value: function getPopupPlacement() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ltr';
      var popupPlacement = this.props.popupPlacement;

      if (popupPlacement !== undefined) {
        return popupPlacement;
      }

      return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, function (configArgument) {
        return /*#__PURE__*/React.createElement(_LocaleReceiver["default"], null, function (locale) {
          return _this3.renderCascader(configArgument, locale);
        });
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, _ref5) {
      var prevProps = _ref5.prevProps;
      var newState = {
        prevProps: nextProps
      };

      if ('value' in nextProps) {
        newState.value = nextProps.value || [];
      }

      if ('popupVisible' in nextProps) {
        newState.popupVisible = nextProps.popupVisible;
      }

      if (nextProps.showSearch && prevProps.options !== nextProps.options) {
        newState.flattenOptions = flattenTree(nextProps.options, nextProps);
      }

      if (process.env.NODE_ENV !== 'production' && nextProps.options) {
        warningValueNotExist(nextProps.options, getFieldNames(nextProps));
      }

      return newState;
    }
  }]);
  return Cascader;
}(React.Component);

Cascader.defaultProps = {
  options: [],
  disabled: false,
  allowClear: true,
  bordered: true
};
var _default = Cascader;
exports["default"] = _default;