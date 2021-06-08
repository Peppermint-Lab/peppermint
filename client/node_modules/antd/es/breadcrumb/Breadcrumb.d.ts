import * as React from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import { Omit } from '../_util/type';
export interface Route {
    path: string;
    breadcrumbName: string;
    children?: Omit<Route, 'children'>[];
}
export interface BreadcrumbProps {
    prefixCls?: string;
    routes?: Route[];
    params?: any;
    separator?: React.ReactNode;
    itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}
interface BreadcrumbInterface extends React.FC<BreadcrumbProps> {
    Item: typeof BreadcrumbItem;
    Separator: typeof BreadcrumbSeparator;
}
declare const Breadcrumb: BreadcrumbInterface;
export default Breadcrumb;
