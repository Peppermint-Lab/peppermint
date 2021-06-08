import * as React from 'react';
export default function useCacheOptions(options) {
  var prevOptionMapRef = React.useRef(null);
  var optionMap = React.useMemo(function () {
    var map = new Map();
    options.forEach(function (item) {
      var value = item.data.value;
      map.set(value, item);
    });
    return map;
  }, [options]);
  prevOptionMapRef.current = optionMap;

  var getValueOption = function getValueOption(vals) {
    return vals.map(function (value) {
      return prevOptionMapRef.current.get(value);
    }).filter(Boolean);
  };

  return getValueOption;
}