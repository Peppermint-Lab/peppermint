/**
 * Handle virtual list of the TreeNodes.
 */
import * as React from 'react';
import { FlattenNode, Key, DataEntity, ScrollTo } from './interface';
export declare const MOTION_KEY: string;
export declare const MotionEntity: DataEntity;
export interface NodeListRef {
    scrollTo: ScrollTo;
    getIndentWidth: () => number;
}
interface NodeListProps {
    prefixCls: string;
    style: React.CSSProperties;
    data: FlattenNode[];
    motion: any;
    focusable?: boolean;
    activeItem: FlattenNode;
    focused?: boolean;
    tabIndex: number;
    checkable?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    expandedKeys: Key[];
    selectedKeys: Key[];
    checkedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    halfCheckedKeys: Key[];
    keyEntities: Record<Key, DataEntity>;
    dragging: boolean;
    dragOverNodeKey: Key;
    dropPosition: number;
    height: number;
    itemHeight: number;
    virtual?: boolean;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onActiveChange: (key: Key) => void;
    onListChangeStart: () => void;
    onListChangeEnd: () => void;
}
/**
 * We only need get visible content items to play the animation.
 */
export declare function getMinimumRangeTransitionRange(list: FlattenNode[], virtual: boolean, height: number, itemHeight: number): FlattenNode[];
declare const NodeList: React.ForwardRefExoticComponent<NodeListProps & React.RefAttributes<NodeListRef>>;
export default NodeList;
