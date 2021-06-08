import * as React from 'react';
import { TooltipPlacement } from '../tooltip';
export interface SliderMarks {
    [key: number]: React.ReactNode | {
        style: React.CSSProperties;
        label: React.ReactNode;
    };
}
interface HandleGeneratorInfo {
    value?: number;
    dragging?: boolean;
    index: number;
}
export declare type HandleGeneratorFn = (config: {
    tooltipPrefixCls?: string;
    prefixCls?: string;
    info: HandleGeneratorInfo;
}) => React.ReactElement;
export interface SliderBaseProps {
    prefixCls?: string;
    tooltipPrefixCls?: string;
    reverse?: boolean;
    min?: number;
    max?: number;
    step?: null | number;
    marks?: SliderMarks;
    dots?: boolean;
    included?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    tipFormatter?: null | ((value?: number) => React.ReactNode);
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    tooltipVisible?: boolean;
    tooltipPlacement?: TooltipPlacement;
    getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    autoFocus?: boolean;
}
export interface SliderSingleProps extends SliderBaseProps {
    range?: false;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    onAfterChange?: (value: number) => void;
    handleStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
}
export interface SliderRangeProps extends SliderBaseProps {
    range: true | SliderRange;
    value?: [number, number];
    defaultValue?: [number, number];
    onChange?: (value: [number, number]) => void;
    onAfterChange?: (value: [number, number]) => void;
    handleStyle?: React.CSSProperties[];
    trackStyle?: React.CSSProperties[];
}
interface SliderRange {
    draggableTrack?: boolean;
}
export declare type Visibles = {
    [index: number]: boolean;
};
declare const Slider: React.ForwardRefExoticComponent<(SliderSingleProps | SliderRangeProps) & React.RefAttributes<unknown>>;
export default Slider;
