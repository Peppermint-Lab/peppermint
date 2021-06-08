/**
 * Legacy code. Should avoid to use if you are new to import these code.
 */
import React from 'react';
import { TreeNodeProps } from './TreeNode';
import { NodeElement, Key, DataNode, DataEntity, NodeInstance, FlattenNode, Direction } from './interface';
import { TreeProps, AllowDrop } from './Tree';
export declare function arrDel(list: Key[], value: Key): Key[];
export declare function arrAdd(list: Key[], value: Key): Key[];
export declare function posToArr(pos: string): string[];
export declare function getPosition(level: string | number, index: number): string;
export declare function isTreeNode(node: NodeElement): boolean;
export declare function getDragChildrenKeys(dragNodeKey: Key, keyEntities: Record<Key, DataEntity>): Key[];
export declare function isLastChild(treeNodeEntity: DataEntity): boolean;
export declare function isFirstChild(treeNodeEntity: DataEntity): boolean;
export declare function calcDropPosition(event: React.MouseEvent, dragNode: NodeInstance, targetNode: NodeInstance, indent: number, startMousePosition: {
    x: number;
    y: number;
}, allowDrop: AllowDrop, flattenedNodes: FlattenNode[], keyEntities: Record<Key, DataEntity>, expandKeys: Key[], direction: Direction): {
    dropPosition: -1 | 0 | 1;
    dropLevelOffset: number;
    dropTargetKey: Key;
    dropTargetPos: string;
    dropContainerKey: Key;
    dragOverNodeKey: Key;
    dropAllowed: boolean;
};
/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */
export declare function calcSelectedKeys(selectedKeys: Key[], props: TreeProps): Key[];
export declare function convertDataToTree(treeData: DataNode[], processor?: {
    processProps: (prop: DataNode) => any;
}): NodeElement[];
/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */
export declare function parseCheckedKeys(keys: Key[] | {
    checked: Key[];
    halfChecked: Key[];
}): any;
/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */
export declare function conductExpandParent(keyList: Key[], keyEntities: Record<Key, DataEntity>): Key[];
/**
 * Returns only the data- and aria- key/value pairs
 */
export declare function getDataAndAria(props: Partial<TreeProps | TreeNodeProps>): Record<string, string>;
