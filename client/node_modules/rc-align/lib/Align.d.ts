/**
 * Removed props:
 *  - childrenProps
 */
import React from 'react';
import { AlignType, AlignResult, TargetType } from './interface';
declare type OnAlign = (source: HTMLElement, result: AlignResult) => void;
export interface AlignProps {
    align: AlignType;
    target: TargetType;
    onAlign?: OnAlign;
    monitorBufferTime?: number;
    monitorWindowResize?: boolean;
    disabled?: boolean;
    children: React.ReactElement;
}
export interface RefAlign {
    forceAlign: () => void;
}
declare const RefAlign: React.ForwardRefExoticComponent<AlignProps & React.RefAttributes<RefAlign>>;
export default RefAlign;
