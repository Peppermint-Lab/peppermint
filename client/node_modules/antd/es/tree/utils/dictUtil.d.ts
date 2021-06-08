import { DataNode, Key } from 'rc-tree/lib/interface';
/** 计算选中范围，只考虑expanded情况以优化性能 */
export declare function calcRangeKeys({ treeData, expandedKeys, startKey, endKey, }: {
    treeData: DataNode[];
    expandedKeys: Key[];
    startKey?: Key;
    endKey?: Key;
}): Key[];
export declare function convertDirectoryKeysToNodes(treeData: DataNode[], keys: Key[]): DataNode[];
