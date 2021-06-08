import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import classNames from 'classnames';
import { supportRef } from "rc-util/es/ref";
import { getPathValue } from '../utils/valueUtil';

function isRenderCell(data) {
  return data && _typeof(data) === 'object' && !Array.isArray(data) && ! /*#__PURE__*/React.isValidElement(data);
}

function isRefComponent(component) {
  // String tag component also support ref
  if (typeof component === 'string') {
    return true;
  }

  return supportRef(component);
}

function Cell(_ref, ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      record = _ref.record,
      index = _ref.index,
      dataIndex = _ref.dataIndex,
      render = _ref.render,
      children = _ref.children,
      _ref$component = _ref.component,
      Component = _ref$component === void 0 ? 'td' : _ref$component,
      colSpan = _ref.colSpan,
      rowSpan = _ref.rowSpan,
      fixLeft = _ref.fixLeft,
      fixRight = _ref.fixRight,
      firstFixLeft = _ref.firstFixLeft,
      lastFixLeft = _ref.lastFixLeft,
      firstFixRight = _ref.firstFixRight,
      lastFixRight = _ref.lastFixRight,
      appendNode = _ref.appendNode,
      _ref$additionalProps = _ref.additionalProps,
      additionalProps = _ref$additionalProps === void 0 ? {} : _ref$additionalProps,
      ellipsis = _ref.ellipsis,
      align = _ref.align,
      rowType = _ref.rowType,
      isSticky = _ref.isSticky;
  var cellPrefixCls = "".concat(prefixCls, "-cell"); // ==================== Child Node ====================

  var cellProps;
  var childNode;

  if (children) {
    childNode = children;
  } else {
    var value = getPathValue(record, dataIndex); // Customize render node

    childNode = value;

    if (render) {
      var renderData = render(value, record, index);

      if (isRenderCell(renderData)) {
        childNode = renderData.children;
        cellProps = renderData.props;
      } else {
        childNode = renderData;
      }
    }
  } // Not crash if final `childNode` is not validate ReactNode


  if (_typeof(childNode) === 'object' && !Array.isArray(childNode) && ! /*#__PURE__*/React.isValidElement(childNode)) {
    childNode = null;
  }

  if (ellipsis && (lastFixLeft || firstFixRight)) {
    childNode = /*#__PURE__*/React.createElement("span", {
      className: "".concat(cellPrefixCls, "-content")
    }, childNode);
  }

  var _ref2 = cellProps || {},
      cellColSpan = _ref2.colSpan,
      cellRowSpan = _ref2.rowSpan,
      cellStyle = _ref2.style,
      cellClassName = _ref2.className,
      restCellProps = _objectWithoutProperties(_ref2, ["colSpan", "rowSpan", "style", "className"]);

  var mergedColSpan = cellColSpan !== undefined ? cellColSpan : colSpan;
  var mergedRowSpan = cellRowSpan !== undefined ? cellRowSpan : rowSpan;

  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  } // ====================== Fixed =======================


  var fixedStyle = {};
  var isFixLeft = typeof fixLeft === 'number';
  var isFixRight = typeof fixRight === 'number';

  if (isFixLeft) {
    fixedStyle.position = 'sticky';
    fixedStyle.left = fixLeft;
  }

  if (isFixRight) {
    fixedStyle.position = 'sticky';
    fixedStyle.right = fixRight;
  } // ====================== Align =======================


  var alignStyle = {};

  if (align) {
    alignStyle.textAlign = align;
  } // ====================== Render ======================


  var title;
  var ellipsisConfig = ellipsis === true ? {
    showTitle: true
  } : ellipsis;

  if (ellipsisConfig && (ellipsisConfig.showTitle || rowType === 'header')) {
    if (typeof childNode === 'string' || typeof childNode === 'number') {
      title = childNode.toString();
    } else if ( /*#__PURE__*/React.isValidElement(childNode) && typeof childNode.props.children === 'string') {
      title = childNode.props.children;
    }
  }

  var componentProps = _objectSpread(_objectSpread(_objectSpread({
    title: title
  }, restCellProps), additionalProps), {}, {
    colSpan: mergedColSpan && mergedColSpan !== 1 ? mergedColSpan : null,
    rowSpan: mergedRowSpan && mergedRowSpan !== 1 ? mergedRowSpan : null,
    className: classNames(cellPrefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left"), isFixLeft), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left-first"), firstFixLeft), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left-last"), lastFixLeft), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right"), isFixRight), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right-first"), firstFixRight), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right-last"), lastFixRight), _defineProperty(_classNames, "".concat(cellPrefixCls, "-ellipsis"), ellipsis), _defineProperty(_classNames, "".concat(cellPrefixCls, "-with-append"), appendNode), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-sticky"), (isFixLeft || isFixRight) && isSticky), _classNames), additionalProps.className, cellClassName),
    style: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, additionalProps.style), alignStyle), fixedStyle), cellStyle),
    ref: isRefComponent(Component) ? ref : null
  });

  return /*#__PURE__*/React.createElement(Component, componentProps, appendNode, childNode);
}

var RefCell = /*#__PURE__*/React.forwardRef(Cell);
RefCell.displayName = 'Cell';
var MemoCell = /*#__PURE__*/React.memo(RefCell, function (prev, next) {
  if (next.shouldCellUpdate) {
    return !next.shouldCellUpdate(next.record, prev.record);
  }

  return false;
});
export default MemoCell;