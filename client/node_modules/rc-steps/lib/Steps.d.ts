import React from 'react';
import { Status, Icons } from './interface';
import Step from './Step';
export declare type StepIconRender = (info: {
    index: number;
    status: Status;
    title: React.ReactNode;
    description: React.ReactNode;
    node: React.ReactNode;
}) => React.ReactNode;
export declare type ProgressDotRender = (iconDot: any, info: {
    index: number;
    status: Status;
    title: React.ReactNode;
    description: React.ReactNode;
}) => React.ReactNode;
export interface StepsProps {
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    type?: 'default' | 'navigation';
    labelPlacement?: 'horizontal' | 'vertical';
    iconPrefix?: string;
    status?: Status;
    size?: 'default' | 'small';
    current?: number;
    progressDot?: ProgressDotRender | boolean;
    stepIcon?: StepIconRender;
    initial?: number;
    icons?: Icons;
    onChange?: (current: number) => void;
}
export default class Steps extends React.Component<StepsProps> {
    static Step: typeof Step;
    static defaultProps: {
        type: string;
        prefixCls: string;
        iconPrefix: string;
        direction: string;
        labelPlacement: string;
        initial: number;
        current: number;
        status: string;
        size: string;
        progressDot: boolean;
    };
    onStepClick: (next: number) => void;
    render(): JSX.Element;
}
