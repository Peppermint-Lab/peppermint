/// <reference types="react" />
import { SliderProps } from './Slider';
import Range, { RangeProps } from './Range';
import Handle, { HandleProps } from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';
import SliderTooltip from './common/SliderTooltip';
interface CompoundedComponent extends React.ComponentClass<SliderProps> {
    Range: typeof Range;
    Handle: typeof Handle;
    createSliderWithTooltip: typeof createSliderWithTooltip;
}
declare const InternalSlider: CompoundedComponent;
export default InternalSlider;
export { SliderProps, Range, RangeProps, Handle, HandleProps, createSliderWithTooltip, SliderTooltip, };
