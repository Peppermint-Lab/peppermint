/// <reference types="react" />
import type { GenerateConfig } from './generate';
export declare type Locale = {
    locale: string;
    /** Display month before year in date panel header */
    monthBeforeYear?: boolean;
    yearFormat: string;
    monthFormat?: string;
    quarterFormat?: string;
    today: string;
    now: string;
    backToToday: string;
    ok: string;
    timeSelect: string;
    dateSelect: string;
    weekSelect?: string;
    clear: string;
    month: string;
    year: string;
    previousMonth: string;
    nextMonth: string;
    monthSelect: string;
    yearSelect: string;
    decadeSelect: string;
    dayFormat: string;
    dateFormat: string;
    dateTimeFormat: string;
    previousYear: string;
    nextYear: string;
    previousDecade: string;
    nextDecade: string;
    previousCentury: string;
    nextCentury: string;
    shortWeekDays?: string[];
    shortMonths?: string[];
};
export declare type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade';
export declare type PickerMode = Exclude<PanelMode, 'datetime' | 'decade'>;
export declare type PanelRefProps = {
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => boolean;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClose?: () => void;
};
export declare type NullableDateType<DateType> = DateType | null | undefined;
export declare type OnSelect<DateType> = (value: DateType, type: 'key' | 'mouse' | 'submit') => void;
export declare type PanelSharedProps<DateType> = {
    prefixCls: string;
    generateConfig: GenerateConfig<DateType>;
    value?: NullableDateType<DateType>;
    viewDate: DateType;
    /** [Legacy] Set default display picker view date */
    defaultPickerValue?: DateType;
    locale: Locale;
    disabledDate?: (date: DateType) => boolean;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    superPrevIcon?: React.ReactNode;
    superNextIcon?: React.ReactNode;
    /**
     * Typescript can not handle generic type so we can not use `forwardRef` here.
     * Thus, move ref into operationRef.
     * This is little hack which should refactor after typescript support.
     */
    operationRef: React.MutableRefObject<PanelRefProps>;
    onSelect: OnSelect<DateType>;
    onViewDateChange: (value: DateType) => void;
    onPanelChange: (mode: PanelMode | null, viewValue: DateType) => void;
};
export declare type DisabledTimes = {
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
};
export declare type DisabledTime<DateType> = (date: DateType | null) => DisabledTimes;
export declare type OnPanelChange<DateType> = (value: DateType, mode: PanelMode) => void;
export declare type EventValue<DateType> = DateType | null;
export declare type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;
export declare type Components = {
    button?: React.ComponentType | string;
    rangeItem?: React.ComponentType | string;
};
export declare type RangeList = {
    label: string;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}[];
export declare type CustomFormat<DateType> = (value: DateType) => string;
