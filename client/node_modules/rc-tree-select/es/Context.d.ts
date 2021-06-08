import * as React from 'react';
import type { IconType } from 'rc-tree/lib/interface';
import type { Key, LegacyDataNode } from './interface';
interface ContextProps {
    checkable: boolean | React.ReactNode;
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    treeExpandedKeys: Key[];
    treeDefaultExpandedKeys: Key[];
    onTreeExpand: (keys: Key[]) => void;
    treeDefaultExpandAll: boolean;
    treeIcon: IconType;
    showTreeIcon: boolean;
    switcherIcon: IconType;
    treeLine: boolean;
    treeNodeFilterProp: string;
    treeLoadedKeys: Key[];
    treeMotion: any;
    loadData: (treeNode: LegacyDataNode) => Promise<unknown>;
    onTreeLoad: (loadedKeys: Key[]) => void;
}
export declare const SelectContext: React.Context<ContextProps>;
export {};
