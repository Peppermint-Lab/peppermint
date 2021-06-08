import * as React from 'react';
import { NodeMouseEventHandler, NodeDragEventHandler, NodeDragEventParams, NodeMouseEventParams } from './contextTypes';
import { DataNode, IconType, Key, FlattenNode, DataEntity, EventDataNode, NodeInstance, ScrollTo, Direction } from './interface';
import { NodeListRef } from './NodeList';
import DropIndicator from './DropIndicator';
interface CheckInfo {
    event: 'check';
    node: EventDataNode;
    checked: boolean;
    nativeEvent: MouseEvent;
    checkedNodes: DataNode[];
    checkedNodesPositions?: {
        node: DataNode;
        pos: string;
    }[];
    halfCheckedKeys?: Key[];
}
export declare type AllowDrop = (options: {
    dropNode: DataNode;
    dropPosition: -1 | 0 | 1;
}) => boolean;
export interface TreeProps {
    prefixCls: string;
    className?: string;
    style?: React.CSSProperties;
    focusable?: boolean;
    tabIndex?: number;
    children?: React.ReactNode;
    treeData?: DataNode[];
    showLine?: boolean;
    showIcon?: boolean;
    icon?: IconType;
    selectable?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    checkable?: boolean | React.ReactNode;
    checkStrictly?: boolean;
    draggable?: ((node: DataNode) => boolean) | boolean;
    defaultExpandParent?: boolean;
    autoExpandParent?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: Key[];
    expandedKeys?: Key[];
    defaultCheckedKeys?: Key[];
    checkedKeys?: Key[] | {
        checked: Key[];
        halfChecked: Key[];
    };
    defaultSelectedKeys?: Key[];
    selectedKeys?: Key[];
    allowDrop?: AllowDrop;
    titleRender?: (node: DataNode) => React.ReactNode;
    dropIndicatorRender?: (props: {
        dropPosition: -1 | 0 | 1;
        dropLevelOffset: number;
        indent: number;
        prefixCls: string;
        direction: Direction;
    }) => React.ReactNode;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: NodeMouseEventHandler;
    onDoubleClick?: NodeMouseEventHandler;
    onExpand?: (expandedKeys: Key[], info: {
        node: EventDataNode;
        expanded: boolean;
        nativeEvent: MouseEvent;
    }) => void;
    onCheck?: (checked: {
        checked: Key[];
        halfChecked: Key[];
    } | Key[], info: CheckInfo) => void;
    onSelect?: (selectedKeys: Key[], info: {
        event: 'select';
        selected: boolean;
        node: EventDataNode;
        selectedNodes: DataNode[];
        nativeEvent: MouseEvent;
    }) => void;
    onLoad?: (loadedKeys: Key[], info: {
        event: 'load';
        node: EventDataNode;
    }) => void;
    loadData?: (treeNode: EventDataNode) => Promise<void>;
    loadedKeys?: Key[];
    onMouseEnter?: (info: NodeMouseEventParams) => void;
    onMouseLeave?: (info: NodeMouseEventParams) => void;
    onRightClick?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onDragStart?: (info: NodeDragEventParams) => void;
    onDragEnter?: (info: NodeDragEventParams & {
        expandedKeys: Key[];
    }) => void;
    onDragOver?: (info: NodeDragEventParams) => void;
    onDragLeave?: (info: NodeDragEventParams) => void;
    onDragEnd?: (info: NodeDragEventParams) => void;
    onDrop?: (info: NodeDragEventParams & {
        dragNode: EventDataNode;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
    }) => void;
    /**
     * Used for `rc-tree-select` only.
     * Do not use in your production code directly since this will be refactor.
     */
    onActiveChange?: (key: Key) => void;
    filterTreeNode?: (treeNode: EventDataNode) => boolean;
    motion?: any;
    switcherIcon?: IconType;
    height?: number;
    itemHeight?: number;
    virtual?: boolean;
    direction?: Direction;
}
interface TreeState {
    keyEntities: Record<Key, DataEntity>;
    indent: number | null;
    selectedKeys: Key[];
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    expandedKeys: Key[];
    dragging: boolean;
    dragChildrenKeys: Key[];
    dropPosition: -1 | 0 | 1 | null;
    dropLevelOffset: number | null;
    dropContainerKey: Key | null;
    dropTargetKey: Key | null;
    dropTargetPos: string | null;
    dropAllowed: boolean;
    dragOverNodeKey: Key | null;
    treeData: DataNode[];
    flattenNodes: FlattenNode[];
    focused: boolean;
    activeKey: Key;
    listChanging: boolean;
    prevProps: TreeProps;
}
declare class Tree extends React.Component<TreeProps, TreeState> {
    static defaultProps: {
        prefixCls: string;
        showLine: boolean;
        showIcon: boolean;
        selectable: boolean;
        multiple: boolean;
        checkable: boolean;
        disabled: boolean;
        checkStrictly: boolean;
        draggable: boolean;
        defaultExpandParent: boolean;
        autoExpandParent: boolean;
        defaultExpandAll: boolean;
        defaultExpandedKeys: any[];
        defaultCheckedKeys: any[];
        defaultSelectedKeys: any[];
        dropIndicatorRender: typeof DropIndicator;
        allowDrop: () => boolean;
    };
    static TreeNode: React.FC<import("./TreeNode").TreeNodeProps>;
    destroyed: boolean;
    delayedDragEnterLogic: Record<Key, number>;
    state: TreeState;
    dragStartMousePosition: any;
    dragNode: NodeInstance;
    listRef: React.RefObject<NodeListRef>;
    componentWillUnmount(): void;
    static getDerivedStateFromProps(props: TreeProps, prevState: TreeState): Partial<TreeState>;
    onNodeDragStart: NodeDragEventHandler;
    /**
     * [Legacy] Select handler is smaller than node,
     * so that this will trigger when drag enter node or select handler.
     * This is a little tricky if customize css without padding.
     * Better for use mouse move event to refresh drag state.
     * But let's just keep it to avoid event trigger logic change.
     */
    onNodeDragEnter: (event: React.MouseEvent<HTMLDivElement>, node: NodeInstance) => void;
    onNodeDragOver: (event: React.MouseEvent<HTMLDivElement>, node: NodeInstance) => void;
    onNodeDragLeave: NodeDragEventHandler;
    onWindowDragEnd: (event: any) => void;
    onNodeDragEnd: NodeDragEventHandler;
    onNodeDrop: (event: React.MouseEvent<HTMLDivElement>, node: any, outsideTree?: boolean) => void;
    cleanDragState: () => void;
    onNodeClick: NodeMouseEventHandler;
    onNodeDoubleClick: NodeMouseEventHandler;
    onNodeSelect: NodeMouseEventHandler;
    onNodeCheck: (e: React.MouseEvent<HTMLSpanElement>, treeNode: EventDataNode, checked: boolean) => void;
    onNodeLoad: (treeNode: EventDataNode) => Promise<void>;
    onNodeMouseEnter: NodeMouseEventHandler;
    onNodeMouseLeave: NodeMouseEventHandler;
    onNodeContextMenu: NodeMouseEventHandler;
    onFocus: React.FocusEventHandler<HTMLDivElement>;
    onBlur: React.FocusEventHandler<HTMLDivElement>;
    getTreeNodeRequiredProps: () => {
        expandedKeys: Key[];
        selectedKeys: Key[];
        loadedKeys: Key[];
        loadingKeys: Key[];
        checkedKeys: Key[];
        halfCheckedKeys: Key[];
        dragOverNodeKey: Key;
        dropPosition: 0 | 1 | -1;
        keyEntities: Record<Key, DataEntity>;
    };
    /** Set uncontrolled `expandedKeys`. This will also auto update `flattenNodes`. */
    setExpandedKeys: (expandedKeys: Key[]) => void;
    onNodeExpand: (e: React.MouseEvent<HTMLDivElement>, treeNode: EventDataNode) => void;
    onListChangeStart: () => void;
    onListChangeEnd: () => void;
    onActiveChange: (newActiveKey: Key) => void;
    getActiveItem: () => FlattenNode;
    offsetActiveKey: (offset: number) => void;
    onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    /**
     * Only update the value which is not in props
     */
    setUncontrolledState: (state: Partial<TreeState>, atomic?: boolean, forceState?: Partial<TreeState> | null) => void;
    scrollTo: ScrollTo;
    render(): JSX.Element;
}
export default Tree;
