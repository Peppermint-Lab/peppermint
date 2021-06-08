import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import * as React from 'react';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import Search from './search';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigConsumer } from '../config-provider';
import devWarning from '../_util/devWarning';

var Transfer = /*#__PURE__*/function (_React$Component) {
  _inherits(Transfer, _React$Component);

  var _super = _createSuper(Transfer);

  function Transfer(props) {
    var _this;

    _classCallCheck(this, Transfer);

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
      return _extends(_extends(_extends({}, transferLocale), {
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
          mergedCheckedKeys = Array.from(new Set([].concat(_toConsumableArray(prevKeys), _toConsumableArray(selectedKeys))));
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
      var holder = direction === 'left' ? _toConsumableArray(sourceSelectedKeys) : _toConsumableArray(targetSelectedKeys);
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
      }), 'left', _toConsumableArray(selectedKeys));
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
      return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref3) {
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
        var cls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-customize-list"), !!children), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);

        var titles = _this.getTitles(locale);

        var selectAllLabels = _this.props.selectAllLabels || [];
        return /*#__PURE__*/React.createElement("div", {
          className: cls,
          style: style
        }, /*#__PURE__*/React.createElement(List, _extends({
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
        }, locale)), /*#__PURE__*/React.createElement(Operation, {
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
        }), /*#__PURE__*/React.createElement(List, _extends({
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

  _createClass(Transfer, [{
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
          record = _extends(_extends({}, record), {
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
      return /*#__PURE__*/React.createElement(LocaleReceiver, {
        componentName: "Transfer",
        defaultLocale: defaultLocale.Transfer
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

      devWarning(!pagination || !children, 'Transfer', '`pagination` not support customize render list.');
      return null;
    }
  }]);

  return Transfer;
}(React.Component); // For high-level customized Transfer @dqaria


Transfer.List = List;
Transfer.Operation = Operation;
Transfer.Search = Search;
Transfer.defaultProps = {
  dataSource: [],
  locale: {},
  showSearch: false,
  listStyle: function listStyle() {}
};
export default Transfer;