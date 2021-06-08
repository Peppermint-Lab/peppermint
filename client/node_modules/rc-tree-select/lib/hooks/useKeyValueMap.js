"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useKeyValueMap;

var React = _interopRequireWildcard(require("react"));

/**
 * Return cached Key Value map with DataNode.
 * Only re-calculate when `flattenOptions` changed.
 */
function useKeyValueMap(flattenOptions) {
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