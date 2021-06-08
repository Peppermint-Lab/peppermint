import * as React from 'react';
import type { GenerateConfig } from '../../generate';
import type { Locale } from '../../interface';
export declare type DateRender<DateType> = (currentDate: DateType, today: DateType) => React.ReactNode;
export declare type DateBodyPassProps<DateType> = {
    dateRender?: DateRender<DateType>;
    disabledDate?: (date: DateType) => boolean;
    prefixColumn?: (date: DateType) => React.ReactNode;
    rowClassName?: (date: DateType) => string;
};
export declare type DateBodyProps<DateType> = {
    prefixCls: string;
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    viewDate: DateType;
    locale: Locale;
    rowCount: number;
    onSelect: (value: DateType) => void;
} & DateBodyPassProps<DateType>;
declare function DateBody<DateType>(props: DateBodyProps<DateType>): JSX.Element;
export default DateBody;
