/// <reference types="react" />
import { Moment } from 'moment';
import { PickerProps, PickerDateProps, RangePickerProps as BaseRangePickerProps } from './generatePicker';
export declare type DatePickerProps = PickerProps<Moment>;
export declare type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export declare type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export declare type RangePickerProps = BaseRangePickerProps<Moment>;
declare const DatePicker: import("react").ComponentClass<import("./generatePicker").PickerBaseProps<Moment> | PickerDateProps<Moment> | import("./generatePicker").PickerTimeProps<Moment>, any> & {
    WeekPicker: import("react").ComponentClass<Omit<PickerDateProps<Moment>, "picker">, any>;
    MonthPicker: import("react").ComponentClass<Omit<PickerDateProps<Moment>, "picker">, any>;
    YearPicker: import("react").ComponentClass<Omit<PickerDateProps<Moment>, "picker">, any>;
    RangePicker: import("react").ComponentClass<BaseRangePickerProps<Moment>, any>;
    TimePicker: import("react").ComponentClass<Omit<import("./generatePicker").PickerTimeProps<Moment>, "picker">, any>;
    QuarterPicker: import("react").ComponentClass<Omit<import("./generatePicker").PickerTimeProps<Moment>, "picker">, any>;
};
export default DatePicker;
