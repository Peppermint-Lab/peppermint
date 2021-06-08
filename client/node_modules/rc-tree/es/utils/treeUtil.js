import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import toArray from "rc-util/es/Children/toArray";
import warning from "rc-util/es/warning";
import { getPosition, isTreeNode } from '../util';
export function getKey(key, pos) {
  if (key !== null && key !== undefined) {
    return key;
  }

  return pos;
}
/**
 * Warning if TreeNode do not provides key
 */

export function warningWithoutKey() {
  var treeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var keys = new Map();

  function dig(list) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    (list || []).forEach(function (treeNode) {
      var key = treeNode.key,
          children = treeNode.children;
      warning(key !== null && key !== undefined, "Tree node must have a certain key: [".concat(path).concat(key, "]"));
      var recordKey = String(key);
      warning(!keys.has(recordKey) || key === null || key === undefined, "Same 'key' exist in the Tree: ".concat(recordKey));
      keys.set(recordKey, true);
      dig(children, "".concat(path).concat(recordKey, " > "));
    });
  }

  dig(treeData);
}
/**
 * Convert `children` of Tree into `treeData` structure.
 */

export function convertTreeToData(rootNodes) {
  function dig(node) {
    var treeNodes = toArray(node);
    return treeNodes.map(function (treeNode) {
      // Filter invalidate node
      if (!isTreeNode(treeNode)) {
        warning(!treeNode, 'Tree/TreeNode can only accept TreeNode as children.');
        return null;
      }

      var key = treeNode.key;

      var _treeNode$props = treeNode.props,
          children = _treeNode$props.children,
          rest = _objectWithoutProperties(_treeNode$props, ["children"]);

      var dataNode = _objectSpread({
        key: key
      }, rest);

      var parsedChildren = dig(children);

      if (parsedChildren.length) {
        dataNode.children = parsedChildren;
      }

      return dataNode;
    }).filter(function (dataNode) {
      return dataNode;
    });
  }

  return dig(rootNodes);
}
/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 * @param treeNodeList Origin data node list
 * @param expandedKeys
 * need expanded keys, provides `true` means all expanded (used in `rc-tree-select`).
 */

export function flattenTreeData() {
  var treeNodeList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var expandedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  var flattenList = [];

  function dig(list) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return list.map(function (treeNode, index) {
      var pos = getPosition(parent ? parent.pos : '0', index);
      var mergedKey = getKey(treeNode.key, pos); // Add FlattenDataNode into list

      var flattenNode = _objectSpread(_objectSpread({}, treeNode), {}, {
        parent: parent,
        pos: pos,
        children: null,
        data: treeNode,
        isStart: [].concat(_toConsumableArray(parent ? parent.isStart : []), [index === 0]),
        isEnd: [].concat(_toConsumableArray(parent ? parent.isEnd : []), [index === list.length - 1])
      });

      flattenList.push(flattenNode); // Loop treeNode children

      if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        flattenNode.children = dig(treeNode.children || [], flattenNode);
      } else {
        flattenNode.children = [];
      }

      return flattenNode;
    });
  }

  dig(treeNodeList);
  return flattenList;
}
/**
 * Traverse all the data by `treeData`.
 * Please not use it out of the `rc-tree` since we may refactor this code.
 */

export function traverseDataNodes(dataNodes, callback, // To avoid too many params, let use config instead of origin param
config) {
  // Init config
  var externalGetKey = null;
  var childrenPropName;

  var configType = _typeof(config);

  if (configType === 'function' || configType === 'string') {
    // Legacy getKey param
    externalGetKey = config;
  } else if (config && configType === 'object') {
    childrenPropName = config.childrenPropName;
    externalGetKey = config.externalGetKey;
  }

  childrenPropName = childrenPropName || 'children'; // Get keys

  var syntheticGetKey;

  if (externalGetKey) {
    if (typeof externalGetKey === 'string') {
      syntheticGetKey = function syntheticGetKey(node) {
        return node[externalGetKey];
      };
    } else if (typeof externalGetKey === 'function') {
      syntheticGetKey = function syntheticGetKey(node) {
        return externalGetKey(node);
      };
    }
  } else {
    syntheticGetKey = function syntheticGetKey(node, pos) {
      return getKey(node.key, pos);
    };
  } // Process


  function processNode(node, index, parent) {
    var children = node ? node[childrenPropName] : dataNodes;
    var pos = node ? getPosition(parent.pos, index) : '0'; // Process node if is not root

    if (node) {
      var key = syntheticGetKey(node, pos);
      var data = {
        node: node,
        index: index,
        pos: pos,
        key: key,
        parentPos: parent.node ? parent.pos : null,
        level: parent.level + 1
      };
      callback(data);
    } // Process children node


    if (children) {
      children.forEach(function (subNode, subIndex) {
        processNode(subNode, subIndex, {
          node: node,
          pos: pos,
          level: parent ? parent.level + 1 : -1
        });
      });
    }
  }

  processNode(null);
}
/**
 * Convert `treeData` into entity records.
 */

export function convertDataToEntities(dataNodes) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initWrapper = _ref.initWrapper,
      processEntity = _ref.processEntity,
      onProcessFinished = _ref.onProcessFinished,
      externalGetKey = _ref.externalGetKey,
      childrenPropName = _ref.childrenPropName;

  var
  /** @deprecated Use `config.externalGetKey` instead */
  legacyExternalGetKey = arguments.length > 2 ? arguments[2] : undefined;
  // Init config
  var mergedExternalGetKey = externalGetKey || legacyExternalGetKey;
  var posEntities = {};
  var keyEntities = {};
  var wrapper = {
    posEntities: posEntities,
    keyEntities: keyEntities
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseDataNodes(dataNodes, function (item) {
    var node = item.node,
        index = item.index,
        pos = item.pos,
        key = item.key,
        parentPos = item.parentPos,
        level = item.level;
    var entity = {
      node: node,
      index: index,
      key: key,
      pos: pos,
      level: level
    };
    var mergedKey = getKey(key, pos);
    posEntities[pos] = entity;
    keyEntities[mergedKey] = entity; // Fill children

    entity.parent = posEntities[parentPos];

    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  }, {
    externalGetKey: mergedExternalGetKey,
    childrenPropName: childrenPropName
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper;
}
/**
 * Get TreeNode props with Tree props.
 */

export function getTreeNodeProps(key, _ref2) {
  var expandedKeys = _ref2.expandedKeys,
      selectedKeys = _ref2.selectedKeys,
      loadedKeys = _ref2.loadedKeys,
      loadingKeys = _ref2.loadingKeys,
      checkedKeys = _ref2.checkedKeys,
      halfCheckedKeys = _ref2.halfCheckedKeys,
      dragOverNodeKey = _ref2.dragOverNodeKey,
      dropPosition = _ref2.dropPosition,
      keyEntities = _ref2.keyEntities;
  var entity = keyEntities[key];
  var treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    loaded: loadedKeys.indexOf(key) !== -1,
    loading: loadingKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
    halfChecked: halfCheckedKeys.indexOf(key) !== -1,
    pos: String(entity ? entity.pos : ''),
    // [Legacy] Drag props
    // Since the interaction of drag is changed, the semantic of the props are
    // not accuracy, I think it should be finally removed
    dragOver: dragOverNodeKey === key && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
  };
  return treeNodeProps;
}
export function convertNodePropsToEventData(props) {
  var data = props.data,
      expanded = props.expanded,
      selected = props.selected,
      checked = props.checked,
      loaded = props.loaded,
      loading = props.loading,
      halfChecked = props.halfChecked,
      dragOver = props.dragOver,
      dragOverGapTop = props.dragOverGapTop,
      dragOverGapBottom = props.dragOverGapBottom,
      pos = props.pos,
      active = props.active;

  var eventData = _objectSpread(_objectSpread({}, data), {}, {
    expanded: expanded,
    selected: selected,
    checked: checked,
    loaded: loaded,
    loading: loading,
    halfChecked: halfChecked,
    dragOver: dragOver,
    dragOverGapTop: dragOverGapTop,
    dragOverGapBottom: dragOverGapBottom,
    pos: pos,
    active: active
  });

  if (!('props' in eventData)) {
    Object.defineProperty(eventData, 'props', {
      get: function get() {
        warning(false, 'Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.');
        return props;
      }
    });
  }

  return eventData;
}