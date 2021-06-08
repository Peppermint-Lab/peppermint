import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { getValue, updateValues } from '../utils/miscUtil';
import { getClosingViewDate, isSameYear, isSameMonth, isSameDecade } from '../utils/dateUtil';

function getStartEndDistance(startDate, endDate, picker, generateConfig) {
  var startNext = getClosingViewDate(startDate, picker, generateConfig, 1);

  function getDistance(compareFunc) {
    if (compareFunc(startDate, endDate)) {
      return 'same';
    }

    if (compareFunc(startNext, endDate)) {
      return 'closing';
    }

    return 'far';
  }

  switch (picker) {
    case 'year':
      return getDistance(function (start, end) {
        return isSameDecade(generateConfig, start, end);
      });

    case 'quarter':
    case 'month':
      return getDistance(function (start, end) {
        return isSameYear(generateConfig, start, end);
      });

    default:
      return getDistance(function (start, end) {
        return isSameMonth(generateConfig, start, end);
      });
  }
}

function getRangeViewDate(values, index, picker, generateConfig) {
  var startDate = getValue(values, 0);
  var endDate = getValue(values, 1);

  if (index === 0) {
    return startDate;
  }

  if (startDate && endDate) {
    var distance = getStartEndDistance(startDate, endDate, picker, generateConfig);

    switch (distance) {
      case 'same':
        return startDate;

      case 'closing':
        return startDate;

      default:
        return getClosingViewDate(endDate, picker, generateConfig, -1);
    }
  }

  return startDate;
}

export default function useRangeViewDates(_ref) {
  var values = _ref.values,
      picker = _ref.picker,
      defaultDates = _ref.defaultDates,
      generateConfig = _ref.generateConfig;

  var _React$useState = React.useState(function () {
    return [getValue(defaultDates, 0), getValue(defaultDates, 1)];
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      defaultViewDates = _React$useState2[0],
      setDefaultViewDates = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      viewDates = _React$useState4[0],
      setInternalViewDates = _React$useState4[1];

  var startDate = getValue(values, 0);
  var endDate = getValue(values, 1);

  function getViewDate(index) {
    // If set default view date, use it
    if (defaultViewDates[index]) {
      return defaultViewDates[index];
    }

    return getValue(viewDates, index) || getRangeViewDate(values, index, picker, generateConfig) || startDate || endDate || generateConfig.getNow();
  }

  function setViewDate(viewDate, index) {
    if (viewDate) {
      var newViewDates = updateValues(viewDates, viewDate, index); // Set view date will clean up default one

      setDefaultViewDates( // Should always be an array
      updateValues(defaultViewDates, null, index) || [null, null]); // Reset another one when not have value

      var anotherIndex = (index + 1) % 2;

      if (!getValue(values, anotherIndex)) {
        newViewDates = updateValues(newViewDates, viewDate, anotherIndex);
      }

      setInternalViewDates(newViewDates);
    } else if (startDate || endDate) {
      // Reset all when has values when `viewDate` is `null` which means from open trigger
      setInternalViewDates(null);
    }
  }

  return [getViewDate, setViewDate];
}