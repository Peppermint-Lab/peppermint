"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _list = _interopRequireDefault(require("./list"));

var _operation = _interopRequireDefault(require("./operation"));

var _search = _interopRequireDefault(require("./search"));

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _default2 = _interopRequireDefault(require("../locale/default"));

var _configProvider = require("../config-provider");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var Transfer = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Transfer, _React$Component);

  var _super = (0, _createSuper2["default"])(Transfer);

  function Transfer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Transfer);
    _this = _super.call(this, props);
    _this.separatedDataSource = null;

    _this.setStateKeys = function (direction, keys) {
      if (direction === 'left') {
        _this.setState(function (_ref) {
          var sourceSelectedKeys = _ref.sourceSelectedKeys;
          return {
            sourceSelectedKeys: typeof keys === 'function' ? keys(sourceSelectedKeys || []) : keys
          };
        });
      } else {
        _this.setState(function (_ref2) {
          var targetSelectedKeys = _ref2.targetSelectedKeys;
          return {
            targetSelectedKeys: typeof keys === 'function' ? keys(targetSelectedKeys || []) : keys
          };
        });
      }
    };

    _this.getLocale = function (transferLocale, renderEmpty) {
      return (0, _extends2["default"])((0, _extends2["default"])((0, _extends2["default"])({}, transferLocale), {
        notFoundContent: renderEmpty('Transfer')
      }), _this.props.locale);
    };

    _this.moveTo = function (direction) {
      var _this$props = _this.props,
          _this$props$targetKey = _this$props.targetKeys,
          targetKeys = _this$props$targetKey === void 0 ? [] : _this$props$targetKey,
          _this$props$dataSourc = _this$props.dataSource,
          dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc,
          onChange = _this$props.onChange;
      var _this$state = _this.state,
          sourceSelectedKeys = _this$state.sourceSelectedKeys,
          targetSelectedKeys = _this$state.targetSelectedKeys;
      var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys; // filter the disabled options

      var newMoveKeys = moveKeys.filter(function (key) {
        return !dataSource.some(function (data) {
          return !!(key === data.key && data.disabled);
        });
      }); // move items to target box

      var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
        return newMoveKeys.indexOf(targetKey) === -1;
      }); // empty checked keys

      var oppositeDirection = direction === 'right' ? 'left' : 'right';

      _this.setStateKeys(oppositeDirection, []);

      _this.handleSelectChange(oppositeDirection, []);

      onChange === null || onChange === void 0 ? void 0 : onChange(newTargetKeys, direction, newMoveKeys);
    };

    _this.moveToLeft = function () {
      return _this.moveTo('left');
    };

    _this.moveToRight = function () {
      return _this.moveTo('right');
    };

    _this.onItemSelectAll = function (direction, selectedKeys, checkAll) {
      _this.setStateKeys(direction, function (prevKeys) {
        var mergedCheckedKeys = [];

        if (checkAll) {
          // Merge current keys with origin key
          mergedCheckedKeys = Array.from(new Set([].concat((0, _toConsumableArray2["default"])(prevKeys), (0, _toConsumableArray2["default"])(selectedKeys))));
        } else {
          // Remove current keys from origin keys
          mergedCheckedKeys = prevKeys.filter(function (key) {
            return selectedKeys.indexOf(key) === -1;
          });
        }

        _this.handleSelectChange(direction, mergedCheckedKeys);

        return mergedCheckedKeys;
      });
    };

    _this.onLeftItemSelectAll = function (selectedKeys, checkAll) {
      return _this.onItemSelectAll('left', selectedKeys, checkAll);
    };

    _this.onRightItemSelectAll = function (selectedKeys, checkAll) {
      return _this.onItemSelectAll('right', selectedKeys, checkAll);
    };

    _this.handleFilter = function (direction, e) {
      var onSearch = _this.props.onSearch;
      var value = e.target.value;
      onSearch === null || onSearch === void 0 ? void 0 : onSearch(direction, value);
    };

    _this.handleLeftFilter = function (e) {
      return _this.handleFilter('left', e);
    };

    _this.handleRightFilter = function (e) {
      return _this.handleFilter('right', e);
    };

    _this.handleClear = function (direction) {
      var onSearch = _this.props.onSearch;
      onSearch === null || onSearch === void 0 ? void 0 : onSearch(direction, '');
    };

    _this.handleLeftClear = function () {
      return _this.handleClear('left');
    };

    _this.handleRightClear = function () {
      return _this.handleClear('right');
    };

    _this.onItemSelect = function (direction, selectedKey, checked) {
      var _this$state2 = _this.state,
          sourceSelectedKeys = _this$state2.sourceSelectedKeys,
          targetSelectedKeys = _this$state2.targetSelectedKeys;
      var holder = direction === 'left' ? (0, _toConsumableArray2["default"])(sourceSelectedKeys) : (0, _toConsumableArray2["default"])(targetSelectedKeys);
      var index = holder.indexOf(selectedKey);

      if (index > -1) {
        holder.splice(index, 1);
      }

      if (checked) {
        holder.push(selectedKey);
      }

      _this.handleSelectChange(direction, holder);

      if (!_this.props.selectedKeys) {
        _this.setStateKeys(direction, holder);
      }
    };

    _this.onLeftItemSelect = function (selectedKey, checked) {
      return _this.onItemSelect('left', selectedKey, checked);
    };

    _this.onRightItemSelect = function (selectedKey, checked) {
      return _this.onItemSelect('right', selectedKey, checked);
    };

    _this.onRightItemRemove = function (selectedKeys) {
      var _this$props2 = _this.props,
          _this$props2$targetKe = _this$props2.targetKeys,
          targetKeys = _this$props2$targetKe === void 0 ? [] : _this$props2$targetKe,
          onChange = _this$props2.onChange;

      _this.setStateKeys('right', []);

      onChange === null || onChange === void 0 ? void 0 : onChange(targetKeys.filter(function (key) {
        return !selectedKeys.includes(key);
      }), 'left', (0, _toConsumableArray2["default"])(selectedKeys));
    };

    _this.handleScroll = function (direction, e) {
      var onScroll = _this.props.onScroll;
      onScroll === null || onScroll === void 0 ? void 0 : onScroll(direction, e);
    };

    _this.handleLeftScroll = function (e) {
      return _this.handleScroll('left', e);
    };

    _this.handleRightScroll = function (e) {
      return _this.handleScroll('right', e);
    };

    _this.handleListStyle = function (listStyle, direction) {
      if (typeof listStyle === 'function') {
        return listStyle({
          direction: direction
        });
      }

      return listStyle;
    };

    _this.renderTransfer = function (transferLocale) {
      return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, function (_ref3) {
        var _classNames;

        var getPrefixCls = _ref3.getPrefixCls,
            renderEmpty = _ref3.renderEmpty,
            direction = _ref3.direction;
        var _this$props3 = _this.props,
            customizePrefixCls = _this$props3.prefixCls,
            className = _this$props3.className,
            disabled = _this$props3.disabled,
            _this$props3$operatio = _this$props3.operations,
            operations = _this$props3$operatio === void 0 ? [] : _this$props3$operatio,
            showSearch = _this$props3.showSearch,
            footer = _this$props3.footer,
            style = _this$props3.style,
            listStyle = _this$props3.listStyle,
            operationStyle = _this$props3.operationStyle,
            filterOption = _this$props3.filterOption,
            render = _this$props3.render,
            children = _this$props3.children,
            showSelectAll = _this$props3.showSelectAll,
            oneWay = _this$props3.oneWay,
            pagination = _this$props3.pagination;
        var prefixCls = getPrefixCls('transfer', customizePrefixCls);

        var locale = _this.getLocale(transferLocale, renderEmpty);

        var _this$state3 = _this.state,
            sourceSelectedKeys = _this$state3.sourceSelectedKeys,
            targetSelectedKeys = _this$state3.targetSelectedKeys;
        var mergedPagination = !children && pagination;

        var _this$separateDataSou = _this.separateDataSource(),
            leftDataSource = _this$separateDataSou.leftDataSource,
            rightDataSource = _this$separateDataSou.rightDataSource;

        var leftActive = targetSelectedKeys.length > 0;
        var rightActive = sourceSelectedKeys.length > 0;
        var cls = (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-disabled"), disabled), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-customize-list"), !!children), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);

        var titles = _this.getTitles(locale);

        var selectAllLabels = _this.props.selectAllLabels || [];
        return /*#__PURE__*/React.createElement("div", {
          className: cls,
          style: style
        }, /*#__PURE__*/React.createElement(_list["default"], (0, _extends2["default"])({
          prefixCls: "".concat(prefixCls, "-list"),
          titleText: titles[0],
          dataSource: leftDataSource,
          filterOption: filterOption,
          style: _this.handleListStyle(listStyle, 'left'),
          checkedKeys: sourceSelectedKeys,
          handleFilter: _this.handleLeftFilter,
          handleClear: _this.handleLeftClear,
          onItemSelect: _this.onLeftItemSelect,
          onItemSelectAll: _this.onLeftItemSelectAll,
          render: render,
          showSearch: showSearch,
          renderList: children,
          footer: footer,
          onScroll: _this.handleLeftScroll,
          disabled: disabled,
          direction: "left",
          showSelectAll: showSelectAll,
          selectAllLabel: selectAllLabels[0],
          pagination: mergedPagination
        }, locale)), /*#__PURE__*/React.createElement(_operation["default"], {
          className: "".concat(prefixCls, "-operation"),
          rightActive: rightActive,
          rightArrowText: operations[0],
          moveToRight: _this.moveToRight,
          leftActive: leftActive,
          leftArrowText: operations[1],
          moveToLeft: _this.moveToLeft,
          style: operationStyle,
          disabled: disabled,
          direction: direction,
          oneWay: oneWay
        }), /*#__PURE__*/React.createElement(_list["default"], (0, _extends2["default"])({
          prefixCls: "".concat(prefixCls, "-list"),
          titleText: titles[1],
          dataSource: rightDataSource,
          filterOption: filterOption,
          style: _this.handleListStyle(listStyle, 'right'),
          checkedKeys: targetSelectedKeys,
          handleFilter: _this.handleRightFilter,
          handleClear: _this.handleRightClear,
          onItemSelect: _this.onRightItemSelect,
          onItemSelectAll: _this.onRightItemSelectAll,
          onItemRemove: _this.onRightItemRemove,
          render: render,
          showSearch: showSearch,
          renderList: children,
          footer: footer,
          onScroll: _this.handleRightScroll,
          disabled: disabled,
          direction: "right",
          showSelectAll: showSelectAll,
          selectAllLabel: selectAllLabels[1],
          showRemove: oneWay,
          pagination: mergedPagination
        }, locale)));
      });
    };

    var _props$selectedKeys = props.selectedKeys,
        selectedKeys = _props$selectedKeys === void 0 ? [] : _props$selectedKeys,
        _props$targetKeys = props.targetKeys,
        targetKeys = _props$targetKeys === void 0 ? [] : _props$targetKeys;
    _this.state = {
      sourceSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) === -1;
      }),
      targetSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) > -1;
      })
    };
    return _this;
  }

  (0, _createClass2["default"])(Transfer, [{
    key: "getTitles",
    value: function getTitles(transferLocale) {
      var titles = this.props.titles;

      if (titles) {
        return titles;
      }

      return transferLocale.titles;
    }
  }, {
    key: "handleSelectChange",
    value: function handleSelectChange(direction, holder) {
      var _this$state4 = this.state,
          sourceSelectedKeys = _this$state4.sourceSelectedKeys,
          targetSelectedKeys = _this$state4.targetSelectedKeys;
      var onSelectChange = this.props.onSelectChange;

      if (!onSelectChange) {
        return;
      }

      if (direction === 'left') {
        onSelectChange(holder, targetSelectedKeys);
      } else {
        onSelectChange(sourceSelectedKeys, holder);
      }
    }
  }, {
    key: "separateDataSource",
    value: function separateDataSource() {
      var _this$props4 = this.props,
          dataSource = _this$props4.dataSource,
          rowKey = _this$props4.rowKey,
          _this$props4$targetKe = _this$props4.targetKeys,
          targetKeys = _this$props4$targetKe === void 0 ? [] : _this$props4$targetKe;
      var leftDataSource = [];
      var rightDataSource = new Array(targetKeys.length);
      dataSource.forEach(function (record) {
        if (rowKey) {
          record = (0, _extends2["default"])((0, _extends2["default"])({}, record), {
            key: rowKey(record)
          });
        } // rightDataSource should be ordered by targetKeys
        // leftDataSource should be ordered by dataSource


        var indexOfKey = targetKeys.indexOf(record.key);

        if (indexOfKey !== -1) {
          rightDataSource[indexOfKey] = record;
        } else {
          leftDataSource.push(record);
        }
      });
      return {
        leftDataSource: leftDataSource,
        rightDataSource: rightDataSource
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
        componentName: "Transfer",
        defaultLocale: _default2["default"].Transfer
      }, this.renderTransfer);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref4) {
      var selectedKeys = _ref4.selectedKeys,
          targetKeys = _ref4.targetKeys,
          pagination = _ref4.pagination,
          children = _ref4.children;

      if (selectedKeys) {
        var mergedTargetKeys = targetKeys || [];
        return {
          sourceSelectedKeys: selectedKeys.filter(function (key) {
            return !mergedTargetKeys.includes(key);
          }),
          targetSelectedKeys: selectedKeys.filter(function (key) {
            return mergedTargetKeys.includes(key);
          })
        };
      }

      (0, _devWarning["default"])(!pagination || !children, 'Transfer', '`pagination` not support customize render list.');
      return null;
    }
  }]);
  return Transfer;
}(React.Component); // For high-level customized Transfer @dqaria


Transfer.List = _list["default"];
Transfer.Operation = _operation["default"];
Transfer.Search = _search["default"];
Transfer.defaultProps = {
  dataSource: [],
  locale: {},
  showSearch: false,
  listStyle: function listStyle() {}
};
var _default = Transfer;
exports["default"] = _default;