import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import { fillRef } from "rc-util/es/ref";
import Header from './Header';
import ColGroup from '../ColGroup';
import TableContext from '../context/TableContext';

function useColumnWidth(colWidths, columCount) {
  return useMemo(function () {
    var cloneColumns = [];

    for (var i = 0; i < columCount; i += 1) {
      var val = colWidths[i];

      if (val !== undefined) {
        cloneColumns[i] = val;
      } else {
        return null;
      }
    }

    return cloneColumns;
  }, [colWidths.join('_'), columCount]);
}

var FixedHeader = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var noData = _ref.noData,
      columns = _ref.columns,
      flattenColumns = _ref.flattenColumns,
      colWidths = _ref.colWidths,
      columCount = _ref.columCount,
      stickyOffsets = _ref.stickyOffsets,
      direction = _ref.direction,
      fixHeader = _ref.fixHeader,
      offsetHeader = _ref.offsetHeader,
      stickyClassName = _ref.stickyClassName,
      onScroll = _ref.onScroll,
      maxContentScroll = _ref.maxContentScroll,
      props = _objectWithoutProperties(_ref, ["noData", "columns", "flattenColumns", "colWidths", "columCount", "stickyOffsets", "direction", "fixHeader", "offsetHeader", "stickyClassName", "onScroll", "maxContentScroll"]);

  var _React$useContext = React.useContext(TableContext),
      prefixCls = _React$useContext.prefixCls,
      scrollbarSize = _React$useContext.scrollbarSize,
      isSticky = _React$useContext.isSticky;

  var combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize; // Pass wheel to scroll event

  var scrollRef = React.useRef(null);
  var setScrollRef = React.useCallback(function (element) {
    fillRef(ref, element);
    fillRef(scrollRef, element);
  }, []);
  React.useEffect(function () {
    var _scrollRef$current;

    function onWheel(e) {
      var currentTarget = e.currentTarget,
          deltaX = e.deltaX;

      if (deltaX) {
        onScroll({
          currentTarget: currentTarget,
          scrollLeft: currentTarget.scrollLeft + deltaX
        });
        e.preventDefault();
      }
    }

    (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.addEventListener('wheel', onWheel);
    return function () {
      var _scrollRef$current2;

      (_scrollRef$current2 = scrollRef.current) === null || _scrollRef$current2 === void 0 ? void 0 : _scrollRef$current2.removeEventListener('wheel', onWheel);
    };
  }, []); // Check if all flattenColumns has width

  var allFlattenColumnsWithWidth = React.useMemo(function () {
    return flattenColumns.every(function (column) {
      return column.width >= 0;
    });
  }, [flattenColumns]); // Add scrollbar column

  var lastColumn = flattenColumns[flattenColumns.length - 1];
  var ScrollBarColumn = {
    fixed: lastColumn ? lastColumn.fixed : null,
    onHeaderCell: function onHeaderCell() {
      return {
        className: "".concat(prefixCls, "-cell-scrollbar")
      };
    }
  };
  var columnsWithScrollbar = useMemo(function () {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(columns), [ScrollBarColumn]) : columns;
  }, [combinationScrollBarSize, columns]);
  var flattenColumnsWithScrollbar = useMemo(function () {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [combinationScrollBarSize, flattenColumns]); // Calculate the sticky offsets

  var headerStickyOffsets = useMemo(function () {
    var right = stickyOffsets.right,
        left = stickyOffsets.left;
    return _objectSpread(_objectSpread({}, stickyOffsets), {}, {
      left: direction === 'rtl' ? [].concat(_toConsumableArray(left.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]) : left,
      right: direction === 'rtl' ? right : [].concat(_toConsumableArray(right.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]),
      isSticky: isSticky
    });
  }, [combinationScrollBarSize, stickyOffsets, isSticky]);
  var mergedColumnWidth = useColumnWidth(colWidths, columCount);
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      overflow: 'hidden'
    }, isSticky ? {
      top: offsetHeader
    } : {}),
    ref: setScrollRef,
    className: classNames("".concat(prefixCls, "-header"), _defineProperty({}, stickyClassName, !!stickyClassName))
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      tableLayout: 'fixed',
      visibility: noData || mergedColumnWidth ? null : 'hidden'
    }
  }, (!noData || !maxContentScroll || allFlattenColumnsWithWidth) && /*#__PURE__*/React.createElement(ColGroup, {
    colWidths: mergedColumnWidth ? [].concat(_toConsumableArray(mergedColumnWidth), [combinationScrollBarSize]) : [],
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), /*#__PURE__*/React.createElement(Header, _extends({}, props, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  }))));
});
FixedHeader.displayName = 'FixedHeader';
export default FixedHeader;