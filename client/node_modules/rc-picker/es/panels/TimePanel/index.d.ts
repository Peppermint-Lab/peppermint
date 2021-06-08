/// <reference types="react" />
import type { PanelSharedProps, DisabledTimes } from '../../interface';
export declare type SharedTimeProps<DateType> = {
    format?: string;
    showNow?: boolean;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    use12Hours?: boolean;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    hideDisabledOptions?: boolean;
    defaultValue?: DateType;
} & DisabledTimes;
export declare type TimePanelProps<DateType> = {
    format?: string;
    active?: boolean;
} & PanelSharedProps<DateType> & SharedTimeProps<DateType>;
declare function TimePanel<DateType>(props: TimePanelProps<DateType>): JSX.Element;
export default TimePanel;
