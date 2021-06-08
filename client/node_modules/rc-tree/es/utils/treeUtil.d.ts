import * as React from 'react';
import { DataNode, FlattenNode, DataEntity, Key, EventDataNode, GetKey } from '../interface';
import { TreeNodeProps } from '../TreeNode';
export declare function getKey(key: Key, pos: string): Key;
/**
 * Warning if TreeNode do not provides key
 */
export declare function warningWithoutKey(treeData?: DataNode[]): void;
/**
 * Convert `children` of Tree into `treeData` structure.
 */
export declare function convertTreeToData(rootNodes: React.ReactNode): DataNode[];
/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 * @param treeNodeList Origin data node list
 * @param expandedKeys
 * need expanded keys, provides `true` means all expanded (used in `rc-tree-select`).
 */
export declare function flattenTreeData(treeNodeList?: DataNode[], expandedKeys?: Key[] | true): FlattenNode[];
declare type ExternalGetKey = GetKey<DataNode> | string;
interface TraverseDataNodesConfig {
    childrenPropName?: string;
    externalGetKey?: ExternalGetKey;
}
/**
 * Traverse all the data by `treeData`.
 * Please not use it out of the `rc-tree` since we may refactor this code.
 */
export declare function traverseDataNodes(dataNodes: DataNode[], callback: (data: {
    node: DataNode;
    index: number;
    pos: string;
    key: Key;
    parentPos: string | number;
    level: number;
}) => void, config?: TraverseDataNodesConfig | ExternalGetKey): void;
interface Wrapper {
    posEntities: Record<string, DataEntity>;
    keyEntities: Record<Key, DataEntity>;
}
/**
 * Convert `treeData` into entity records.
 */
export declare function convertDataToEntities(dataNodes: DataNode[], { initWrapper, processEntity, onProcessFinished, externalGetKey, childrenPropName, }?: {
    initWrapper?: (wrapper: Wrapper) => Wrapper;
    processEntity?: (entity: DataEntity, wrapper: Wrapper) => void;
    onProcessFinished?: (wrapper: Wrapper) => void;
    externalGetKey?: ExternalGetKey;
    childrenPropName?: string;
}, 
/** @deprecated Use `config.externalGetKey` instead */
legacyExternalGetKey?: ExternalGetKey): {
    posEntities: {};
    keyEntities: {};
};
export interface TreeNodeRequiredProps {
    expandedKeys: Key[];
    selectedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    dragOverNodeKey: Key;
    dropPosition: number;
    keyEntities: Record<Key, DataEntity>;
}
/**
 * Get TreeNode props with Tree props.
 */
export declare function getTreeNodeProps(key: Key, { expandedKeys, selectedKeys, loadedKeys, loadingKeys, checkedKeys, halfCheckedKeys, dragOverNodeKey, dropPosition, keyEntities, }: TreeNodeRequiredProps): {
    eventKey: Key;
    expanded: boolean;
    selected: boolean;
    loaded: boolean;
    loading: boolean;
    checked: boolean;
    halfChecked: boolean;
    pos: string;
    dragOver: boolean;
    dragOverGapTop: boolean;
    dragOverGapBottom: boolean;
};
export declare function convertNodePropsToEventData(props: TreeNodeProps): EventDataNode;
export {};
