import * as React from 'react';
import RcTree from 'rc-tree';
import { Key } from 'rc-tree/lib/interface';
import { TreeProps } from './Tree';
export declare type ExpandAction = false | 'click' | 'doubleClick';
export interface DirectoryTreeProps extends TreeProps {
    expandAction?: ExpandAction;
}
export interface DirectoryTreeState {
    expandedKeys?: Key[];
    selectedKeys?: Key[];
}
declare const ForwardDirectoryTree: React.ForwardRefExoticComponent<DirectoryTreeProps & React.RefAttributes<RcTree>>;
export default ForwardDirectoryTree;
