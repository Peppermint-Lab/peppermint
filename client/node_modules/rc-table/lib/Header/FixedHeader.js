"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ref2 = require("rc-util/lib/ref");

var _Header = _interopRequireDefault(require("./Header"));

var _ColGroup = _interopRequireDefault(require("../ColGroup"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

function useColumnWidth(colWidths, columCount) {
  return (0, React.useMemo)(function () {
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
      props = (0, _objectWithoutProperties2.default)(_ref, ["noData", "columns", "flattenColumns", "colWidths", "columCount", "stickyOffsets", "direction", "fixHeader", "offsetHeader", "stickyClassName", "onScroll", "maxContentScroll"]);

  var _React$useContext = React.useContext(_TableContext.default),
      prefixCls = _React$useContext.prefixCls,
      scrollbarSize = _React$useContext.scrollbarSize,
      isSticky = _React$useContext.isSticky;

  var combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize; // Pass wheel to scroll event

  var scrollRef = React.useRef(null);
  var setScrollRef = React.useCallback(function (element) {
    (0, _ref2.fillRef)(ref, element);
    (0, _ref2.fillRef)(scrollRef, element);
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
  var columnsWithScrollbar = (0, React.useMemo)(function () {
    return combinationScrollBarSize ? [].concat((0, _toConsumableArray2.default)(columns), [ScrollBarColumn]) : columns;
  }, [combinationScrollBarSize, columns]);
  var flattenColumnsWithScrollbar = (0, React.useMemo)(function () {
    return combinationScrollBarSize ? [].concat((0, _toConsumableArray2.default)(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [combinationScrollBarSize, flattenColumns]); // Calculate the sticky offsets

  var headerStickyOffsets = (0, React.useMemo)(function () {
    var right = stickyOffsets.right,
        left = stickyOffsets.left;
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, stickyOffsets), {}, {
      left: direction === 'rtl' ? [].concat((0, _toConsumableArray2.default)(left.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]) : left,
      right: direction === 'rtl' ? right : [].concat((0, _toConsumableArray2.default)(right.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]),
      isSticky: isSticky
    });
  }, [combinationScrollBarSize, stickyOffsets, isSticky]);
  var mergedColumnWidth = useColumnWidth(colWidths, columCount);
  return /*#__PURE__*/React.createElement("div", {
    style: (0, _objectSpread2.default)({
      overflow: 'hidden'
    }, isSticky ? {
      top: offsetHeader
    } : {}),
    ref: setScrollRef,
    className: (0, _classnames.default)("".concat(prefixCls, "-header"), (0, _defineProperty2.default)({}, stickyClassName, !!stickyClassName))
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      tableLayout: 'fixed',
      visibility: noData || mergedColumnWidth ? null : 'hidden'
    }
  }, (!noData || !maxContentScroll || allFlattenColumnsWithWidth) && /*#__PURE__*/React.createElement(_ColGroup.default, {
    colWidths: mergedColumnWidth ? [].concat((0, _toConsumableArray2.default)(mergedColumnWidth), [combinationScrollBarSize]) : [],
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), /*#__PURE__*/React.createElement(_Header.default, (0, _extends2.default)({}, props, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  }))));
});
FixedHeader.displayName = 'FixedHeader';
var _default = FixedHeader;
exports.default = _default;