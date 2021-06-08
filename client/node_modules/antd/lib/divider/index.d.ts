import * as React from 'react';
export interface DividerProps {
    prefixCls?: string;
    type?: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right' | 'center';
    className?: string;
    children?: React.ReactNode;
    dashed?: boolean;
    style?: React.CSSProperties;
    plain?: boolean;
}
declare const Divider: React.FC<DividerProps>;
export default Divider;
