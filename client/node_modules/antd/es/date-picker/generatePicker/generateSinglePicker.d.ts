import * as React from 'react';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerDateProps, PickerTimeProps } from '.';
export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    DatePicker: React.ComponentClass<import(".").PickerBaseProps<DateType> | PickerDateProps<DateType> | PickerTimeProps<DateType>, any>;
    WeekPicker: React.ComponentClass<Omit<PickerDateProps<DateType>, "picker">, any>;
    MonthPicker: React.ComponentClass<Omit<PickerDateProps<DateType>, "picker">, any>;
    YearPicker: React.ComponentClass<Omit<PickerDateProps<DateType>, "picker">, any>;
    TimePicker: React.ComponentClass<Omit<PickerTimeProps<DateType>, "picker">, any>;
    QuarterPicker: React.ComponentClass<Omit<PickerTimeProps<DateType>, "picker">, any>;
};
