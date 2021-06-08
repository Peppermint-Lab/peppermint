import * as React from 'react';
import Grid from './Grid';
import Meta from './Meta';
import { TabsProps } from '../tabs';
import { Omit } from '../_util/type';
export { CardGridProps } from './Grid';
export { CardMetaProps } from './Meta';
export declare type CardType = 'inner';
export declare type CardSize = 'default' | 'small';
export interface CardTabListType {
    key: string;
    tab: React.ReactNode;
    disabled?: boolean;
}
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    prefixCls?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    headStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    loading?: boolean;
    hoverable?: boolean;
    children?: React.ReactNode;
    id?: string;
    className?: string;
    size?: CardSize;
    type?: CardType;
    cover?: React.ReactNode;
    actions?: React.ReactNode[];
    tabList?: CardTabListType[];
    tabBarExtraContent?: React.ReactNode | null;
    onTabChange?: (key: string) => void;
    activeTabKey?: string;
    defaultActiveTabKey?: string;
    tabProps?: TabsProps;
}
export interface CardInterface extends React.FC<CardProps> {
    Grid: typeof Grid;
    Meta: typeof Meta;
}
declare const Card: CardInterface;
export default Card;
