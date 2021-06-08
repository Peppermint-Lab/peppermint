import * as React from 'react';
import { CustomizeComponent } from '../interface';
export interface ExpandedRowProps {
    prefixCls: string;
    component: CustomizeComponent;
    cellComponent: CustomizeComponent;
    fixHeader: boolean;
    fixColumn: boolean;
    horizonScroll: boolean;
    componentWidth: number;
    className: string;
    expanded: boolean;
    children: React.ReactNode;
    colSpan: number;
}
declare function ExpandedRow({ prefixCls, children, component: Component, cellComponent, fixHeader, fixColumn, horizonScroll, className, expanded, componentWidth, colSpan, }: ExpandedRowProps): JSX.Element;
export default ExpandedRow;
