/// <reference types="react" />
import type { DateBodyPassProps, DateRender } from './DateBody';
import type { PanelSharedProps } from '../../interface';
import type { KeyboardConfig } from '../../utils/uiUtil';
export declare type DatePanelProps<DateType> = {
    active?: boolean;
    dateRender?: DateRender<DateType>;
    panelName?: string;
    keyboardConfig?: KeyboardConfig;
} & PanelSharedProps<DateType> & DateBodyPassProps<DateType>;
declare function DatePanel<DateType>(props: DatePanelProps<DateType>): JSX.Element;
export default DatePanel;
