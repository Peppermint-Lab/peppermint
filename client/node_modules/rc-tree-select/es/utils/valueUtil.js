import _typeof from "@babel/runtime/helpers/esm/typeof";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { flattenTreeData } from "rc-tree/es/utils/treeUtil";
import { fillLegacyProps } from './legacyUtil';
export function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return value !== undefined ? [value] : [];
}
export function findValueOption(values, options) {
  var optionMap = new Map();
  options.forEach(function (flattenItem) {
    var data = flattenItem.data;
    optionMap.set(data.value, data);
  });
  return values.map(function (val) {
    return fillLegacyProps(optionMap.get(val));
  });
}
export function isValueDisabled(value, options) {
  var option = findValueOption([value], options)[0];

  if (option) {
    return option.disabled;
  }

  return false;
}
export function isCheckDisabled(node) {
  return node.disabled || node.disableCheckbox || node.checkable === false;
}

function getLevel(_ref) {
  var parent = _ref.parent;
  var level = 0;
  var current = parent;

  while (current) {
    current = current.parent;
    level += 1;
  }

  return level;
}
/**
 * Before reuse `rc-tree` logic, we need to add key since TreeSelect use `value` instead of `key`.
 */


export function flattenOptions(options) {
  // Add missing key
  function fillKey(list) {
    return (list || []).map(function (node) {
      var value = node.value,
          key = node.key,
          children = node.children;

      var clone = _objectSpread(_objectSpread({}, node), {}, {
        key: 'key' in node ? key : value
      });

      if (children) {
        clone.children = fillKey(children);
      }

      return clone;
    });
  }

  var flattenList = flattenTreeData(fillKey(options), true);
  return flattenList.map(function (node) {
    return {
      key: node.data.key,
      data: node.data,
      level: getLevel(node)
    };
  });
}

function getDefaultFilterOption(optionFilterProp) {
  return function (searchValue, dataNode) {
    var value = dataNode[optionFilterProp];
    return String(value).toLowerCase().includes(String(searchValue).toLowerCase());
  };
}
/** Filter options and return a new options by the search text */


export function filterOptions(searchValue, options, _ref2) {
  var optionFilterProp = _ref2.optionFilterProp,
      filterOption = _ref2.filterOption;

  if (filterOption === false) {
    return options;
  }

  var filterOptionFunc;

  if (typeof filterOption === 'function') {
    filterOptionFunc = filterOption;
  } else {
    filterOptionFunc = getDefaultFilterOption(optionFilterProp);
  }

  function dig(list) {
    var keepAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return list.map(function (dataNode) {
      var children = dataNode.children;
      var match = keepAll || filterOptionFunc(searchValue, fillLegacyProps(dataNode));
      var childList = dig(children || [], match);

      if (match || childList.length) {
        return _objectSpread(_objectSpread({}, dataNode), {}, {
          children: childList
        });
      }

      return null;
    }).filter(function (node) {
      return node;
    });
  }

  return dig(options);
}
export function getRawValueLabeled(values, prevValue, getEntityByValue, getLabelProp) {
  var valueMap = new Map();
  toArray(prevValue).forEach(function (item) {
    if (item && _typeof(item) === 'object' && 'value' in item) {
      valueMap.set(item.value, item);
    }
  });
  return values.map(function (val) {
    var item = {
      value: val
    };
    var entity = getEntityByValue(val, 'select', true);
    var label = entity ? getLabelProp(entity.data) : val;

    if (valueMap.has(val)) {
      var labeledValue = valueMap.get(val);
      item.label = 'label' in labeledValue ? labeledValue.label : label;

      if ('halfChecked' in labeledValue) {
        item.halfChecked = labeledValue.halfChecked;
      }
    } else {
      item.label = label;
    }

    return item;
  });
}
export function addValue(rawValues, value) {
  var values = new Set(rawValues);
  values.add(value);
  return Array.from(values);
}
export function removeValue(rawValues, value) {
  var values = new Set(rawValues);
  values.delete(value);
  return Array.from(values);
}