import * as React from 'react';
/**
 * Return cached Key Value map with DataNode.
 * Only re-calculate when `flattenOptions` changed.
 */

export default function useKeyValueMap(flattenOptions) {
  return React.useMemo(function () {
    var cacheKeyMap = new Map();
    var cacheValueMap = new Map(); // Cache options by key

    flattenOptions.forEach(function (dataNode) {
      cacheKeyMap.set(dataNode.key, dataNode);
      cacheValueMap.set(dataNode.data.value, dataNode);
    });
    return [cacheKeyMap, cacheValueMap];
  }, [flattenOptions]);
}