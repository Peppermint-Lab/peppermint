/// <reference types="react" />
import type { DatePanelProps } from '../DatePanel';
import type { SharedTimeProps } from '../TimePanel';
import type { DisabledTime } from '../../interface';
export declare type DatetimePanelProps<DateType> = {
    disabledTime?: DisabledTime<DateType>;
    showTime?: boolean | SharedTimeProps<DateType>;
    defaultValue?: DateType;
} & Omit<DatePanelProps<DateType>, 'disabledHours' | 'disabledMinutes' | 'disabledSeconds'>;
declare function DatetimePanel<DateType>(props: DatetimePanelProps<DateType>): JSX.Element;
export default DatetimePanel;
