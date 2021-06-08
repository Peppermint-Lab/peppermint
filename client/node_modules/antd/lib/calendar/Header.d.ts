/// <reference types="react" />
import { GenerateConfig } from 'rc-picker/lib/generate';
import { Locale } from 'rc-picker/lib/interface';
import { CalendarMode } from './generateCalendar';
export interface CalendarHeaderProps<DateType> {
    prefixCls: string;
    value: DateType;
    validRange?: [DateType, DateType];
    generateConfig: GenerateConfig<DateType>;
    locale: Locale;
    mode: CalendarMode;
    fullscreen: boolean;
    onChange: (date: DateType) => void;
    onModeChange: (mode: CalendarMode) => void;
}
declare function CalendarHeader<DateType>(props: CalendarHeaderProps<DateType>): JSX.Element;
export default CalendarHeader;
