/// <reference types="react" />
import type { PanelSharedProps, PanelMode } from '../../interface';
export declare type YearPanelProps<DateType> = {
    sourceMode: PanelMode;
} & PanelSharedProps<DateType>;
export declare const YEAR_DECADE_COUNT = 10;
declare function YearPanel<DateType>(props: YearPanelProps<DateType>): JSX.Element;
export default YearPanel;
