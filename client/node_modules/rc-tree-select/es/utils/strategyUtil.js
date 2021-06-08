import { isCheckDisabled } from './valueUtil';
export var SHOW_ALL = 'SHOW_ALL';
export var SHOW_PARENT = 'SHOW_PARENT';
export var SHOW_CHILD = 'SHOW_CHILD';
export function formatStrategyKeys(keys, strategy, keyEntities) {
  var keySet = new Set(keys);

  if (strategy === SHOW_CHILD) {
    return keys.filter(function (key) {
      var entity = keyEntities[key];

      if (entity && entity.children && entity.children.every(function (_ref) {
        var node = _ref.node;
        return isCheckDisabled(node) || keySet.has(node.key);
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

      if (parent && !isCheckDisabled(parent.node) && keySet.has(parent.node.key)) {
        return false;
      }

      return true;
    });
  }

  return keys;
}