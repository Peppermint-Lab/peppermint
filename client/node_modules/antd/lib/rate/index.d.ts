import * as React from 'react';
export interface RateProps {
    prefixCls?: string;
    count?: number;
    value?: number;
    defaultValue?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    tooltips?: Array<string>;
    onChange?: (value: number) => void;
    onHoverChange?: (value: number) => void;
    character?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
declare const Rate: React.ForwardRefExoticComponent<RateProps & React.RefAttributes<unknown>>;
export default Rate;
