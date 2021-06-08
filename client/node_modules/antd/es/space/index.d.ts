import * as React from 'react';
import { SizeType } from '../config-provider/SizeContext';
export declare const SpaceContext: React.Context<{
    latestIndex: number;
    horizontalSize: number;
    verticalSize: number;
}>;
export declare type SpaceSize = SizeType | number;
export interface SpaceProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: SpaceSize | [SpaceSize, SpaceSize];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: React.ReactNode;
    wrap?: boolean;
}
declare const Space: React.FC<SpaceProps>;
export default Space;
