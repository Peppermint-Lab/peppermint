import * as React from 'react';
import type { GenerateConfig } from '../../generate';
import type { Locale } from '../../interface';
export declare const MONTH_COL_COUNT = 3;
export declare type MonthCellRender<DateType> = (currentDate: DateType, locale: Locale) => React.ReactNode;
export declare type MonthBodyProps<DateType> = {
    prefixCls: string;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    monthCellRender?: MonthCellRender<DateType>;
    onSelect: (value: DateType) => void;
};
declare function MonthBody<DateType>(props: MonthBodyProps<DateType>): JSX.Element;
export default MonthBody;
