import React from 'react';
import type { SliderProps } from './Slider';
import type { GenericSliderProps, GenericSliderState } from './interface';
export interface RangeProps extends GenericSliderProps {
    value?: number[];
    defaultValue?: number[];
    count?: number;
    min?: number;
    max?: number;
    allowCross?: boolean;
    pushable?: boolean;
    onChange?: (value: number[]) => void;
    onBeforeChange?: (value: number[]) => void;
    onAfterChange?: (value: number[]) => void;
    reverse?: boolean;
    vertical?: boolean;
    marks?: Record<number, React.ReactNode | {
        style?: React.CSSProperties;
        label?: string;
    }>;
    step?: number | null;
    threshold?: number;
    prefixCls?: string;
    included?: boolean;
    disabled?: boolean;
    trackStyle?: React.CSSProperties[];
    handleStyle?: React.CSSProperties[];
    tabIndex?: number | number[];
    ariaLabelGroupForHandles?: string | string[];
    ariaLabelledByGroupForHandles?: string | string[];
    ariaValueTextFormatterGroupForHandles?: string | string[];
    handle?: SliderProps['handle'];
    draggableTrack?: boolean;
}
interface RangeState extends GenericSliderState {
    bounds: number[];
    handle: number | null;
    recent: number;
}
declare const _default: React.ComponentClass<RangeProps, RangeState>;
export default _default;
