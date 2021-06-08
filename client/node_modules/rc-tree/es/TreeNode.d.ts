import * as React from 'react';
import { TreeContextProps } from './contextTypes';
import { IconType, Key, DataNode } from './interface';
export interface TreeNodeProps {
    eventKey?: Key;
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    expanded?: boolean;
    selected?: boolean;
    checked?: boolean;
    loaded?: boolean;
    loading?: boolean;
    halfChecked?: boolean;
    title?: React.ReactNode | ((data: DataNode) => React.ReactNode);
    dragOver?: boolean;
    dragOverGapTop?: boolean;
    dragOverGapBottom?: boolean;
    pos?: string;
    domRef?: React.Ref<HTMLDivElement>;
    /** New added in Tree for easy data access */
    data?: DataNode;
    isStart?: boolean[];
    isEnd?: boolean[];
    active?: boolean;
    onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
    isLeaf?: boolean;
    checkable?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    icon?: IconType;
    switcherIcon?: IconType;
    children?: React.ReactNode;
}
export interface InternalTreeNodeProps extends TreeNodeProps {
    context?: TreeContextProps;
}
export interface TreeNodeState {
    dragNodeHighlight: boolean;
}
declare class InternalTreeNode extends React.Component<InternalTreeNodeProps, TreeNodeState> {
    state: {
        dragNodeHighlight: boolean;
    };
    selectHandle: HTMLSpanElement;
    componentDidMount(): void;
    componentDidUpdate(): void;
    onSelectorClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onSelectorDoubleClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onSelect: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onCheck: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onMouseEnter: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onMouseLeave: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onExpand: React.MouseEventHandler<HTMLDivElement>;
    setSelectHandle: (node: any) => void;
    getNodeState: () => "close" | "open";
    hasChildren: () => boolean;
    isLeaf: () => boolean;
    isDisabled: () => boolean;
    isCheckable: () => {};
    syncLoadData: (props: any) => void;
    isSelectable(): boolean;
    renderSwitcherIconDom: (isLeaf: boolean) => any;
    renderSwitcher: () => JSX.Element;
    renderCheckbox: () => JSX.Element;
    renderIcon: () => JSX.Element;
    renderSelector: () => JSX.Element;
    renderDropIndicator: () => React.ReactNode;
    render(): JSX.Element;
}
declare const ContextTreeNode: React.FC<TreeNodeProps>;
export { InternalTreeNode };
export default ContextTreeNode;
