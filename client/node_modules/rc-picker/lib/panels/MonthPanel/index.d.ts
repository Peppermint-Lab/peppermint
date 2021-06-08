/// <reference types="react" />
import type { MonthCellRender } from './MonthBody';
import type { PanelSharedProps } from '../../interface';
export declare type MonthPanelProps<DateType> = {
    monthCellContentRender?: MonthCellRender<DateType>;
} & PanelSharedProps<DateType>;
declare function MonthPanel<DateType>(props: MonthPanelProps<DateType>): JSX.Element;
export default MonthPanel;
