import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
var Record;

(function (Record) {
  Record[Record["None"] = 0] = "None";
  Record[Record["Start"] = 1] = "Start";
  Record[Record["End"] = 2] = "End";
})(Record || (Record = {}));

function traverseNodesKey(treeData, callback) {
  function processNode(dataNode) {
    var key = dataNode.key,
        children = dataNode.children;

    if (callback(key, dataNode) !== false) {
      traverseNodesKey(children || [], callback);
    }
  }

  treeData.forEach(processNode);
}
/** 计算选中范围，只考虑expanded情况以优化性能 */


export function calcRangeKeys(_ref) {
  var treeData = _ref.treeData,
      expandedKeys = _ref.expandedKeys,
      startKey = _ref.startKey,
      endKey = _ref.endKey;
  var keys = [];
  var record = Record.None;

  if (startKey && startKey === endKey) {
    return [startKey];
  }

  if (!startKey || !endKey) {
    return [];
  }

  function matchKey(key) {
    return key === startKey || key === endKey;
  }

  traverseNodesKey(treeData, function (key) {
    if (record === Record.End) {
      return false;
    }

    if (matchKey(key)) {
      // Match test
      keys.push(key);

      if (record === Record.None) {
        record = Record.Start;
      } else if (record === Record.Start) {
        record = Record.End;
        return false;
      }
    } else if (record === Record.Start) {
      // Append selection
      keys.push(key);
    }

    if (expandedKeys.indexOf(key) === -1) {
      return false;
    }

    return true;
  });
  return keys;
}
export function convertDirectoryKeysToNodes(treeData, keys) {
  var restKeys = _toConsumableArray(keys);

  var nodes = [];
  traverseNodesKey(treeData, function (key, node) {
    var index = restKeys.indexOf(key);

    if (index !== -1) {
      nodes.push(node);
      restKeys.splice(index, 1);
    }

    return !!restKeys.length;
  });
  return nodes;
}