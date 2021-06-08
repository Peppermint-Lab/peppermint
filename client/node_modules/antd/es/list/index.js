import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';
import Spin from '../spin';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { responsiveArray } from '../_util/responsiveObserve';
import { ConfigContext } from '../config-provider';
import Pagination from '../pagination';
import { Row } from '../grid';
import Item from './Item';
export var ListContext = /*#__PURE__*/React.createContext({});
export var ListConsumer = ListContext.Consumer;

function List(_a) {
  var _classNames;

  var _a$pagination = _a.pagination,
      pagination = _a$pagination === void 0 ? false : _a$pagination,
      customizePrefixCls = _a.prefixCls,
      _a$bordered = _a.bordered,
      bordered = _a$bordered === void 0 ? false : _a$bordered,
      _a$split = _a.split,
      split = _a$split === void 0 ? true : _a$split,
      className = _a.className,
      children = _a.children,
      itemLayout = _a.itemLayout,
      loadMore = _a.loadMore,
      grid = _a.grid,
      _a$dataSource = _a.dataSource,
      dataSource = _a$dataSource === void 0 ? [] : _a$dataSource,
      size = _a.size,
      header = _a.header,
      footer = _a.footer,
      _a$loading = _a.loading,
      loading = _a$loading === void 0 ? false : _a$loading,
      rowKey = _a.rowKey,
      renderItem = _a.renderItem,
      locale = _a.locale,
      rest = __rest(_a, ["pagination", "prefixCls", "bordered", "split", "className", "children", "itemLayout", "loadMore", "grid", "dataSource", "size", "header", "footer", "loading", "rowKey", "renderItem", "locale"]);

  var paginationObj = pagination && _typeof(pagination) === 'object' ? pagination : {};

  var _React$useState = React.useState(paginationObj.defaultCurrent || 1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      paginationCurrent = _React$useState2[0],
      setPaginationCurrent = _React$useState2[1];

  var _React$useState3 = React.useState(paginationObj.defaultPageSize || 10),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      paginationSize = _React$useState4[0],
      setPaginationSize = _React$useState4[1];

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      renderEmpty = _React$useContext.renderEmpty,
      direction = _React$useContext.direction;

  var defaultPaginationProps = {
    current: 1,
    total: 0
  };
  var keys = {};

  var triggerPaginationEvent = function triggerPaginationEvent(eventName) {
    return function (page, pageSize) {
      setPaginationCurrent(page);
      setPaginationSize(pageSize);

      if (pagination && pagination[eventName]) {
        pagination[eventName](page, pageSize);
      }
    };
  };

  var onPaginationChange = triggerPaginationEvent('onChange');
  var onPaginationShowSizeChange = triggerPaginationEvent('onShowSizeChange');

  var renderInnerItem = function renderInnerItem(item, index) {
    if (!renderItem) return null;
    var key;

    if (typeof rowKey === 'function') {
      key = rowKey(item);
    } else if (typeof rowKey === 'string') {
      key = item[rowKey];
    } else {
      key = item.key;
    }

    if (!key) {
      key = "list-item-".concat(index);
    }

    keys[index] = key;
    return renderItem(item, index);
  };

  var isSomethingAfterLastItem = function isSomethingAfterLastItem() {
    return !!(loadMore || pagination || footer);
  };

  var renderEmptyFunc = function renderEmptyFunc(prefixCls, renderEmptyHandler) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-empty-text")
    }, locale && locale.emptyText || renderEmptyHandler('List'));
  };

  var prefixCls = getPrefixCls('list', customizePrefixCls);
  var loadingProp = loading;

  if (typeof loadingProp === 'boolean') {
    loadingProp = {
      spinning: loadingProp
    };
  }

  var isLoading = loadingProp && loadingProp.spinning; // large => lg
  // small => sm

  var sizeCls = '';

  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;

    case 'small':
      sizeCls = 'sm';
      break;

    default:
      break;
  }

  var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-vertical"), itemLayout === 'vertical'), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(sizeCls), sizeCls), _defineProperty(_classNames, "".concat(prefixCls, "-split"), split), _defineProperty(_classNames, "".concat(prefixCls, "-bordered"), bordered), _defineProperty(_classNames, "".concat(prefixCls, "-loading"), isLoading), _defineProperty(_classNames, "".concat(prefixCls, "-grid"), !!grid), _defineProperty(_classNames, "".concat(prefixCls, "-something-after-last-item"), isSomethingAfterLastItem()), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);

  var paginationProps = _extends(_extends(_extends({}, defaultPaginationProps), {
    total: dataSource.length,
    current: paginationCurrent,
    pageSize: paginationSize
  }), pagination || {});

  var largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);

  if (paginationProps.current > largestPage) {
    paginationProps.current = largestPage;
  }

  var paginationContent = pagination ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-pagination")
  }, /*#__PURE__*/React.createElement(Pagination, _extends({}, paginationProps, {
    onChange: onPaginationChange,
    onShowSizeChange: onPaginationShowSizeChange
  }))) : null;

  var splitDataSource = _toConsumableArray(dataSource);

  if (pagination) {
    if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
      splitDataSource = _toConsumableArray(dataSource).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
    }
  }

  var screens = useBreakpoint();
  var currentBreakpoint = React.useMemo(function () {
    for (var i = 0; i < responsiveArray.length; i += 1) {
      var breakpoint = responsiveArray[i];

      if (screens[breakpoint]) {
        return breakpoint;
      }
    }

    return undefined;
  }, [screens]);
  var colStyle = React.useMemo(function () {
    if (!grid) {
      return undefined;
    }

    var columnCount = currentBreakpoint && grid[currentBreakpoint] ? grid[currentBreakpoint] : grid.column;

    if (columnCount) {
      return {
        width: "".concat(100 / columnCount, "%"),
        maxWidth: "".concat(100 / columnCount, "%")
      };
    }
  }, [grid === null || grid === void 0 ? void 0 : grid.column, currentBreakpoint]);
  var childrenContent = isLoading && /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 53
    }
  });

  if (splitDataSource.length > 0) {
    var items = splitDataSource.map(function (item, index) {
      return renderInnerItem(item, index);
    });
    var childrenList = React.Children.map(items, function (child, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: keys[index],
        style: colStyle
      }, child);
    });
    childrenContent = grid ? /*#__PURE__*/React.createElement(Row, {
      gutter: grid.gutter
    }, childrenList) : /*#__PURE__*/React.createElement("ul", {
      className: "".concat(prefixCls, "-items")
    }, items);
  } else if (!children && !isLoading) {
    childrenContent = renderEmptyFunc(prefixCls, renderEmpty);
  }

  var paginationPosition = paginationProps.position || 'bottom';
  return /*#__PURE__*/React.createElement(ListContext.Provider, {
    value: {
      grid: grid,
      itemLayout: itemLayout
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: classString
  }, rest), (paginationPosition === 'top' || paginationPosition === 'both') && paginationContent, header && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-header")
  }, header), /*#__PURE__*/React.createElement(Spin, loadingProp, childrenContent, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-footer")
  }, footer), loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent));
}

List.Item = Item;
export default List;