import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * Handle virtual list of the TreeNodes.
 */
import * as React from 'react';
import VirtualList from 'rc-virtual-list';
import MotionTreeNode from './MotionTreeNode';
import { findExpandedKeys, getExpandRange } from './utils/diffUtil';
import { getTreeNodeProps, getKey } from './utils/treeUtil';
var HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0
};

var noop = function noop() {};

export var MOTION_KEY = "RC_TREE_MOTION_".concat(Math.random());
var MotionNode = {
  key: MOTION_KEY
};
export var MotionEntity = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: '0',
  node: MotionNode
};
var MotionFlattenData = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MotionNode,

  /** Hold empty list here since we do not use it */
  isStart: [],
  isEnd: []
};
/**
 * We only need get visible content items to play the animation.
 */

export function getMinimumRangeTransitionRange(list, virtual, height, itemHeight) {
  if (virtual === false || !height) {
    return list;
  }

  return list.slice(0, Math.ceil(height / itemHeight) + 1);
}

function itemKey(item) {
  var key = item.data.key,
      pos = item.pos;
  return getKey(key, pos);
}

function getAccessibilityPath(item) {
  var path = String(item.data.key);
  var current = item;

  while (current.parent) {
    current = current.parent;
    path = "".concat(current.data.key, " > ").concat(path);
  }

  return path;
}

var RefNodeList = function RefNodeList(props, ref) {
  var prefixCls = props.prefixCls,
      data = props.data,
      selectable = props.selectable,
      checkable = props.checkable,
      expandedKeys = props.expandedKeys,
      selectedKeys = props.selectedKeys,
      checkedKeys = props.checkedKeys,
      loadedKeys = props.loadedKeys,
      loadingKeys = props.loadingKeys,
      halfCheckedKeys = props.halfCheckedKeys,
      keyEntities = props.keyEntities,
      disabled = props.disabled,
      dragging = props.dragging,
      dragOverNodeKey = props.dragOverNodeKey,
      dropPosition = props.dropPosition,
      motion = props.motion,
      height = props.height,
      itemHeight = props.itemHeight,
      virtual = props.virtual,
      focusable = props.focusable,
      activeItem = props.activeItem,
      focused = props.focused,
      tabIndex = props.tabIndex,
      onKeyDown = props.onKeyDown,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      onActiveChange = props.onActiveChange,
      onListChangeStart = props.onListChangeStart,
      onListChangeEnd = props.onListChangeEnd,
      domProps = _objectWithoutProperties(props, ["prefixCls", "data", "selectable", "checkable", "expandedKeys", "selectedKeys", "checkedKeys", "loadedKeys", "loadingKeys", "halfCheckedKeys", "keyEntities", "disabled", "dragging", "dragOverNodeKey", "dropPosition", "motion", "height", "itemHeight", "virtual", "focusable", "activeItem", "focused", "tabIndex", "onKeyDown", "onFocus", "onBlur", "onActiveChange", "onListChangeStart", "onListChangeEnd"]); // =============================== Ref ================================


  var listRef = React.useRef(null);
  var indentMeasurerRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    return {
      scrollTo: function scrollTo(scroll) {
        listRef.current.scrollTo(scroll);
      },
      getIndentWidth: function getIndentWidth() {
        return indentMeasurerRef.current.offsetWidth;
      }
    };
  }); // ============================== Motion ==============================

  var _React$useState = React.useState(expandedKeys),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      prevExpandedKeys = _React$useState2[0],
      setPrevExpandedKeys = _React$useState2[1];

  var _React$useState3 = React.useState(data),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      prevData = _React$useState4[0],
      setPrevData = _React$useState4[1];

  var _React$useState5 = React.useState(data),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      transitionData = _React$useState6[0],
      setTransitionData = _React$useState6[1];

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      transitionRange = _React$useState8[0],
      setTransitionRange = _React$useState8[1];

  var _React$useState9 = React.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      motionType = _React$useState10[0],
      setMotionType = _React$useState10[1];

  function onMotionEnd() {
    setPrevData(data);
    setTransitionData(data);
    setTransitionRange([]);
    setMotionType(null);
    onListChangeEnd();
  } // Do animation if expanded keys changed


  React.useEffect(function () {
    setPrevExpandedKeys(expandedKeys);
    var diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);

    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        var keyIndex = prevData.findIndex(function (_ref) {
          var key = _ref.data.key;
          return key === diffExpanded.key;
        });
        var rangeNodes = getMinimumRangeTransitionRange(getExpandRange(prevData, data, diffExpanded.key), virtual, height, itemHeight);
        var newTransitionData = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
        setMotionType('show');
      } else {
        var _keyIndex = data.findIndex(function (_ref2) {
          var key = _ref2.data.key;
          return key === diffExpanded.key;
        });

        var _rangeNodes = getMinimumRangeTransitionRange(getExpandRange(data, prevData, diffExpanded.key), virtual, height, itemHeight);

        var _newTransitionData = data.slice();

        _newTransitionData.splice(_keyIndex + 1, 0, MotionFlattenData);

        setTransitionData(_newTransitionData);
        setTransitionRange(_rangeNodes);
        setMotionType('hide');
      }
    } else if (prevData !== data) {
      // If whole data changed, we just refresh the list
      setPrevData(data);
      setTransitionData(data);
    }
  }, [expandedKeys, data]); // We should clean up motion if is changed by dragging

  React.useEffect(function () {
    if (!dragging) {
      onMotionEnd();
    }
  }, [dragging]);
  var mergedData = motion ? transitionData : data;
  var treeNodeRequiredProps = {
    expandedKeys: expandedKeys,
    selectedKeys: selectedKeys,
    loadedKeys: loadedKeys,
    loadingKeys: loadingKeys,
    checkedKeys: checkedKeys,
    halfCheckedKeys: halfCheckedKeys,
    dragOverNodeKey: dragOverNodeKey,
    dropPosition: dropPosition,
    keyEntities: keyEntities
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, focused && activeItem && /*#__PURE__*/React.createElement("span", {
    style: HIDDEN_STYLE,
    "aria-live": "assertive"
  }, getAccessibilityPath(activeItem)), /*#__PURE__*/React.createElement("div", {
    role: "tree"
  }, /*#__PURE__*/React.createElement("input", {
    style: HIDDEN_STYLE,
    disabled: focusable === false || disabled,
    tabIndex: focusable !== false ? tabIndex : null,
    onKeyDown: onKeyDown,
    onFocus: onFocus,
    onBlur: onBlur,
    value: "",
    onChange: noop
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-treenode"),
    "aria-hidden": true,
    style: {
      position: 'absolute',
      pointerEvents: 'none',
      visibility: 'hidden',
      height: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-indent")
  }, /*#__PURE__*/React.createElement("div", {
    ref: indentMeasurerRef,
    className: "".concat(prefixCls, "-indent-unit")
  }))), /*#__PURE__*/React.createElement(VirtualList, _extends({}, domProps, {
    data: mergedData,
    itemKey: itemKey,
    height: height,
    fullHeight: false,
    virtual: virtual,
    itemHeight: itemHeight,
    prefixCls: "".concat(prefixCls, "-list"),
    ref: listRef
  }), function (treeNode) {
    var pos = treeNode.pos,
        _treeNode$data = treeNode.data,
        key = _treeNode$data.key,
        restProps = _objectWithoutProperties(_treeNode$data, ["key"]),
        isStart = treeNode.isStart,
        isEnd = treeNode.isEnd;

    var mergedKey = getKey(key, pos);
    delete restProps.children;
    var treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);
    return /*#__PURE__*/React.createElement(MotionTreeNode, _extends({}, restProps, treeNodeProps, {
      active: !!activeItem && key === activeItem.data.key,
      pos: pos,
      data: treeNode.data,
      isStart: isStart,
      isEnd: isEnd,
      motion: motion,
      motionNodes: key === MOTION_KEY ? transitionRange : null,
      motionType: motionType,
      onMotionStart: onListChangeStart,
      onMotionEnd: onMotionEnd,
      treeNodeRequiredProps: treeNodeRequiredProps,
      onMouseMove: function onMouseMove() {
        onActiveChange(null);
      }
    }));
  }));
};

var NodeList = /*#__PURE__*/React.forwardRef(RefNodeList);
NodeList.displayName = 'NodeList';
export default NodeList;