/// <reference types="react" />
import type { Locale } from '../../interface';
import type { GenerateConfig } from '../../generate';
export declare type MonthHeaderProps<DateType> = {
    prefixCls: string;
    viewDate: DateType;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    onPrevYear: () => void;
    onNextYear: () => void;
    onYearClick: () => void;
};
declare function MonthHeader<DateType>(props: MonthHeaderProps<DateType>): JSX.Element;
export default MonthHeader;
