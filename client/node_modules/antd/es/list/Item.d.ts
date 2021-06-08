import * as React from 'react';
import { ListGridType } from './index';
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    prefixCls?: string;
    style?: React.CSSProperties;
    extra?: React.ReactNode;
    actions?: React.ReactNode[];
    grid?: ListGridType;
    colStyle?: React.CSSProperties;
}
export interface ListItemMetaProps {
    avatar?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
    description?: React.ReactNode;
    prefixCls?: string;
    style?: React.CSSProperties;
    title?: React.ReactNode;
}
export declare const Meta: React.FC<ListItemMetaProps>;
export interface ListItemTypeProps extends React.FC<ListItemProps> {
    Meta: typeof Meta;
}
declare const Item: ListItemTypeProps;
export default Item;
