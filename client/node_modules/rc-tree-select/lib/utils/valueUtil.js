"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = toArray;
exports.findValueOption = findValueOption;
exports.isValueDisabled = isValueDisabled;
exports.isCheckDisabled = isCheckDisabled;
exports.flattenOptions = flattenOptions;
exports.filterOptions = filterOptions;
exports.getRawValueLabeled = getRawValueLabeled;
exports.addValue = addValue;
exports.removeValue = removeValue;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _treeUtil = require("rc-tree/lib/utils/treeUtil");

var _legacyUtil = require("./legacyUtil");

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return value !== undefined ? [value] : [];
}

function findValueOption(values, options) {
  var optionMap = new Map();
  options.forEach(function (flattenItem) {
    var data = flattenItem.data;
    optionMap.set(data.value, data);
  });
  return values.map(function (val) {
    return (0, _legacyUtil.fillLegacyProps)(optionMap.get(val));
  });
}

function isValueDisabled(value, options) {
  var option = findValueOption([value], options)[0];

  if (option) {
    return option.disabled;
  }

  return false;
}

function isCheckDisabled(node) {
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


function flattenOptions(options) {
  // Add missing key
  function fillKey(list) {
    return (list || []).map(function (node) {
      var value = node.value,
          key = node.key,
          children = node.children;
      var clone = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, node), {}, {
        key: 'key' in node ? key : value
      });

      if (children) {
        clone.children = fillKey(children);
      }

      return clone;
    });
  }

  var flattenList = (0, _treeUtil.flattenTreeData)(fillKey(options), true);
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


function filterOptions(searchValue, options, _ref2) {
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
      var match = keepAll || filterOptionFunc(searchValue, (0, _legacyUtil.fillLegacyProps)(dataNode));
      var childList = dig(children || [], match);

      if (match || childList.length) {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, dataNode), {}, {
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

function getRawValueLabeled(values, prevValue, getEntityByValue, getLabelProp) {
  var valueMap = new Map();
  toArray(prevValue).forEach(function (item) {
    if (item && (0, _typeof2.default)(item) === 'object' && 'value' in item) {
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

function addValue(rawValues, value) {
  var values = new Set(rawValues);
  values.add(value);
  return Array.from(values);
}

function removeValue(rawValues, value) {
  var values = new Set(rawValues);
  values.delete(value);
  return Array.from(values);
}