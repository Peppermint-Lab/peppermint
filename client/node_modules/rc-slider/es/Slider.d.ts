import React from 'react';
import type { GenericSliderProps, GenericSliderState } from './interface';
export interface SliderProps extends GenericSliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number | null;
    prefixCls?: string;
    onChange?: (value: number) => void;
    onBeforeChange?: (value: number) => void;
    onAfterChange?: (value: number) => void;
    vertical?: boolean;
    included?: boolean;
    disabled?: boolean;
    reverse?: boolean;
    minimumTrackStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    handleStyle?: React.CSSProperties;
    tabIndex?: number;
    ariaLabelForHandle?: string;
    ariaLabelledByForHandle?: string;
    ariaValueTextFormatterForHandle?: string;
    startPoint?: number;
    handle?: (props: {
        className: string;
        prefixCls?: string;
        vertical?: boolean;
        offset: number;
        value: number;
        dragging?: boolean;
        disabled?: boolean;
        min?: number;
        max?: number;
        reverse?: boolean;
        index: number;
        tabIndex?: number;
        ariaLabel: string;
        ariaLabelledBy: string;
        ariaValueTextFormatter: string;
        style?: React.CSSProperties;
        ref?: React.Ref<any>;
    }) => React.ReactElement;
}
export interface SliderState extends GenericSliderState {
    value: number;
    dragging: boolean;
}
declare const _default: React.ComponentClass<SliderProps, SliderState>;
export default _default;
