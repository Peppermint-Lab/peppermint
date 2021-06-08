import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
declare const ProgressTypes: ["line", "circle", "dashboard"];
export declare type ProgressType = typeof ProgressTypes[number];
declare const ProgressStatuses: ["normal", "exception", "active", "success"];
export declare type ProgressSize = 'default' | 'small';
export declare type StringGradients = {
    [percentage: string]: string;
};
declare type FromToGradients = {
    from: string;
    to: string;
};
export declare type ProgressGradient = {
    direction?: string;
} & (StringGradients | FromToGradients);
export interface SuccessProps {
    percent?: number;
    /** @deprecated Use `percent` instead */
    progress?: number;
    strokeColor?: string;
}
export interface ProgressProps {
    prefixCls?: string;
    className?: string;
    type?: ProgressType;
    percent?: number;
    format?: (percent?: number, successPercent?: number) => React.ReactNode;
    status?: typeof ProgressStatuses[number];
    showInfo?: boolean;
    strokeWidth?: number;
    strokeLinecap?: 'butt' | 'square' | 'round';
    strokeColor?: string | ProgressGradient;
    trailColor?: string;
    width?: number;
    success?: SuccessProps;
    style?: React.CSSProperties;
    gapDegree?: number;
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
    size?: ProgressSize;
    steps?: number;
    /** @deprecated Use `success` instead */
    successPercent?: number;
}
export default class Progress extends React.Component<ProgressProps> {
    static defaultProps: {
        type: "circle" | "line" | "dashboard" | undefined;
        percent: number;
        showInfo: boolean;
        trailColor: null;
        size: ProgressSize | undefined;
        gapDegree: undefined;
        strokeLinecap: "round" | "butt" | "square" | undefined;
    };
    getPercentNumber(): number;
    getProgressStatus(): "success" | "normal" | "active" | "exception";
    renderProcessInfo(prefixCls: string, progressStatus: typeof ProgressStatuses[number]): JSX.Element | null;
    renderProgress: ({ getPrefixCls, direction }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
