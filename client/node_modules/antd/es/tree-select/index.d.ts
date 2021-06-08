import * as React from 'react';
import { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD, TreeSelectProps as RcTreeSelectProps } from 'rc-tree-select';
import { DefaultValueType } from 'rc-tree-select/lib/interface';
import { SizeType } from '../config-provider/SizeContext';
declare type RawValue = string | number;
export interface LabeledValue {
    key?: string;
    value: RawValue;
    label: React.ReactNode;
}
export declare type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];
export interface TreeSelectProps<T> extends Omit<RcTreeSelectProps<T>, 'showTreeIcon' | 'treeMotion' | 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'> {
    suffixIcon?: React.ReactNode;
    size?: SizeType;
    bordered?: boolean;
}
export interface RefTreeSelectProps {
    focus: () => void;
    blur: () => void;
}
declare const TreeSelectRef: <T extends DefaultValueType>(props: TreeSelectProps<T> & {
    ref?: React.Ref<RefTreeSelectProps> | undefined;
}) => React.ReactElement;
declare type InternalTreeSelectType = typeof TreeSelectRef;
interface TreeSelectInterface extends InternalTreeSelectType {
    TreeNode: typeof TreeNode;
    SHOW_ALL: typeof SHOW_ALL;
    SHOW_PARENT: typeof SHOW_PARENT;
    SHOW_CHILD: typeof SHOW_CHILD;
}
declare const TreeSelect: TreeSelectInterface;
export { TreeNode };
export default TreeSelect;
