import * as React from 'react';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerBaseProps as RCPickerBaseProps, PickerDateProps as RCPickerDateProps, PickerTimeProps as RCPickerTimeProps } from 'rc-picker/lib/Picker';
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel';
import { RangePickerBaseProps as RCRangePickerBaseProps, RangePickerDateProps as RCRangePickerDateProps, RangePickerTimeProps as RCRangePickerTimeProps } from 'rc-picker/lib/RangePicker';
import { PickerMode, Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import { SizeType } from '../../config-provider/SizeContext';
import PickerButton from '../PickerButton';
import PickerTag from '../PickerTag';
import { TimePickerLocale } from '../../time-picker';
export declare const Components: {
    button: typeof PickerButton;
    rangeItem: typeof PickerTag;
};
export declare function getTimeProps<DateType>(props: {
    format?: string;
    picker?: PickerMode;
} & SharedTimeProps<DateType>): SharedTimeProps<DateType> | {
    showTime: SharedTimeProps<DateType>;
};
declare type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig' | 'prevIcon' | 'nextIcon' | 'superPrevIcon' | 'superNextIcon' | 'hideHeader' | 'components'> & {
    locale?: PickerLocale;
    size?: SizeType;
    bordered?: boolean;
};
export declare type PickerLocale = {
    lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
    timePickerLocale: TimePickerLocale;
} & AdditionalPickerLocaleProps;
export declare type AdditionalPickerLocaleProps = {
    dateFormat?: string;
    dateTimeFormat?: string;
    weekFormat?: string;
    monthFormat?: string;
};
export declare type AdditionalPickerLocaleLangProps = {
    placeholder: string;
    yearPlaceholder?: string;
    quarterPlaceholder?: string;
    monthPlaceholder?: string;
    weekPlaceholder?: string;
    rangeYearPlaceholder?: [string, string];
    rangeMonthPlaceholder?: [string, string];
    rangeWeekPlaceholder?: [string, string];
    rangePlaceholder?: [string, string];
};
export declare type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>;
export declare type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>;
export declare type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>;
export declare type PickerProps<DateType> = PickerBaseProps<DateType> | PickerDateProps<DateType> | PickerTimeProps<DateType>;
export declare type RangePickerBaseProps<DateType> = InjectDefaultProps<RCRangePickerBaseProps<DateType>>;
export declare type RangePickerDateProps<DateType> = InjectDefaultProps<RCRangePickerDateProps<DateType>>;
export declare type RangePickerTimeProps<DateType> = InjectDefaultProps<RCRangePickerTimeProps<DateType>>;
export declare type RangePickerProps<DateType> = RangePickerBaseProps<DateType> | RangePickerDateProps<DateType> | RangePickerTimeProps<DateType>;
declare function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): React.ComponentClass<PickerBaseProps<DateType> | PickerDateProps<DateType> | PickerTimeProps<DateType>, any> & {
    WeekPicker: React.ComponentClass<Omit<PickerDateProps<DateType>, "picker">, any>;
    MonthPicker: React.ComponentClass<Omit<PickerDateProps<DateType>, "picker">, any>;
    YearPicker: React.ComponentClass<Omit<PickerDateProps<DateType>, "picker">, any>;
    RangePicker: React.ComponentClass<RangePickerProps<DateType>>;
    TimePicker: React.ComponentClass<Omit<PickerTimeProps<DateType>, "picker">, any>;
    QuarterPicker: React.ComponentClass<Omit<PickerTimeProps<DateType>, "picker">, any>;
};
export default generatePicker;
