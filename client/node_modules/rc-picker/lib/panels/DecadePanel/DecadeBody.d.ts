/// <reference types="react" />
import type { GenerateConfig } from '../../generate';
export declare const DECADE_COL_COUNT = 3;
export declare type YearBodyProps<DateType> = {
    prefixCls: string;
    generateConfig: GenerateConfig<DateType>;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
};
declare function DecadeBody<DateType>(props: YearBodyProps<DateType>): JSX.Element;
export default DecadeBody;
