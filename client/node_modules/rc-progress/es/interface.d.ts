import * as React from 'react';
export interface ProgressProps {
    strokeWidth?: number;
    trailWidth?: number;
    className?: string;
    percent?: number | number[];
    strokeColor?: StrokeColorType;
    trailColor?: string;
    strokeLinecap?: StrokeLinecapType;
    prefixCls?: string;
    style?: React.CSSProperties;
    gapDegree?: number;
    gapPosition?: GapPositionType;
    transition?: string;
}
export declare type StrokeColorType = string | string[] | object;
export declare type GapPositionType = 'top' | 'right' | 'bottom' | 'left';
export declare type StrokeLinecapType = 'round' | 'butt' | 'square';
