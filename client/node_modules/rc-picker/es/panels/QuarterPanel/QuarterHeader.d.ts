/// <reference types="react" />
import type { Locale } from '../../interface';
import type { GenerateConfig } from '../../generate';
export declare type QuarterHeaderProps<DateType> = {
    prefixCls: string;
    viewDate: DateType;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    onPrevYear: () => void;
    onNextYear: () => void;
    onYearClick: () => void;
};
declare function QuarterHeader<DateType>(props: QuarterHeaderProps<DateType>): JSX.Element;
export default QuarterHeader;
