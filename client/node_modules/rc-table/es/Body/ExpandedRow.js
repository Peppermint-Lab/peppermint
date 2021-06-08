import * as React from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext';

function ExpandedRow(_ref) {
  var prefixCls = _ref.prefixCls,
      children = _ref.children,
      Component = _ref.component,
      cellComponent = _ref.cellComponent,
      fixHeader = _ref.fixHeader,
      fixColumn = _ref.fixColumn,
      horizonScroll = _ref.horizonScroll,
      className = _ref.className,
      expanded = _ref.expanded,
      componentWidth = _ref.componentWidth,
      colSpan = _ref.colSpan;

  var _React$useContext = React.useContext(TableContext),
      scrollbarSize = _React$useContext.scrollbarSize; // Cache render node


  return React.useMemo(function () {
    var contentNode = children;

    if (fixColumn) {
      contentNode = /*#__PURE__*/React.createElement("div", {
        style: {
          width: componentWidth - (fixHeader ? scrollbarSize : 0),
          position: 'sticky',
          left: 0,
          overflow: 'hidden'
        },
        className: "".concat(prefixCls, "-expanded-row-fixed")
      }, contentNode);
    }

    return /*#__PURE__*/React.createElement(Component, {
      className: className,
      style: {
        display: expanded ? null : 'none'
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      component: cellComponent,
      prefixCls: prefixCls,
      colSpan: colSpan
    }, contentNode));
  }, [children, Component, fixHeader, horizonScroll, className, expanded, componentWidth, colSpan, scrollbarSize]);
}

export default ExpandedRow;