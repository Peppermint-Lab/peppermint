"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Cell = _interopRequireDefault(require("../Cell"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

var _BodyContext = _interopRequireDefault(require("../context/BodyContext"));

var _valueUtil = require("../utils/valueUtil");

var _ExpandedRow = _interopRequireDefault(require("./ExpandedRow"));

function BodyRow(props) {
  var className = props.className,
      style = props.style,
      record = props.record,
      index = props.index,
      rowKey = props.rowKey,
      getRowKey = props.getRowKey,
      rowExpandable = props.rowExpandable,
      expandedKeys = props.expandedKeys,
      onRow = props.onRow,
      _props$indent = props.indent,
      indent = _props$indent === void 0 ? 0 : _props$indent,
      RowComponent = props.rowComponent,
      cellComponent = props.cellComponent,
      childrenColumnName = props.childrenColumnName;

  var _React$useContext = React.useContext(_TableContext.default),
      prefixCls = _React$useContext.prefixCls,
      fixedInfoList = _React$useContext.fixedInfoList;

  var _React$useContext2 = React.useContext(_BodyContext.default),
      fixHeader = _React$useContext2.fixHeader,
      fixColumn = _React$useContext2.fixColumn,
      horizonScroll = _React$useContext2.horizonScroll,
      componentWidth = _React$useContext2.componentWidth,
      flattenColumns = _React$useContext2.flattenColumns,
      expandableType = _React$useContext2.expandableType,
      expandRowByClick = _React$useContext2.expandRowByClick,
      onTriggerExpand = _React$useContext2.onTriggerExpand,
      rowClassName = _React$useContext2.rowClassName,
      expandedRowClassName = _React$useContext2.expandedRowClassName,
      indentSize = _React$useContext2.indentSize,
      expandIcon = _React$useContext2.expandIcon,
      expandedRowRender = _React$useContext2.expandedRowRender,
      expandIconColumnIndex = _React$useContext2.expandIconColumnIndex;

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      expandRended = _React$useState2[0],
      setExpandRended = _React$useState2[1];

  var expanded = expandedKeys && expandedKeys.has(props.recordKey);
  React.useEffect(function () {
    if (expanded) {
      setExpandRended(true);
    }
  }, [expanded]);
  var rowSupportExpand = expandableType === 'row' && (!rowExpandable || rowExpandable(record)); // Only when row is not expandable and `children` exist in record

  var nestExpandable = expandableType === 'nest';
  var hasNestChildren = childrenColumnName && record && record[childrenColumnName];
  var mergedExpandable = rowSupportExpand || nestExpandable; // =========================== onRow ===========================

  var additionalProps;

  if (onRow) {
    additionalProps = onRow(record, index);
  }

  var onClick = function onClick(event) {
    if (expandRowByClick && mergedExpandable) {
      onTriggerExpand(record, event);
    }

    if (additionalProps && additionalProps.onClick) {
      var _additionalProps;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_additionalProps = additionalProps).onClick.apply(_additionalProps, [event].concat(args));
    }
  }; // ======================== Base tr row ========================


  var computeRowClassName;

  if (typeof rowClassName === 'string') {
    computeRowClassName = rowClassName;
  } else if (typeof rowClassName === 'function') {
    computeRowClassName = rowClassName(record, index, indent);
  }

  var columnsKey = (0, _valueUtil.getColumnsKey)(flattenColumns);
  var baseRowNode = /*#__PURE__*/React.createElement(RowComponent, (0, _extends2.default)({}, additionalProps, {
    "data-row-key": rowKey,
    className: (0, _classnames.default)(className, "".concat(prefixCls, "-row"), "".concat(prefixCls, "-row-level-").concat(indent), computeRowClassName, additionalProps && additionalProps.className),
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), additionalProps ? additionalProps.style : null),
    onClick: onClick
  }), flattenColumns.map(function (column, colIndex) {
    var render = column.render,
        dataIndex = column.dataIndex,
        columnClassName = column.className;
    var key = columnsKey[colIndex];
    var fixedInfo = fixedInfoList[colIndex]; // ============= Used for nest expandable =============

    var appendCellNode;

    if (colIndex === (expandIconColumnIndex || 0) && nestExpandable) {
      appendCellNode = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          paddingLeft: "".concat(indentSize * indent, "px")
        },
        className: "".concat(prefixCls, "-row-indent indent-level-").concat(indent)
      }), expandIcon({
        prefixCls: prefixCls,
        expanded: expanded,
        expandable: hasNestChildren,
        record: record,
        onExpand: onTriggerExpand
      }));
    }

    var additionalCellProps;

    if (column.onCell) {
      additionalCellProps = column.onCell(record, index);
    }

    return /*#__PURE__*/React.createElement(_Cell.default, (0, _extends2.default)({
      className: columnClassName,
      ellipsis: column.ellipsis,
      align: column.align,
      component: cellComponent,
      prefixCls: prefixCls,
      key: key,
      record: record,
      index: index,
      dataIndex: dataIndex,
      render: render,
      shouldCellUpdate: column.shouldCellUpdate
    }, fixedInfo, {
      appendNode: appendCellNode,
      additionalProps: additionalCellProps
    }));
  })); // ======================== Expand Row =========================

  var expandRowNode;

  if (rowSupportExpand && (expandRended || expanded)) {
    var expandContent = expandedRowRender(record, index, indent + 1, expanded);
    var computedExpandedRowClassName = expandedRowClassName && expandedRowClassName(record, index, indent);
    expandRowNode = /*#__PURE__*/React.createElement(_ExpandedRow.default, {
      expanded: expanded,
      className: (0, _classnames.default)("".concat(prefixCls, "-expanded-row"), "".concat(prefixCls, "-expanded-row-level-").concat(indent + 1), computedExpandedRowClassName),
      prefixCls: prefixCls,
      fixHeader: fixHeader,
      fixColumn: fixColumn,
      horizonScroll: horizonScroll,
      component: RowComponent,
      componentWidth: componentWidth,
      cellComponent: cellComponent,
      colSpan: flattenColumns.length
    }, expandContent);
  } // ========================= Nest Row ==========================


  var nestRowNode;

  if (hasNestChildren && expanded) {
    nestRowNode = (record[childrenColumnName] || []).map(function (subRecord, subIndex) {
      var subKey = getRowKey(subRecord, subIndex);
      return /*#__PURE__*/React.createElement(BodyRow, (0, _extends2.default)({}, props, {
        key: subKey,
        rowKey: subKey,
        record: subRecord,
        recordKey: subKey,
        index: subIndex,
        indent: indent + 1
      }));
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, baseRowNode, expandRowNode, nestRowNode);
}

BodyRow.displayName = 'BodyRow';
var _default = BodyRow;
exports.default = _default;