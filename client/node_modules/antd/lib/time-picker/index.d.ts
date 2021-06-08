import { Moment } from 'moment';
import * as React from 'react';
import { PickerTimeProps, RangePickerTimeProps } from '../date-picker/generatePicker';
import { Omit } from '../_util/type';
export interface TimePickerLocale {
    placeholder?: string;
    rangePlaceholder?: [string, string];
}
export interface TimeRangePickerProps extends Omit<RangePickerTimeProps<Moment>, 'picker'> {
    popupClassName?: string;
}
declare const RangePicker: React.ForwardRefExoticComponent<TimeRangePickerProps & React.RefAttributes<any>>;
export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {
    addon?: () => React.ReactNode;
    popupClassName?: string;
}
declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<any>>;
declare type MergedTimePicker = typeof TimePicker & {
    RangePicker: typeof RangePicker;
};
declare const _default: MergedTimePicker;
export default _default;
