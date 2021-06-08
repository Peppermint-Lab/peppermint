import * as React from 'react';
import { getRawValueLabeled } from '../utils/valueUtil';
import { formatStrategyKeys } from '../utils/strategyUtil';
/** Return  */

export default function useSelectValues(rawValues, _ref) {
  var value = _ref.value,
      getEntityByValue = _ref.getEntityByValue,
      getEntityByKey = _ref.getEntityByKey,
      treeConduction = _ref.treeConduction,
      showCheckedStrategy = _ref.showCheckedStrategy,
      conductKeyEntities = _ref.conductKeyEntities,
      getLabelProp = _ref.getLabelProp;
  return React.useMemo(function () {
    var mergedRawValues = rawValues;

    if (treeConduction) {
      var rawKeys = formatStrategyKeys(rawValues.map(function (val) {
        var entity = getEntityByValue(val);
        return entity ? entity.key : val;
      }), showCheckedStrategy, conductKeyEntities);
      mergedRawValues = rawKeys.map(function (key) {
        var entity = getEntityByKey(key);
        return entity ? entity.data.value : key;
      });
    }

    return getRawValueLabeled(mergedRawValues, value, getEntityByValue, getLabelProp);
  }, [rawValues, value, treeConduction, showCheckedStrategy, getEntityByValue]);
}