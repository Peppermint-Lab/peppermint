/// <reference types="react" />
import type { GenerateConfig } from '../../generate';
export declare type YearHeaderProps<DateType> = {
    prefixCls: string;
    viewDate: DateType;
    generateConfig: GenerateConfig<DateType>;
    onPrevDecades: () => void;
    onNextDecades: () => void;
};
declare function DecadeHeader<DateType>(props: YearHeaderProps<DateType>): JSX.Element;
export default DecadeHeader;
