import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import classNames from 'classnames';
import DatePanel from '../DatePanel';
import { isSameWeek } from '../../utils/dateUtil';

function WeekPanel(props) {
  var prefixCls = props.prefixCls,
      generateConfig = props.generateConfig,
      locale = props.locale,
      value = props.value; // Render additional column

  var cellPrefixCls = "".concat(prefixCls, "-cell");

  var prefixColumn = function prefixColumn(date) {
    return /*#__PURE__*/React.createElement("td", {
      key: "week",
      className: classNames(cellPrefixCls, "".concat(cellPrefixCls, "-week"))
    }, generateConfig.locale.getWeek(locale.locale, date));
  }; // Add row className


  var rowPrefixCls = "".concat(prefixCls, "-week-panel-row");

  var rowClassName = function rowClassName(date) {
    return classNames(rowPrefixCls, _defineProperty({}, "".concat(rowPrefixCls, "-selected"), isSameWeek(generateConfig, locale.locale, value, date)));
  };

  return /*#__PURE__*/React.createElement(DatePanel, _extends({}, props, {
    panelName: "week",
    prefixColumn: prefixColumn,
    rowClassName: rowClassName,
    keyboardConfig: {
      onLeftRight: null
    }
  }));
}

export default WeekPanel;