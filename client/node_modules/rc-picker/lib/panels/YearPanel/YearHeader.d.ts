/// <reference types="react" />
import type { GenerateConfig } from '../../generate';
export declare type YearHeaderProps<DateType> = {
    prefixCls: string;
    viewDate: DateType;
    value?: DateType | null;
    generateConfig: GenerateConfig<DateType>;
    onPrevDecade: () => void;
    onNextDecade: () => void;
    onDecadeClick: () => void;
};
declare function YearHeader<DateType>(props: YearHeaderProps<DateType>): JSX.Element;
export default YearHeader;
