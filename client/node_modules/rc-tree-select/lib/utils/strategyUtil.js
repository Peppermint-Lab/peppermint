"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatStrategyKeys = formatStrategyKeys;
exports.SHOW_CHILD = exports.SHOW_PARENT = exports.SHOW_ALL = void 0;

var _valueUtil = require("./valueUtil");

var SHOW_ALL = 'SHOW_ALL';
exports.SHOW_ALL = SHOW_ALL;
var SHOW_PARENT = 'SHOW_PARENT';
exports.SHOW_PARENT = SHOW_PARENT;
var SHOW_CHILD = 'SHOW_CHILD';
exports.SHOW_CHILD = SHOW_CHILD;

function formatStrategyKeys(keys, strategy, keyEntities) {
  var keySet = new Set(keys);

  if (strategy === SHOW_CHILD) {
    return keys.filter(function (key) {
      var entity = keyEntities[key];

      if (entity && entity.children && entity.children.every(function (_ref) {
        var node = _ref.node;
        return (0, _valueUtil.isCheckDisabled)(node) || keySet.has(node.key);
      })) {
        return false;
      }

      return true;
    });
  }

  if (strategy === SHOW_PARENT) {
    return keys.filter(function (key) {
      var entity = keyEntities[key];
      var parent = entity ? entity.parent : null;

      if (parent && !(0, _valueUtil.isCheckDisabled)(parent.node) && keySet.has(parent.node.key)) {
        return false;
      }

      return true;
    });
  }

  return keys;
}