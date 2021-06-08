import * as React from 'react';
export interface ScrollNumberProps {
    prefixCls?: string;
    className?: string;
    motionClassName?: string;
    count?: string | number | null;
    children?: React.ReactElement<HTMLElement>;
    component?: string;
    style?: React.CSSProperties;
    title?: string | number | null;
    show: boolean;
}
export interface ScrollNumberState {
    animateStarted?: boolean;
    count?: string | number | null;
}
declare const ScrollNumber: React.FC<ScrollNumberProps>;
export default ScrollNumber;
