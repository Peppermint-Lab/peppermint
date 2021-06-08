import * as React from 'react';
export interface SkeletonElementProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: 'large' | 'small' | 'default' | number;
    shape?: 'circle' | 'square' | 'round';
    active?: boolean;
}
declare const Element: (props: SkeletonElementProps) => JSX.Element;
export default Element;
