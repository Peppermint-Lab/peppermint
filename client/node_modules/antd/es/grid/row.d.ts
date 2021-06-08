import * as React from 'react';
import { Breakpoint } from '../_util/responsiveObserve';
declare const RowAligns: ["top", "middle", "bottom", "stretch"];
declare const RowJustify: ["start", "end", "center", "space-around", "space-between"];
export declare type Gutter = number | Partial<Record<Breakpoint, number>>;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    gutter?: Gutter | [Gutter, Gutter];
    align?: typeof RowAligns[number];
    justify?: typeof RowJustify[number];
    prefixCls?: string;
    wrap?: boolean;
}
declare const Row: React.ForwardRefExoticComponent<RowProps & React.RefAttributes<HTMLDivElement>>;
export default Row;
