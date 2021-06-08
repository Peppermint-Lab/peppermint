import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import classNames from 'classnames';
import { tuple } from '../_util/type';
import Pagination from '../pagination';
import ListItem from './ListItem';
export var OmitProps = tuple('handleFilter', 'handleClear', 'checkedKeys');

function parsePagination(pagination) {
  if (!pagination) {
    return null;
  }

  var defaultPagination = {
    pageSize: 10
  };

  if (_typeof(pagination) === 'object') {
    return _extends(_extends({}, defaultPagination), pagination);
  }

  return defaultPagination;
}

var ListBody = /*#__PURE__*/function (_React$Component) {
  _inherits(ListBody, _React$Component);

  var _super = _createSuper(ListBody);

  function ListBody() {
    var _this;

    _classCallCheck(this, ListBody);

    _this = _super.apply(this, arguments);
    _this.state = {
      current: 1
    };

    _this.onItemSelect = function (item) {
      var _this$props = _this.props,
          onItemSelect = _this$props.onItemSelect,
          selectedKeys = _this$props.selectedKeys;
      var checked = selectedKeys.indexOf(item.key) >= 0;
      onItemSelect(item.key, !checked);
    };

    _this.onItemRemove = function (item) {
      var onItemRemove = _this.props.onItemRemove;
      onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove([item.key]);
    };

    _this.onPageChange = function (current) {
      _this.setState({
        current: current
      });
    };

    _this.getItems = function () {
      var current = _this.state.current;
      var _this$props2 = _this.props,
          pagination = _this$props2.pagination,
          filteredRenderItems = _this$props2.filteredRenderItems;
      var mergedPagination = parsePagination(pagination);
      var displayItems = filteredRenderItems;

      if (mergedPagination) {
        displayItems = filteredRenderItems.slice((current - 1) * mergedPagination.pageSize, current * mergedPagination.pageSize);
      }

      return displayItems;
    };

    return _this;
  }

  _createClass(ListBody, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          onScroll = _this$props3.onScroll,
          filteredRenderItems = _this$props3.filteredRenderItems,
          selectedKeys = _this$props3.selectedKeys,
          globalDisabled = _this$props3.disabled,
          showRemove = _this$props3.showRemove,
          pagination = _this$props3.pagination;
      var mergedPagination = parsePagination(pagination);
      var paginationNode = null;

      if (mergedPagination) {
        paginationNode = /*#__PURE__*/React.createElement(Pagination, {
          simple: true,
          size: "small",
          disabled: globalDisabled,
          className: "".concat(prefixCls, "-pagination"),
          total: filteredRenderItems.length,
          pageSize: mergedPagination.pageSize,
          current: current,
          onChange: this.onPageChange
        });
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
        className: classNames("".concat(prefixCls, "-content"), _defineProperty({}, "".concat(prefixCls, "-content-show-remove"), showRemove)),
        onScroll: onScroll
      }, this.getItems().map(function (_ref) {
        var renderedEl = _ref.renderedEl,
            renderedText = _ref.renderedText,
            item = _ref.item;
        var disabled = item.disabled;
        var checked = selectedKeys.indexOf(item.key) >= 0;
        return /*#__PURE__*/React.createElement(ListItem, {
          disabled: globalDisabled || disabled,
          key: item.key,
          item: item,
          renderedText: renderedText,
          renderedEl: renderedEl,
          checked: checked,
          prefixCls: prefixCls,
          onClick: _this2.onItemSelect,
          onRemove: _this2.onItemRemove,
          showRemove: showRemove
        });
      })), paginationNode);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref2, _ref3) {
      var filteredRenderItems = _ref2.filteredRenderItems,
          pagination = _ref2.pagination;
      var current = _ref3.current;
      var mergedPagination = parsePagination(pagination);

      if (mergedPagination) {
        // Calculate the page number
        var maxPageCount = Math.ceil(filteredRenderItems.length / mergedPagination.pageSize);

        if (current > maxPageCount) {
          return {
            current: maxPageCount
          };
        }
      }

      return null;
    }
  }]);

  return ListBody;
}(React.Component);

export default ListBody;