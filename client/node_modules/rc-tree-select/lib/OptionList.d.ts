import * as React from 'react';
import type { RefOptionListProps } from 'rc-select/lib/OptionList';
import type { ScrollTo } from 'rc-tree/lib/interface';
import type { FlattenDataNode, RawValueType, DataNode } from './interface';
export interface OptionListProps<OptionsType extends object[]> {
    prefixCls: string;
    id: string;
    options: OptionsType;
    flattenOptions: FlattenDataNode[];
    height: number;
    itemHeight: number;
    virtual?: boolean;
    values: Set<RawValueType>;
    multiple: boolean;
    open: boolean;
    defaultActiveFirstOption?: boolean;
    notFoundContent?: React.ReactNode;
    menuItemSelectedIcon?: any;
    childrenAsData: boolean;
    searchValue: string;
    onSelect: (value: RawValueType, option: {
        selected: boolean;
    }) => void;
    onToggleOpen: (open?: boolean) => void;
    /** Tell Select that some value is now active to make accessibility work */
    onActiveValue: (value: RawValueType, index: number) => void;
    onScroll: React.UIEventHandler<HTMLDivElement>;
    onMouseEnter: () => void;
}
declare type ReviseRefOptionListProps = Omit<RefOptionListProps, 'scrollTo'> & {
    scrollTo: ScrollTo;
};
declare const RefOptionList: React.ForwardRefExoticComponent<OptionListProps<DataNode[]> & React.RefAttributes<ReviseRefOptionListProps>>;
export default RefOptionList;
