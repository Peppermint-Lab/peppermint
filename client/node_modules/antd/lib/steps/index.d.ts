import * as React from 'react';
export interface StepsProps {
    type?: 'default' | 'navigation';
    className?: string;
    current?: number;
    direction?: 'horizontal' | 'vertical';
    iconPrefix?: string;
    initial?: number;
    labelPlacement?: 'horizontal' | 'vertical';
    prefixCls?: string;
    progressDot?: boolean | Function;
    responsive?: boolean;
    size?: 'default' | 'small';
    status?: 'wait' | 'process' | 'finish' | 'error';
    style?: React.CSSProperties;
    percent?: number;
    onChange?: (current: number) => void;
}
export interface StepProps {
    className?: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    status?: 'wait' | 'process' | 'finish' | 'error';
    disabled?: boolean;
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    style?: React.CSSProperties;
}
interface StepsType extends React.FC<StepsProps> {
    Step: React.ClassicComponentClass<StepProps>;
}
declare const Steps: StepsType;
export default Steps;
