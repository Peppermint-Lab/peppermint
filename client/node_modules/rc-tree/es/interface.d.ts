import * as React from 'react';
import { TreeNodeProps } from './TreeNode';
export { ScrollTo } from 'rc-virtual-list/lib/List';
export interface DataNode {
    checkable?: boolean;
    children?: DataNode[];
    disabled?: boolean;
    disableCheckbox?: boolean;
    icon?: IconType;
    isLeaf?: boolean;
    key: string | number;
    title?: React.ReactNode;
    selectable?: boolean;
    switcherIcon?: IconType;
    /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
    className?: string;
    style?: React.CSSProperties;
}
export interface EventDataNode extends DataNode {
    expanded: boolean;
    selected: boolean;
    checked: boolean;
    loaded: boolean;
    loading: boolean;
    halfChecked: boolean;
    dragOver: boolean;
    dragOverGapTop: boolean;
    dragOverGapBottom: boolean;
    pos: string;
    active: boolean;
}
export declare type IconType = React.ReactNode | ((props: TreeNodeProps) => React.ReactNode);
export declare type Key = string | number;
export declare type NodeElement = React.ReactElement<TreeNodeProps> & {
    selectHandle?: HTMLSpanElement;
    type: {
        isTreeNode: boolean;
    };
};
export declare type NodeInstance = React.Component<TreeNodeProps> & {
    selectHandle?: HTMLSpanElement;
};
export interface Entity {
    node: NodeElement;
    index: number;
    key: Key;
    pos: string;
    parent?: Entity;
    children?: Entity[];
}
export interface DataEntity extends Omit<Entity, 'node' | 'parent' | 'children'> {
    node: DataNode;
    parent?: DataEntity;
    children?: DataEntity[];
    level: number;
}
export interface FlattenNode {
    parent: FlattenNode | null;
    children: FlattenNode[];
    pos: string;
    data: DataNode;
    isStart: boolean[];
    isEnd: boolean[];
}
export declare type GetKey<RecordType> = (record: RecordType, index?: number) => Key;
export declare type GetCheckDisabled<RecordType> = (record: RecordType) => boolean;
export declare type Direction = 'ltr' | 'rtl' | undefined;
