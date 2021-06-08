import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";

/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import classNames from 'classnames';
import toArray from "rc-util/es/Children/toArray";
import ResponsiveObserve, { responsiveArray } from '../_util/responsiveObserve';
import devWarning from '../_util/devWarning';
import { ConfigContext } from '../config-provider';
import Row from './Row';
import DescriptionsItem from './Item';
import { cloneElement } from '../_util/reactNode';
export var DescriptionsContext = /*#__PURE__*/React.createContext({});
var DEFAULT_COLUMN_MAP = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};

function getColumn(column, screens) {
  if (typeof column === 'number') {
    return column;
  }

  if (_typeof(column) === 'object') {
    for (var i = 0; i < responsiveArray.length; i++) {
      var breakpoint = responsiveArray[i];

      if (screens[breakpoint] && column[breakpoint] !== undefined) {
        return column[breakpoint] || DEFAULT_COLUMN_MAP[breakpoint];
      }
    }
  }

  return 3;
}

function getFilledItem(node, span, rowRestCol) {
  var clone = node;

  if (span === undefined || span > rowRestCol) {
    clone = cloneElement(node, {
      span: rowRestCol
    });
    devWarning(span === undefined, 'Descriptions', 'Sum of column `span` in a line not match `column` of Descriptions.');
  }

  return clone;
}

function getRows(children, column) {
  var childNodes = toArray(children).filter(function (n) {
    return n;
  });
  var rows = [];
  var tmpRow = [];
  var rowRestCol = column;
  childNodes.forEach(function (node, index) {
    var _a;

    var span = (_a = node.props) === null || _a === void 0 ? void 0 : _a.span;
    var mergedSpan = span || 1; // Additional handle last one

    if (index === childNodes.length - 1) {
      tmpRow.push(getFilledItem(node, span, rowRestCol));
      rows.push(tmpRow);
      return;
    }

    if (mergedSpan < rowRestCol) {
      rowRestCol -= mergedSpan;
      tmpRow.push(node);
    } else {
      tmpRow.push(getFilledItem(node, mergedSpan, rowRestCol));
      rows.push(tmpRow);
      rowRestCol = column;
      tmpRow = [];
    }
  });
  return rows;
}

function Descriptions(_ref) {
  var _classNames;

  var customizePrefixCls = _ref.prefixCls,
      title = _ref.title,
      extra = _ref.extra,
      _ref$column = _ref.column,
      column = _ref$column === void 0 ? DEFAULT_COLUMN_MAP : _ref$column,
      _ref$colon = _ref.colon,
      colon = _ref$colon === void 0 ? true : _ref$colon,
      bordered = _ref.bordered,
      layout = _ref.layout,
      children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      size = _ref.size,
      labelStyle = _ref.labelStyle,
      contentStyle = _ref.contentStyle;

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('descriptions', customizePrefixCls);

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      screens = _React$useState2[0],
      setScreens = _React$useState2[1];

  var mergedColumn = getColumn(column, screens); // Responsive

  React.useEffect(function () {
    var token = ResponsiveObserve.subscribe(function (newScreens) {
      if (_typeof(column) !== 'object') {
        return;
      }

      setScreens(newScreens);
    });
    return function () {
      ResponsiveObserve.unsubscribe(token);
    };
  }, []); // Children

  var rows = getRows(children, mergedColumn);
  return /*#__PURE__*/React.createElement(DescriptionsContext.Provider, {
    value: {
      labelStyle: labelStyle,
      contentStyle: contentStyle
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size && size !== 'default'), _defineProperty(_classNames, "".concat(prefixCls, "-bordered"), !!bordered), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className),
    style: style
  }, (title || extra) && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-header")
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title), extra && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-extra")
  }, extra)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-view")
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, rows.map(function (row, index) {
    return /*#__PURE__*/React.createElement(Row, {
      key: index,
      index: index,
      colon: colon,
      prefixCls: prefixCls,
      vertical: layout === 'vertical',
      bordered: bordered,
      row: row
    });
  }))))));
}

Descriptions.Item = DescriptionsItem;
export default Descriptions;