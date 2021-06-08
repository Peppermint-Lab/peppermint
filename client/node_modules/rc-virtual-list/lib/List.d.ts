import * as React from 'react';
import { RenderFunc } from './interface';
export declare type ScrollAlign = 'top' | 'bottom' | 'auto';
export declare type ScrollConfig = {
    index: number;
    align?: ScrollAlign;
    offset?: number;
} | {
    key: React.Key;
    align?: ScrollAlign;
    offset?: number;
};
export declare type ScrollTo = (arg: number | ScrollConfig) => void;
export declare type ListRef = {
    scrollTo: ScrollTo;
};
export interface ListProps<T> extends React.HTMLAttributes<any> {
    prefixCls?: string;
    children: RenderFunc<T>;
    data: T[];
    height?: number;
    itemHeight?: number;
    /** If not match virtual scroll condition, Set List still use height of container. */
    fullHeight?: boolean;
    itemKey: React.Key | ((item: T) => React.Key);
    component?: string | React.FC<any> | React.ComponentClass<any>;
    /** Set `false` will always use real scroll instead of virtual one */
    virtual?: boolean;
    onScroll?: React.UIEventHandler<HTMLElement>;
}
export declare function RawList<T>(props: ListProps<T>, ref: React.Ref<ListRef>): JSX.Element;
declare const _default: <Item = any>(props: ListProps<Item> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<ListRef>;
}) => React.ReactElement;
export default _default;
