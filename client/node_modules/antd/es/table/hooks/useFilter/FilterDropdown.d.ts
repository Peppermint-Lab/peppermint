import * as React from 'react';
import { ColumnType, Key, TableLocale, GetPopupContainer } from '../../interface';
import { FilterState } from '.';
export interface FilterDropdownProps<RecordType> {
    prefixCls: string;
    dropdownPrefixCls: string;
    column: ColumnType<RecordType>;
    filterState?: FilterState<RecordType>;
    filterMultiple: boolean;
    columnKey: Key;
    children: React.ReactNode;
    triggerFilter: (filterState: FilterState<RecordType>) => void;
    locale: TableLocale;
    getPopupContainer?: GetPopupContainer;
}
declare function FilterDropdown<RecordType>(props: FilterDropdownProps<RecordType>): JSX.Element;
export default FilterDropdown;
